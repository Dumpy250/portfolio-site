"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  getReservationStep,
  moveReservationStep,
  reservationDemoLabel,
  reservationOriginalSize,
  reservationSteps,
  type ReservationStepId,
} from "@/lib/reservation-import";

export default function ReservationImport({ initialStep = 1 }: { initialStep?: ReservationStepId }) {
  const [selected, setSelected] = useState<ReservationStepId>(initialStep);
  const dialog = useRef<HTMLDialogElement>(null);
  const fullScreenshotButton = useRef<HTMLButtonElement>(null);
  const step = getReservationStep(selected);
  const position = reservationSteps.findIndex((item) => item.id === selected) + 1;

  function openOriginal() {
    dialog.current?.showModal();
    // Reset inspection position for each original; retain its entire pixel area.
    const viewport = dialog.current?.querySelector(".reservation-original-viewport");
    if (viewport) viewport.scrollTop = viewport.scrollLeft = 0;
  }

  return (
    <div className="source-explorer reservation-explorer">
      <p className="eyebrow">{reservationDemoLabel}</p>
      <div className="explorer-controls reservation-steps" role="group" aria-label="Recorded screenshot steps">
        {reservationSteps.map((item, index) => (
          <button key={item.id} type="button" aria-current={selected === item.id ? "step" : undefined} aria-controls="reservation-step-detail" onClick={() => setSelected(item.id)}>{index + 1}. {item.label}</button>
        ))}
      </div>
      <div className="explorer-detail" id="reservation-step-detail">
        <div role="status" aria-live="polite" aria-atomic="true">
          <p className="explorer-selection">Step {position} of {reservationSteps.length}</p>
          <h3>{step.label}</h3>
          <p>{step.caption}</p>
          <p>{step.detail}</p>
        </div>
        <figure className="reservation-step-image">
          <Image unoptimized src={step.crop} alt={step.alt} width={step.width} height={step.height} sizes="(max-width: 850px) 90vw, 790px" />
          <figcaption className="notice">Detail crop. {reservationDemoLabel}.</figcaption>
        </figure>
        <div className="reservation-actions explorer-controls">
          <button type="button" ref={fullScreenshotButton} onClick={openOriginal} aria-haspopup="dialog">View full screenshot</button>
        </div>
        <noscript><a className="text-link" href={step.original} target="_blank" rel="noreferrer">View full screenshot ↗</a></noscript>
      </div>
      <div className="explorer-controls reservation-pagination" role="group" aria-label="Screenshot navigation">
        <button type="button" disabled={selected === reservationSteps[0].id} aria-controls="reservation-step-detail" onClick={() => setSelected((id) => moveReservationStep(id, "previous"))}>Previous</button>
        <button type="button" disabled={selected === reservationSteps[reservationSteps.length - 1].id} aria-controls="reservation-step-detail" onClick={() => setSelected((id) => moveReservationStep(id, "next"))}>Next</button>
      </div>
      <dialog ref={dialog} className="reservation-full-dialog" aria-labelledby="reservation-full-title" aria-describedby="reservation-full-help" onClose={() => fullScreenshotButton.current?.focus()}>
        <div className="reservation-dialog-heading explorer-controls">
          <h3 id="reservation-full-title">{step.label} · full screenshot</h3>
          <button type="button" autoFocus onClick={() => dialog.current?.close()}>Close full screenshot</button>
        </div>
        <p>{reservationDemoLabel}</p>
        <p id="reservation-full-help">Original capture at actual size (1456 × 986). Scroll horizontally and vertically to inspect the complete image. Press Escape to close.</p>
        <div className="reservation-original-viewport" tabIndex={0} role="region" aria-label={`${step.label}: complete original screenshot, scroll to inspect`}>
          <Image unoptimized src={step.original} alt={`Complete original screenshot. ${step.caption} Includes browser chrome and the table state at capture time.`} width={reservationOriginalSize.width} height={reservationOriginalSize.height} />
        </div>
        <a className="text-link" href={step.original} target="_blank" rel="noreferrer">Open original image in new tab ↗</a>
      </dialog>
    </div>
  );
}
