"use client";

import { useRef, useState } from "react";

const sources = [
  { label: "1080", src: "/data/videos/zsmp_compressed_1080.mp4" },
  { label: "720", src: "/data/videos/zsmp_compressed_720.mp4" },
  { label: "480", src: "/data/videos/zsmp_compressed_420.mp4" },
];

// native replacement for the video.js player; the resolution switcher sits in the player's corner
const VideoTour = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const [quality, setQuality] = useState(sources[0]);
  const [playing, setPlaying] = useState(false);

  const switchQuality = (label: string) => {
    const video = ref.current;
    const next = sources.find((s) => s.label === label)!;
    const time = video?.currentTime ?? 0;
    const wasPlaying = video ? !video.paused : false;
    setQuality(next);
    if (!video) return;
    video.src = next.src;
    video.currentTime = time;
    if (wasPlaying) video.play();
  };

  return (
    <div className={`video-player${playing ? " is-playing" : ""}`}>
      <video
        id="video-tour"
        ref={ref}
        controls
        preload="none"
        poster="/data/images/carousel_1.jpg"
        src={quality.src}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {/* no speech in the video; the captions carry its on-screen labels */}
        <track kind="captions" src="/data/videos/zsmp.cs.vtt" srcLang="cs" label="Čeština" />
        Pro přehrání videa je potřeba prohlížeč s podporou HTML5 videa.
      </video>
      <div className="video-quality dropdown">
        <button
          type="button"
          className="video-quality__toggle dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-label={`Kvalita videa: ${quality.label}p`}
        >
          {quality.label}p
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {sources.map((s) => (
            <li key={s.label}>
              <button
                type="button"
                className={`dropdown-item${s.label === quality.label ? " active" : ""}`}
                aria-pressed={s.label === quality.label}
                onClick={() => switchQuality(s.label)}
              >
                {s.label}p
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoTour;
