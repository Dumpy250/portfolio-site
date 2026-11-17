"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { jobFrames, jobMainFrames, type JobFrame, type JobCaptureView } from "@/lib/job-posting-captures";

function CaptureImage({ frame }: { frame: JobFrame }) {
  return (
    <div className="job-capture-scroll" tabIndex={0} role="region" aria-label={`${frame.label} screenshot — scroll horizontally to inspect`}>
      <Image unoptimized src={`/projects/job-posting-capture/details/${frame.id}.png`} width={frame.width} height={frame.height} alt={frame.alt} style={{ minWidth: frame.minimumWidth }} />
    </div>
  );
}

export default function JobPostingWalkthrough({ initialView = "walkthrough", initialStep = 0 }: { initialView?: JobCaptureView; initialStep?: number }) {
  const [view, setView] = useState<JobCaptureView>(initialView);
  const [step, setStep] = useState(() => Math.min(jobMainFrames.length - 1, Math.max(0, initialStep)));
  const frame = view === "employers" ? jobFrames.employers : view === "applicants" ? jobFrames.applicants : jobMainFrames[step];
  const original = `/projects/job-posting-capture/originals/${frame.id}.png`;
  const id = useId();
  const detailId = `job-capture-detail-${id}`;
  const titleId = `job-original-title-${id}`;
  const descriptionId = `job-original-description-${id}`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const originalScrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function openOriginal() {
    if (!dialogRef.current || dialogRef.current.open) return;
    dialogRef.current.showModal();
    if (originalScrollRef.current) {
      originalScrollRef.current.scrollLeft = 0;
      originalScrollRef.current.scrollTop = 0;
    }
  }

  return (
    <section className="job-captures" aria-labelledby="job-walkthrough-title">
      <p className="eyebrow">Recorded application screens</p>
      <h2 id="job-walkthrough-title">From employer to saved jobs</h2>
      <p>Manage employers and their job listings through real MVC forms and saved records.</p>
      <figure className="job-overview">
        <CaptureImage frame={jobFrames.jobs} />
        <figcaption><strong>Local demonstration with fictional data.</strong> Three saved jobs display their employer names.</figcaption>
      </figure>
      <p className="job-scroll-help">↔ Scroll wide screenshots horizontally to inspect every column. Focus the image region and use arrow keys, or swipe.</p>
      <p><strong>Application walkthrough.</strong> Explore the employer and job-management workflow through screenshots of this working ASP.NET Core MVC project.</p>
      <div className="job-view-buttons" role="group" aria-label="Job Posting capture views">
        {([
          ["walkthrough", "Employer → job walkthrough"],
          ["employers", "Saved employers"],
          ["applicants", "Applicants"],
        ] as const).map(([value, label]) => (
          <button key={value} type="button" aria-pressed={view === value} aria-controls={detailId} onClick={() => setView(value)}>{label}</button>
        ))}
      </div>
      {view === "walkthrough" ? (
        <div className="job-step-buttons" role="group" aria-label="Employer to job steps">
          {jobMainFrames.map((item, index) => (
            <button key={item.id} type="button" aria-pressed={step === index} aria-controls={detailId} onClick={() => setStep(index)}>{index + 1}. {item.label}</button>
          ))}
        </div>
      ) : null}
      <div id={detailId} className="job-selected-capture" aria-live="polite" aria-atomic="true">
        <p className="notice">Local demonstration with fictional data</p>
        {view === "walkthrough" ? <p className="eyebrow">Step {step + 1} of {jobMainFrames.length}</p> : <p className="eyebrow">Optional supporting view</p>}
        <h3>{frame.title}</h3>
        <p>{frame.caption}</p>
        <p className="job-capture-notice"><strong>What to notice:</strong> {frame.notice}</p>
        <figure>
          <CaptureImage key={frame.id} frame={frame} />
          <figcaption className="job-scroll-help">Crop of the recorded screen; original styling and text preserved. Scroll horizontally where needed.</figcaption>
        </figure>
      </div>
      {view === "walkthrough" ? (
        <div className="job-step-nav" role="group" aria-label="Walkthrough navigation">
          <button type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Previous step</button>
          <button type="button" disabled={step === jobMainFrames.length - 1} onClick={() => setStep((current) => Math.min(jobMainFrames.length - 1, current + 1))}>Next step</button>
        </div>
      ) : null}
      <button ref={triggerRef} type="button" className="job-original-trigger" onClick={openOriginal}>View original screenshot</button>
      <noscript><a href={original} target="_blank" rel="noreferrer">View original screenshot in a new tab ↗</a></noscript>
      <dialog ref={dialogRef} className="job-original-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onClose={() => triggerRef.current?.focus()}>
        <div className="job-original-header">
          <h3 id={titleId}>{frame.label} — original screenshot</h3>
          <button type="button" autoFocus onClick={() => dialogRef.current?.close()}>Close original screenshot</button>
        </div>
        <p id={descriptionId}>Local demonstration with fictional data. Unmodified 1440 × 1000 screenshot, displayed at its original dimensions. Scroll horizontally and vertically to inspect.</p>
        <div ref={originalScrollRef} className="job-original-scroll" tabIndex={0} role="region" aria-label="Original screenshot — scroll horizontally and vertically to inspect">
          <Image unoptimized src={original} width={1440} height={1000} alt={frame.alt} />
        </div>
        <a className="text-link" href={original} target="_blank" rel="noreferrer">Open original image in a new tab ↗</a>
      </dialog>
    </section>
  );
}
