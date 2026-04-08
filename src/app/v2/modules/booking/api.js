const BASE_URL = process.env.NEXT_PUBLIC_URL;
const BOOKING_LEADS_BASE = "v2/client/booking-leads";

class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

async function request(path, method, body) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  return fetch(`${BASE_URL}/${path}`, options);
}

/**
 * Step 1 — creates a lead with initial customer fields.
 */
export async function createLead(initialData) {
  const res = await request(BOOKING_LEADS_BASE, "POST", initialData);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new ApiError(err.message || "Failed to create lead", res.status, err);
  }
  return res.json();
}

export async function getLead(leadId) {
  const res = await request(`${BOOKING_LEADS_BASE}/${leadId}`, "GET");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new ApiError(err.message || "Failed to fetch lead", res.status, err);
  }
  return res.json();
}
/**
 * Steps 2-8 — fire-and-forget update. Never throws; errors are silently ignored.
 */
export function fireUpdateLead(leadId, stepData) {
  request(`${BOOKING_LEADS_BASE}/${leadId}`, "PATCH", stepData).catch(() => {});
}

/**
 * Step 9 — final submit with all accumulated form data. Awaited.
 */
export async function submitFinalLead(leadId, allData) {
  const res = await request(
    `${BOOKING_LEADS_BASE}/${leadId}/submit`,
    "PUT",
    allData,
  );

  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      payload.message || "Failed to submit",
      res.status,
      payload,
    );
  }

  return payload;
}
