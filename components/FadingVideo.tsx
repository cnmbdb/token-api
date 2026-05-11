"use client";

import { useEffect, useRef } from "react";

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

const FADE_MS = 600;

type VideoWithRaf = HTMLVideoElement & { _rafId?: number };

function cancelFade(video: VideoWithRaf) {
  if (video._rafId !== undefined) {
    cancelAnimationFrame(video._rafId);
    video._rafId = undefined;
  }
}

function fadeTo(
  video: VideoWithRaf,
  targetOpacity: number,
  duration: number
): Promise<void> {
  return new Promise((resolve) => {
    cancelFade(video);
    const startOpacity = parseFloat(video.style.opacity || "0");
    if (startOpacity === targetOpacity) {
      resolve();
      return;
    }

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      video.style.opacity = String(
        startOpacity + (targetOpacity - startOpacity) * easeProgress
      );

      if (progress < 1) {
        video._rafId = requestAnimationFrame(tick);
      } else {
        video.style.opacity = String(targetOpacity);
        resolve();
      }
    }

    video._rafId = requestAnimationFrame(tick);
  });
}

export default function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<"a" | "b">("a");
  const switchingRef = useRef(false);
  const startedRef = useRef(false);
  const aReadyRef = useRef(false);
  const bReadyRef = useRef(false);

  useEffect(() => {
    const videoA = videoARef.current!;
    const videoB = videoBRef.current!;
    const vidA = videoA as VideoWithRaf;
    const vidB = videoB as VideoWithRaf;

    async function performSwitch(to: "a" | "b") {
      if (switchingRef.current) return;
      switchingRef.current = true;
      activeRef.current = to;

      const standby = to === "b" ? videoB : videoA;
      const standbyVid = to === "b" ? vidB : vidA;
      const current = to === "b" ? videoA : videoB;
      const currentVid = to === "b" ? vidA : vidB;

      standby.currentTime = 0;
      standby.style.opacity = "0";

      try {
        await standby.play();
      } catch {}

      await Promise.all([
        fadeTo(standbyVid, 1, FADE_MS),
        fadeTo(currentVid, 0, FADE_MS),
      ]);

      current.pause();
      switchingRef.current = false;
    }

    function handleEndedA() {
      if (activeRef.current !== "a" || switchingRef.current) return;
      performSwitch("b");
    }

    function handleEndedB() {
      if (activeRef.current !== "b" || switchingRef.current) return;
      performSwitch("a");
    }

    function handleLoadedDataA() {
      aReadyRef.current = true;
      if (startedRef.current) return;
      startedRef.current = true;
      videoA.play().catch(() => {});
      fadeTo(vidA, 1, FADE_MS);
    }

    function handleLoadedDataB() {
      bReadyRef.current = true;
    }

    videoA.addEventListener("loadeddata", handleLoadedDataA);
    videoA.addEventListener("ended", handleEndedA);
    videoB.addEventListener("loadeddata", handleLoadedDataB);
    videoB.addEventListener("ended", handleEndedB);

    return () => {
      cancelFade(vidA);
      cancelFade(vidB);
      videoA.removeEventListener("loadeddata", handleLoadedDataA);
      videoA.removeEventListener("ended", handleEndedA);
      videoB.removeEventListener("loadeddata", handleLoadedDataB);
      videoB.removeEventListener("ended", handleEndedB);
      videoA.pause();
      videoB.pause();
    };
  }, []);

  return (
    <>
      <video
        ref={videoARef}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        loop={false}
        className={className}
        style={{ opacity: 0, ...style }}
      />
      <video
        ref={videoBRef}
        src={src}
        muted
        playsInline
        preload="auto"
        loop={false}
        className={className}
        style={{ opacity: 0, ...style }}
      />
    </>
  );
}
