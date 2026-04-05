"use client";

import { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BOOKING_STEPS } from "../../../data";
import { createLead, fireUpdateLead, submitFinalLead } from "../../../api";

/**
 * Core multi-step booking logic.
 *
 * Step 1  — awaits `createLead` to get `leadId`, then advances.
 * Steps 2-7 — fires `fireUpdateLead` (no await), advances immediately.
 * Step 8  — awaits `submitFinalLead` with all accumulated `formData`, then calls `onDone`.
 *
 * @param {{ onDone: Function }} options
 */
export function useSteps({ onDone }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const currentStep = BOOKING_STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === BOOKING_STEPS.length - 1;

  useEffect(() => {
    if (currentStepIndex > 0 && !leadId) {
      setCurrentStepIndex(0);
    }
  }, [currentStepIndex, leadId]);

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
  }, [currentStepIndex, leadId, pathname, router, searchParams]);

  const onNext = useCallback(
    async (value) => {
      setError(null);

      // ── Step 1: create deal (awaited) to get leadId,
      //           then fire step-1 data as first update (same as all other steps) ──────
      if (isFirstStep) {
        setIsSubmitting(true);
        try {
          let nextLeadId = leadId;

          // Create lead if missing. If API is not ready, keep UI testable with local id.
          if (!nextLeadId) {
            try {
              const result = await createLead();
              nextLeadId = result?.id;
            } catch {
              nextLeadId = `local-${Date.now()}`;
            }
          }

          setLeadId(String(nextLeadId));

          // save step-1 selection + fire update (same pattern as steps 2-7)
          const updated = { ...formData, [currentStep.field]: value };
          setFormData(updated);
          fireUpdateLead(nextLeadId, { [currentStep.field]: value });
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
        try {
          await submitFinalLead(leadId, allData);
          if (onDone) onDone();
          return true;
        } catch (err) {
          setError(err.message);
          return false;
        } finally {
          setIsSubmitting(false);
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
    [currentStep, formData, isFirstStep, isLastStep, leadId, onDone],
  );

  const onBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  }, [currentStepIndex]);

  return {
    currentStep,
    currentStepIndex,
    totalSteps: BOOKING_STEPS.length,
    formData,
    leadId,
    isSubmitting,
    error,
    onNext,
    onBack,
    isFirstStep,
    isLastStep,
  };
}
