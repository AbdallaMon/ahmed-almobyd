"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { BOOKING_STEPS } from "../../../data";
import { Success, Failed } from "@/app/v2/lib/toast";
import { useLanguageContext } from "@/app/v2/providers/LanguageProvider";
import { useToastContext } from "@/app/v2/providers/ToastLoadingProvider";
import {
  createLead,
  fireUpdateLead,
  getLead,
  submitFinalLead,
} from "../../../api";

/**
 * Core multi-step booking logic.
 *
 * Step 1  — awaits `createLead(location)` to get `leadId`, then advances.
 * Steps 2-7 — fires `fireUpdateLead` (no await), advances immediately.
 * Step 8  — awaits `submitFinalLead` with all accumulated `formData`, then calls `onDone`.
 *
 * @param {{ onDone: Function }} options
 */
export function useSteps({ onDone }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { translate } = useLanguageContext();
  const translateRef = useRef(translate);
  useEffect(() => {
    translateRef.current = translate;
  });
  const { setLoading } = useToastContext();

  const queryStep = Number(searchParams.get("step") || "1");
  const normalizedStep = Number.isFinite(queryStep)
    ? Math.min(Math.max(queryStep, 1), BOOKING_STEPS.length)
    : 1;
  const queryLeadId = searchParams.get("leadId");

  const [currentStepIndex, setCurrentStepIndex] = useState(normalizedStep - 1);
  const [formData, setFormData] = useState({});
  const [leadId, setLeadId] = useState(queryLeadId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [serverFieldErrors, setServerFieldErrors] = useState({});
  const [isHydratingLead, setIsHydratingLead] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);
  const leadClearedRef = useRef(false);
  const currentStep = BOOKING_STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === BOOKING_STEPS.length - 1;
  const isSubmitted = submittedLead?.status === "SUBMITTED";

  const lastSubmittedStepIndex = Math.min(
    BOOKING_STEPS.filter((step) => {
      if (!step.field) return false;
      const value = formData?.[step.field];
      return value !== null && value !== undefined && value !== "";
    }).length,
    BOOKING_STEPS.length - 1,
  );
  const canJumpToLastSubmittedStep =
    lastSubmittedStepIndex - currentStepIndex >= 2;

  useEffect(() => {
    if (isSubmitted) return;

    if (currentStepIndex > 0 && !leadId) {
      setCurrentStepIndex(0);
    }

    const completedStepCount = BOOKING_STEPS.filter((step) => {
      if (!step.field) return false;
      const value = formData?.[step.field];
      return value !== null && value !== undefined && value !== "";
    }).length;

    const normalizedIndex = Math.min(
      completedStepCount,
      BOOKING_STEPS.length - 1,
    );

    // Keep users from jumping ahead, but allow going back to previous steps.
    if (currentStepIndex > normalizedIndex) {
      setCurrentStepIndex(normalizedIndex);
    }
  }, [currentStepIndex, formData, isSubmitted, leadId]);

  useEffect(() => {
    const nextLeadId = searchParams.get("leadId");

    // Once URL no longer has the cleared leadId, reset the flag
    if (!nextLeadId && leadClearedRef.current) {
      leadClearedRef.current = false;
      return;
    }

    if (!nextLeadId || isSubmitted) return;

    // Don't re-set a leadId that was just cleared due to 404
    if (leadClearedRef.current) return;

    if (nextLeadId !== String(leadId || "")) {
      setLeadId(nextLeadId);
    }
  }, [isSubmitted, leadId, searchParams]);

  useEffect(() => {
    if (!leadId) return;

    let mounted = true;

    const hydrateLead = async () => {
      setIsHydratingLead(true);
      setError(null);

      try {
        const lead = await getLead(leadId);
        if (!mounted) return;
        console.log("Hydrated lead:", lead);
        if (lead?.status === "SUBMITTED") {
          setSubmittedLead(lead);
          setSubmitMessage(null);
          setInfoMessage(
            translateRef.current("status.bookingAlreadySubmitted"),
          );
          setError(null);
          setServerFieldErrors({});
          return;
        }

        const nextFormData = {};
        for (const step of BOOKING_STEPS) {
          if (!step.field) continue;
          const value = lead?.[step.field];
          if (value !== null && value !== undefined && value !== "") {
            nextFormData[step.field] = value;
          }
        }

        const finalFields = [
          "name",
          "phone",
          "email",
          "contactAgreement",
          "contactInitialPriceAgreement",
        ];
        for (const key of finalFields) {
          const value = lead?.[key];
          if (value !== null && value !== undefined && value !== "") {
            nextFormData[key] = value;
          }
        }

        setFormData(nextFormData);

        const completedStepCount = BOOKING_STEPS.filter((step) => {
          if (!step.field) return false;
          const value = nextFormData[step.field];
          return value !== null && value !== undefined && value !== "";
        }).length;

        const nextIndex = Math.min(
          completedStepCount,
          BOOKING_STEPS.length - 1,
        );
        setCurrentStepIndex(nextIndex);
        setSubmittedLead(null);
      } catch (err) {
        if (mounted) {
          const message = err?.message || "Failed to restore booking lead";
          const isNotFound = /not found|404/i.test(message);

          if (isNotFound) {
            leadClearedRef.current = true;
            setLeadId(null);
            setFormData({});
            setCurrentStepIndex(0);
            setSubmittedLead(null);
            setError("Saved lead not found. Started a new booking.");
          } else {
            setError(message);
          }
        }
      } finally {
        if (mounted) {
          setIsHydratingLead(false);
        }
      }
    };

    hydrateLead();

    return () => {
      mounted = false;
    };
  }, [leadId, onDone]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("booking", "true");
    params.set("step", String(currentStepIndex + 1));

    if (leadId) {
      params.set("leadId", String(leadId));
    } else {
      params.delete("leadId");
    }

    const nextQuery = params.toString();
    if (nextQuery !== searchParams.toString()) {
      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    }
  }, [currentStepIndex, leadId, pathname, router, searchParams, isSubmitted]);

  const parseServerFieldError = useCallback((message = "") => {
    const supported = [
      "name",
      "phone",
      "email",
      "contactAgreement",
      "contactInitialPriceAgreement",
      "location",
      "projectType",
      "projectStage",
      "previousWork",
      "hasArchitecturalPlan",
      "serviceType",
      "decisionMaker",
    ];

    const normalized = String(message).toLowerCase();
    const matched = supported.find((field) =>
      normalized.includes(field.toLowerCase()),
    );

    if (!matched) return {};
    return { [matched]: message };
  }, []);

  const resetBookingFlow = useCallback(() => {
    setSubmittedLead(null);
    setSubmitMessage(null);
    setInfoMessage(null);
    setServerFieldErrors({});
    setError(null);
    setFormData({});
    setLeadId(null);
    setCurrentStepIndex(0);
    const params = new URLSearchParams(searchParams.toString());
    params.set("booking", "true");
    params.delete("step");
    params.delete("leadId");
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    window.location.reload();
  }, []);

  const onNext = useCallback(
    async (value) => {
      if (isHydratingLead || isSubmitted) {
        return false;
      }

      setError(null);
      setInfoMessage(null);
      setServerFieldErrors({});

      if (isFirstStep) {
        setIsSubmitting(true);
        try {
          let nextLeadId = leadId;

          if (!nextLeadId) {
            const result = await createLead(value);
            nextLeadId = result?.id;
            if (!nextLeadId) {
              throw new Error("Lead id is missing from create response");
            }
          }

          setLeadId(String(nextLeadId));

          // save step-1 selection; location is already persisted in createLead payload.
          const updated = { ...formData, [currentStep.field]: value };
          setFormData(updated);

          setCurrentStepIndex((i) => i + 1);
          return true;
        } catch (err) {
          setError(err.message);
          return false;
        } finally {
          setIsSubmitting(false);
        }
      }

      // ── Step 8: final form submit — send ALL accumulated data at once ────────
      if (isLastStep) {
        // `value` is the full form object { name, phone, email }
        const allData = { ...formData, ...value };
        setIsSubmitting(true);
        setLoading(true);
        const toastId = toast.loading(translate("loading.submitting"));

        try {
          const response = await submitFinalLead(leadId, allData);
          const lead = response?.lead;

          if (lead?.status === "SUBMITTED") {
            setSubmittedLead(lead);
            setSubmitMessage(response?.message || null);
            setInfoMessage(null);
          }

          toast.update(
            toastId,
            Success(response?.message || translate("status.success")),
          );

          if (onDone) onDone();
          return true;
        } catch (err) {
          const message = err?.message || "Failed to submit";
          const status = err?.status;

          if (status === 409) {
            setInfoMessage(message);
            if (err?.payload?.lead?.status === "SUBMITTED") {
              setSubmittedLead(err.payload.lead);
              setSubmitMessage(err.payload?.message || null);
            }
          } else if (status === 400) {
            setError(message);
            setServerFieldErrors(parseServerFieldError(message));
          } else if (status === 404) {
            setError(message);
          } else {
            setError(message);
          }

          toast.update(toastId, Failed(message));
          return false;
        } finally {
          setIsSubmitting(false);
          setLoading(false);
        }
      }

      // ── Steps 2-7: save to state + fire individual update (no await) ────────
      if (!leadId) {
        setCurrentStepIndex(0);
        setError("Missing lead id. Restarted from step 1.");
        return false;
      }

      const updated = { ...formData, [currentStep.field]: value };
      setFormData(updated);
      fireUpdateLead(leadId, { [currentStep.field]: value });
      setCurrentStepIndex((i) => i + 1);
      return true;
    },
    [
      currentStep,
      formData,
      isFirstStep,
      isHydratingLead,
      isLastStep,
      isSubmitted,
      leadId,
      onDone,
      parseServerFieldError,
      setLoading,
      translate,
    ],
  );

  const onBack = useCallback(() => {
    if (isSubmitted) return;

    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  }, [currentStepIndex, isSubmitted]);

  const onJumpToLastSubmittedStep = useCallback(() => {
    setCurrentStepIndex(lastSubmittedStepIndex);
  }, [lastSubmittedStepIndex]);

  return {
    currentStep,
    currentStepIndex,
    totalSteps: BOOKING_STEPS.length,
    formData,
    leadId,
    onJumpToLastSubmittedStep,
    canJumpToLastSubmittedStep: !isSubmitted && canJumpToLastSubmittedStep,
    lastSubmittedStepIndex,
    isSubmitting,
    error,
    infoMessage,
    serverFieldErrors,
    isSubmitted,
    submitMessage,
    resetBookingFlow,
    onNext,
    onBack,
    isFirstStep,
    isLastStep,
  };
}
