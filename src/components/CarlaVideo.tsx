"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const originalUrl = "https://www.youtube.com/watch?v=wsCNO4Om8qI";

export default function CarlaVideo() {
  const [loaded, setLoaded] = useState(false);
  const player = useRef<HTMLIFrameElement>(null);
  useEffect(() => { if (loaded) player.current?.focus(); }, [loaded]);

  return (
    <section className="carla-video" aria-labelledby="carla-final-presentation">
      <p className="eyebrow">Final presentation</p>
      <h2 id="carla-final-presentation" tabIndex={-1}>Final presentation demo</h2>
      <p>Watch the CARLA Observability Toolkit final presentation demo.</p>
      <p className="notice">Final presentation recording; dashboard screenshots below are from v1.0.0.</p>
      {loaded ? (
        <div className="carla-video-frame">
          <iframe
            ref={player}
            title="CARLA Observability Toolkit — final presentation demo"
            src="https://www.youtube-nocookie.com/embed/wsCNO4Om8qI?autoplay=0&rel=0"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="carla-video-poster">
          <Image unoptimized src="/projects/carla-views/final-presentation-thumbnail.jpg" alt="YouTube thumbnail for COT final presentation demo" width={480} height={360} />
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
