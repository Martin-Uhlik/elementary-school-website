"use client";

import { useRef, useState } from "react";

const sources = [
  { label: "1080", src: "/data/videos/zsmp_compressed_1080.mp4" },
  { label: "720", src: "/data/videos/zsmp_compressed_720.mp4" },
  { label: "480", src: "/data/videos/zsmp_compressed_420.mp4" },
];

// native replacement for the video.js player with the resolution switcher
const VideoTour = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const [quality, setQuality] = useState(sources[0]);

  const switchQuality = (label: string) => {
    const video = ref.current;
    const next = sources.find((s) => s.label === label)!;
    const time = video?.currentTime ?? 0;
    const playing = video ? !video.paused : false;
    setQuality(next);
    if (!video) return;
    video.src = next.src;
    video.currentTime = time;
    if (playing) video.play();
  };

  return (
    <>
      <video
        id="video-tour"
        ref={ref}
        className="video-js"
        controls
        preload="none"
        poster="/data/images/carousel_1.jpg"
        src={quality.src}
      >
        {/* no speech in the video; the captions carry its on-screen labels */}
        <track kind="captions" src="/data/videos/zsmp.cs.vtt" srcLang="cs" label="Čeština" />
        Pro přehrání videa je potřeba prohlížeč s podporou HTML5 videa.
      </video>
      <label className="video-quality">
        Kvalita:{" "}
        <select value={quality.label} onChange={(e) => switchQuality(e.target.value)}>
          {sources.map((s) => (
            <option key={s.label} value={s.label}>
              {s.label}p
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default VideoTour;
