"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const originalUrl = "https://youtu.be/xD3zZXMfMdQ?si=8U0xFu7OVxcllqCS";
const chapters = [
  { label: "1:17 · Experiment configuration", seconds: 77 },
  { label: "2:02 · Run capture", seconds: 122 },
  { label: "5:37 · Summary report", seconds: 337 },
] as const;

export default function CarlaVideo() {
  const [loaded, setLoaded] = useState(false);
  const player = useRef<HTMLIFrameElement>(null);
  useEffect(() => { if (loaded) player.current?.focus(); }, [loaded]);

  return (
    <section className="carla-video" aria-labelledby="carla-development-demo">
      <p className="eyebrow">Development recording</p>
      <h2 id="carla-development-demo" tabIndex={-1}>Sprint 4 development demo</h2>
      <p>Configure an experiment, capture a simulated drive, and generate a summary report.</p>
      <p className="notice">Earlier development recording, separate from the v1.0.0 application screenshots below.</p>
      <nav className="carla-video-chapters" aria-label="Video chapters on YouTube">
        {chapters.map((chapter) => (
          <a key={chapter.seconds} className="text-link" href={`https://www.youtube.com/watch?v=xD3zZXMfMdQ&t=${chapter.seconds}s`} target="_blank" rel="noreferrer">{chapter.label} ↗</a>
        ))}
      </nav>
      {loaded ? (
        <div className="carla-video-frame">
          <iframe
            ref={player}
            title="COT Sprint 4 demo — development recording"
            src="https://www.youtube-nocookie.com/embed/xD3zZXMfMdQ?autoplay=0&rel=0"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="carla-video-poster">
          <Image unoptimized src="/projects/carla-views/sprint-4-video-thumbnail.jpg" alt="YouTube thumbnail for COT Sprint 4 demo" width={480} height={360} />
          <div>
            <p>Load the player when you’re ready to watch.</p>
            <button type="button" className="carla-video-load" onClick={() => setLoaded(true)} aria-controls="carla-video-status">Load video player</button>
          </div>
        </div>
      )}
      <p id="carla-video-status" className="notice" role="status" aria-live="polite">{loaded ? "YouTube player loaded. Press Play to watch; playback does not start automatically." : "YouTube is contacted only when you load the player. No autoplay."}</p>
      <a className="text-link" href={originalUrl} target="_blank" rel="noreferrer">Open on YouTube ↗</a>
    </section>
  );
}
