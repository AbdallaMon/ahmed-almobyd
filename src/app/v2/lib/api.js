import { toast } from "react-toastify";
import { Success, Failed } from "./toast";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

/**
 * Submit a form request (POST / PUT / DELETE) with a loading toast.
 *
 * @param {object}   data          - Request body
 * @param {Function} setLoading    - Setter from ToastContext / local state
 * @param {string}   path          - API path (relative, e.g. "client/new-lead")
 * @param {boolean}  isFileUpload  - Use FormData instead of JSON
 * @param {string}   toastMessage  - Toast text shown while loading
 * @param {Function} [setRedirect] - Called with `prev => !prev` on success (optional)
 * @param {string}   [method]      - HTTP verb (default: "POST")
 * @param {string}   [header]      - Override Content-Type header (optional)
 * @returns {Promise<object>}      - Response JSON with .status property
 */
export async function handleRequestSubmit(
  data,
  setLoading,
  path,
  isFileUpload = false,
  toastMessage = "Sending...",
  setRedirect,
  method = "POST",
  header,
) {
  const toastId = toast.loading(toastMessage);
  const body = isFileUpload ? data : JSON.stringify(data);
  const headers = header
    ? { "Content-Type": header }
    : isFileUpload
      ? {}
      : { "Content-Type": "application/json" };

  setLoading(true);

  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method,
      body,
      headers,
      credentials: "include",
    });

    const status = response.status;
    const result = await response.json();
    result.status = status;

    if (status === 200) {
      toast.update(toastId, Success(result.message));
      if (setRedirect) setRedirect((prev) => !prev);
    } else {
      toast.update(toastId, Failed(result.message));
    }

    return result;
  } catch (err) {
    toast.update(toastId, Failed("Error, " + err.message));
    return { status: 500, message: "Error, " + err.message };
  } finally {
    setLoading(false);
  }
}

/**
 * Fetch paginated/filtered data via GET.
 *
 * @returns {Promise<object|undefined>} - Response JSON with .status property
 */
export async function getData({
  url = "",
  setLoading,
  page,
  limit,
  filters,
  search,
  sort,
  others,
}) {
  try {
    setLoading(true);

    const queryPrefix = url.endsWith("&") ? "" : "?";
    const queryString =
      `${queryPrefix}page=${page}&limit=${limit}` +
      `&filters=${JSON.stringify(filters)}` +
      `&search=${search}` +
      `&sort=${JSON.stringify(sort)}` +
      `&${others}`;

    const response = await fetch(`${BASE_URL}/${url}${queryString}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const status = response.status;
    const result = await response.json();
    result.status = status;
    return result;
  } catch (err) {
    console.error("getData error:", err);
  } finally {
    setLoading(false);
  }
}
