"use client";

import { useEffect, useRef, useState } from "react";

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  loadMode?: "eager" | "visible";
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

export default function FadingVideo({
  src,
  className,
  style,
  loadMode = "visible",
}: FadingVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<"a" | "b">("a");
  const switchingRef = useRef(false);
  const startedRef = useRef(false);
  const visibleRef = useRef(loadMode === "eager");
  const [shouldLoad, setShouldLoad] = useState(loadMode === "eager");

  useEffect(() => {
    if (loadMode === "eager") {
      visibleRef.current = true;
      setShouldLoad(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          visibleRef.current = true;
          setShouldLoad(true);

          const activeVideo =
            activeRef.current === "a" ? videoARef.current : videoBRef.current;
          activeVideo?.play().catch(() => {});
          return;
        }

        visibleRef.current = false;
        videoARef.current?.pause();
        videoBRef.current?.pause();
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [loadMode]);

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
        standby.preload = "metadata";
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
      if (startedRef.current) return;
      if (!visibleRef.current) return;
      startedRef.current = true;
      videoA.play().catch(() => {});
      fadeTo(vidA, 1, FADE_MS);
    }

    videoA.addEventListener("loadeddata", handleLoadedDataA);
    videoA.addEventListener("ended", handleEndedA);
    videoB.addEventListener("ended", handleEndedB);

    return () => {
      cancelFade(vidA);
      cancelFade(vidB);
      videoA.removeEventListener("loadeddata", handleLoadedDataA);
      videoA.removeEventListener("ended", handleEndedA);
      videoB.removeEventListener("ended", handleEndedB);
      videoA.pause();
      videoB.pause();
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={style}>
      <video
        ref={videoARef}
        src={shouldLoad ? src : undefined}
        autoPlay
        muted
        playsInline
        preload={loadMode === "eager" ? "metadata" : "none"}
        loop={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
      />
      <video
        ref={videoBRef}
        src={shouldLoad ? src : undefined}
        muted
        playsInline
        preload="none"
        loop={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
