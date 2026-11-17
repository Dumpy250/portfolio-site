"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { carlaViews, getCarlaView, type CarlaViewId } from "@/lib/carla-views";

export default function CarlaViews({ initialView = "explorer" }: { initialView?: CarlaViewId }) {
  const [selectedId, setSelectedId] = useState<CarlaViewId>(() => getCarlaView(initialView).id);
  const view = getCarlaView(selectedId);
  const instanceId = useId();
  const originalTitleId = `carla-original-title-${instanceId}`;
  const originalDescriptionId = `carla-original-description-${instanceId}`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const originalScrollRef = useRef<HTMLDivElement>(null);
  const originalTriggerRef = useRef<HTMLButtonElement>(null);

  function openOriginal() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    if (originalScrollRef.current) {
      originalScrollRef.current.scrollTop = 0;
      originalScrollRef.current.scrollLeft = 0;
    }
  }

  return (
    <div className="carla-views">
      <p className="notice">Application screenshots from v1.0.0.</p>
      <p>These are recorded views, not a live application and not a continuous captured sequence.</p>
      <div className="carla-view-buttons" role="group" aria-label="Application screenshot views">
        {carlaViews.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === view.id}
            aria-controls="carla-view-detail"
            onClick={() => setSelectedId(item.id)}
          >{item.label}</button>
        ))}
      </div>
      <div id="carla-view-detail" className="carla-view-detail" aria-live="polite" aria-atomic="true">
        <h3>{view.title}</h3>
        <p>{view.caption}</p>
        <p className="carla-notice"><strong>What to notice:</strong> {view.notice}</p>
        <div className="carla-details">
          {view.details.map((detail) => (
            <figure className="carla-detail" key={detail.src}>
              <figcaption>{detail.title}</figcaption>
              <div
                className="carla-detail-scroll"
                tabIndex={0}
                role="region"
                aria-label={`${detail.title} screenshot detail — scroll horizontally to inspect`}
              >
                <Image
                  unoptimized
                  className="carla-detail-image"
                  src={detail.src}
                  width={detail.width}
                  height={detail.height}
                  alt={detail.alt}
                />
              </div>
              <p className="carla-scroll-help">↔ Scroll horizontally to inspect the full detail. Focus the image region and use the arrow keys, or swipe.</p>
            </figure>
          ))}
        </div>
      </div>
      <button ref={originalTriggerRef} type="button" className="carla-original-trigger" onClick={openOriginal}>View original screenshot</button>
      <noscript><a href={view.original.src} target="_blank" rel="noreferrer">View original screenshot in a new tab ↗</a></noscript>
      <dialog
        ref={dialogRef}
        className="carla-original-dialog"
        aria-labelledby={originalTitleId}
        aria-describedby={originalDescriptionId}
        onClose={() => originalTriggerRef.current?.focus()}
      >
        <div className="carla-original-header">
          <h3 id={originalTitleId}>{view.label} — original screenshot</h3>
          <button type="button" autoFocus onClick={() => dialogRef.current?.close()}>Close original screenshot</button>
        </div>
        <p id={originalDescriptionId}>Recorded v1.0.0 application screenshot at its original {view.original.width} × {view.original.height} pixels. Scroll horizontally and vertically to inspect the entire image.</p>
        <div
          ref={originalScrollRef}
          className="carla-original-scroll"
          tabIndex={0}
          role="region"
          aria-label={`${view.label} original screenshot — scroll horizontally and vertically to inspect`}
        >
          <Image
            unoptimized
            className="carla-original-image"
            src={view.original.src}
            width={view.original.width}
            height={view.original.height}
            alt={view.original.alt}
          />
        </div>
        <a className="text-link" href={view.original.src} target="_blank" rel="noreferrer">Open original image in a new tab ↗</a>
      </dialog>
    </div>
  );
}
