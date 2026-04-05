import { toast } from "react-toastify";
import { Success, Failed } from "./toast";

const BASE_URL = process.env.NEXT_PUBLIC_URL;
const CHUNK_SIZE = 1 * 1024 * 1024; // 1 MB

/**
 * Upload a file in 1 MB chunks, updating progress as it goes.
 *
 * @param {File}     file        - File object to upload
 * @param {Function} setProgress - Called with 0–100 percentage
 * @param {Function} setOverlay  - Called with true/false to show upload overlay
 * @param {boolean}  isClient    - Whether to use the client upload endpoint
 * @returns {Promise<{ url: string, status: number } | undefined>}
 */
export async function uploadInChunks(file, setProgress, setOverlay, isClient) {
  const toastId = toast.loading("Uploading");

  try {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let finalFileUrl;

    setOverlay(true);

    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);

      const formData = new FormData();
      formData.append("chunk", chunk);
      formData.append("filename", file.name);
      formData.append("chunkIndex", i);
      formData.append("totalChunks", totalChunks);

      const endpoint = isClient ? "client/upload" : "utility/upload-chunk";
      const res = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const json = await res.json();
      if (json.url) finalFileUrl = json.url;

      setProgress(Math.round(((i + 1) / totalChunks) * 100));
    }

    setOverlay(false);
    toast.update(toastId, Success("Uploaded successfully"));

    return { url: finalFileUrl, status: finalFileUrl ? 200 : 500 };
  } catch (err) {
    setOverlay(false);
    toast.update(toastId, Failed("Upload failed"));
  }
}
