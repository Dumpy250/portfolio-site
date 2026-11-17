"use client";

import { useState } from "react";

type CopyResult = "copied" | "unavailable" | "error";
type ClipboardWriter = { writeText: (value: string) => Promise<void> };

export async function writeEmailToClipboard(
  email: string,
  clipboard?: ClipboardWriter,
): Promise<CopyResult> {
  if (!clipboard || typeof clipboard.writeText !== "function") return "unavailable";
  try {
    await clipboard.writeText(email);
    return "copied";
  } catch {
    return "error";
  }
}

export default function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<CopyResult | "idle" | "copying">("idle");

  async function copyEmail() {
    if (status === "copying") return;
    setStatus("copying");
    try {
      const clipboard = typeof navigator === "undefined" ? undefined : navigator.clipboard;
      setStatus(await writeEmailToClipboard(email, clipboard));
    } catch {
      setStatus("error");
    }
  }

  const feedback = status === "copied"
    ? "Email address copied."
    : status === "error" || status === "unavailable"
      ? "Couldn’t copy automatically. Select and copy the address above."
      : "";

  return (
    <div className="copy-email-control">
      <button
        type="button"
        className="copy-email-button"
        aria-label="Copy email address"
        aria-describedby="copy-email-status"
        aria-disabled={status === "copying"}
        aria-busy={status === "copying"}
        onClick={copyEmail}
      >
        {status === "copied" ? "Copied" : status === "copying" ? "Copying…" : "Copy email"}
      </button>
      <span id="copy-email-status" className="copy-email-feedback" role="status" aria-live="polite" aria-atomic="true">
        {feedback}
      </span>
    </div>
  );
}
