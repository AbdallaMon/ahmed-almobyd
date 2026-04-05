const BASE_URL = process.env.NEXT_PUBLIC_URL;

async function request(path, method, body) {
  return fetch(`${BASE_URL}/${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
}

/**
 * Step 1 — creates an empty deal. Awaited; returns the new lead object (must include `id`).
 * Step-1's actual field value is sent immediately after via fireUpdateLead.
 */
export async function createLead() {
  const res = await request("client/leads", "POST", {});
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create lead");
  }
  return res.json();
}

/**
 * Steps 2-7 — fire-and-forget update. Never throws; errors are silently ignored.
 */
export function fireUpdateLead(leadId, stepData) {
  request(`client/leads/${leadId}`, "PATCH", stepData).catch(() => {});
}

/**
 * Step 8 — final submit with all accumulated form data. Awaited.
 */
export async function submitFinalLead(leadId, allData) {
  const res = await request(`client/leads/${leadId}/submit`, "PUT", allData);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to submit");
  }
  return res.json();
}
