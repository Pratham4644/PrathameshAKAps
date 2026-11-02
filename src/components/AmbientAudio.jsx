/**
 * Loops the piano bed. Browsers block sound until a click, so the first
 * tap on the page (or the speaker button) unlocks playback.
 */
import { useEffect, useRef, useState } from "react";
import track from "../assets/idila_piano.mp3";

export default function AmbientAudio() {
  const audioRef = useRef(null);
  const wantedRef = useRef(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(track);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.4;
    audioRef.current = audio;

    const start = () => {
      if (!wantedRef.current) return;
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    audio.play().then(() => setPlaying(true)).catch(() => {});
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      wantedRef.current = false;
      audio.pause();
      setPlaying(false);
      return;
    }
    wantedRef.current = true;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Mute piano" : "Play piano"}
      title={playing ? "Mute" : "Play"}
    >
      {playing ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 10v4h3l4 3V7L7 10H4z" fill="currentColor" />
          <path d="M15 9.5c1.2 1.2 1.2 3.8 0 5M17.5 7c2.4 2.4 2.4 7.6 0 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 10v4h3l4 3V7L7 10H4z" fill="currentColor" />
          <path d="M16 9.5 20.5 14.5M20.5 9.5 16 14.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
