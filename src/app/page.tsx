"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SceneKey = "clocks" | "futuristic" | "unknown" | "numbers";

type Segment = {
  id: string;
  text: string;
  highlight: string;
  scene: SceneKey;
  duration: number;
};

const segments: Segment[] = [
  {
    id: "saving",
    text: "People are saving HOURS every week",
    highlight: "saving HOURS every week",
    scene: "clocks",
    duration: 3600
  },
  {
    id: "new-tools",
    text: "using new free AI tools…",
    highlight: "new free AI tools",
    scene: "futuristic",
    duration: 3200
  },
  {
    id: "awareness",
    text: "but most people still don’t know they exist.",
    highlight: "don’t know they exist",
    scene: "unknown",
    duration: 2900
  },
  {
    id: "count",
    text: "Today, I’ll show you 5 powerful AI tools that can boost your productivity instantly — and every one of them is completely free.",
    highlight: "5 powerful AI tools",
    scene: "numbers",
    duration: 7000
  }
];

const script = segments.map((segment) => segment.text).join(" ");

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechReady, setSpeechReady] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timersRef = useRef<number[]>([]);

  const totalDuration = useMemo(
    () => segments.reduce((total, segment) => total + segment.duration, 0),
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.speechSynthesis !== "undefined") {
      setSpeechReady(true);
    }

    return () => {
      stopNarration();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  const stopNarration = () => {
    clearTimers();
    if (typeof window !== "undefined" && typeof window.speechSynthesis !== "undefined") {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    setIsSpeaking(false);
    setCurrentIndex(null);
  };

  const startNarration = () => {
    if (!speechReady) {
      return;
    }

    stopNarration();
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 0.9;
    utterance.volume = 1;
    utterance.onend = () => {
      stopNarration();
    };
    utterance.onerror = () => {
      stopNarration();
    };

    utteranceRef.current = utterance;

    if (typeof window !== "undefined" && typeof window.speechSynthesis !== "undefined") {
      window.speechSynthesis.speak(utterance);
    }

    let elapsed = 0;
    segments.forEach((segment, index) => {
      const timer = window.setTimeout(() => {
        setCurrentIndex(index);
      }, elapsed);
      timersRef.current.push(timer);
      elapsed += segment.duration;
    });

    const finalTimer = window.setTimeout(() => {
      stopNarration();
    }, totalDuration + 100);
    timersRef.current.push(finalTimer);
  };

  const currentScene: SceneKey | null =
    typeof currentIndex === "number" ? segments[currentIndex]?.scene ?? null : null;

  return (
    <main className="app-container">
      <div className="video-shell">
        <div className="info-panel">
          <div className="topline">AI Productivity Spotlight</div>
          <h1 className="headline">5 Free AI Tools You Should Be Using</h1>
          <p className="subtitle">
            A cinematic AI avatar delivers the playbook. Hit play to hear the narration and watch the visuals react in real time.
          </p>
          <div className="controls-row">
            <button className="cta" onClick={startNarration} disabled={!speechReady || isSpeaking}>
              {isSpeaking ? "Playing" : "Play narration"}
            </button>
            <button className="secondary" onClick={stopNarration} disabled={!isSpeaking}>
              Stop
            </button>
          </div>
        </div>
        <div className="stage-grid">
          <div className="avatar-column">
            <Avatar speaking={isSpeaking} />
            <ScriptPanel currentIndex={currentIndex} />
          </div>
          <BrollStage scene={currentScene} />
        </div>
      </div>
    </main>
  );
}

function Avatar({ speaking }: { speaking: boolean }) {
  return (
    <div className="avatar-wrapper">
      <div className="avatar-glow" />
      <div className="avatar-core">
        <div className="avatar-face">
          <div className="avatar-eyes">
            <span className="avatar-eye" />
            <span className="avatar-eye" />
          </div>
          <div className={`avatar-mouth${speaking ? " avatar-mouth--speaking" : ""}`} />
        </div>
      </div>
    </div>
  );
}

function ScriptPanel({ currentIndex }: { currentIndex: number | null }) {
  return (
    <div className="script-panel">
      {segments.map((segment, index) => {
        const isActive = index === currentIndex;
        return (
          <div key={segment.id} className={`script-line${isActive ? " script-line--active" : ""}`}>
            <span className="script-line__text">{segment.text}</span>
            <span className="script-line__highlight">{segment.highlight}</span>
          </div>
        );
      })}
    </div>
  );
}

function BrollStage({ scene }: { scene: SceneKey | null }) {
  return (
    <div className="broll-panel">
      <AnimatePresence mode="wait">
        {scene && (
          <motion.div
            key={scene}
            className="broll-scene"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {scene === "clocks" && <ClockScene />}
            {scene === "futuristic" && <FuturisticScene />}
            {scene === "unknown" && <AwarenessScene />}
            {scene === "numbers" && <NumbersScene />}
            <motion.div
              className="scanline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ClockScene() {
  return (
    <div className="scene scene--clocks">
      <div className="clock-orb clock-orb--lg">
        <div className="clock-face">
          <span className="clock-hand clock-hand--hour" />
          <span className="clock-hand clock-hand--minute" />
        </div>
      </div>
      <div className="clock-orb clock-orb--md" />
      <div className="clock-orb clock-orb--sm" />
      <div className="clock-rings" />
    </div>
  );
}

function FuturisticScene() {
  return (
    <div className="scene scene--futuristic">
      <div className="grid" />
      <div className="hud-card hud-card--primary">
        <span />
        <span />
        <span />
      </div>
      <div className="hud-card hud-card--secondary">
        <span />
        <span />
      </div>
      <div className="hud-wave" />
    </div>
  );
}

function AwarenessScene() {
  return (
    <div className="scene scene--awareness">
      <div className="silhouette" />
      <div className="question-bubble question-bubble--left">?</div>
      <div className="question-bubble question-bubble--right">?</div>
    </div>
  );
}

function NumbersScene() {
  return (
    <div className="scene scene--numbers">
      {[1, 2, 3, 4, 5].map((num) => (
        <div key={num} className={`tool-badge tool-badge--${num}`}>
          <span>{num}</span>
        </div>
      ))}
    </div>
  );
}
