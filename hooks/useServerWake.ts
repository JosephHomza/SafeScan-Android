import { useEffect, useRef, useState } from "react";
import { config } from "@/constants/config";

const START_DELAY_MS = 5000;
const POLL_INTERVAL_MS = 3000;
const DUMMY_URL = "https://safescan-qr.onrender.com";

async function pingBackend(signal: AbortSignal) {
  const health = await fetch(`${config.apiBaseUrl}/api/health`, { method: "GET", signal });
  if (health.ok) return true;
  if (health.status !== 404) return false;

  const analysis = await fetch(`${config.apiBaseUrl}/api/analyze`, {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: DUMMY_URL })
  });
  return analysis.ok;
}

export function useServerWake() {
  const mountedAt = useRef(Date.now());
  const [isWaking, setIsWaking] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isWaking) return undefined;

    const elapsedId = setInterval(() => {
      setElapsed(Math.floor((Date.now() - mountedAt.current) / 1000));
    }, 1000);

    return () => clearInterval(elapsedId);
  }, [isWaking]);

  useEffect(() => {
    const controller = new AbortController();
    let pollId: ReturnType<typeof setInterval> | null = null;

    const checkServer = async () => {
      try {
        if (await pingBackend(controller.signal)) {
          setIsWaking(false);
          if (pollId) clearInterval(pollId);
        }
      } catch {
        setIsWaking(true);
      }
    };

    const startId = setTimeout(() => {
      void checkServer();
      pollId = setInterval(() => void checkServer(), POLL_INTERVAL_MS);
    }, START_DELAY_MS);

    return () => {
      controller.abort();
      clearTimeout(startId);
      if (pollId) clearInterval(pollId);
    };
  }, []);

  return { isWaking, elapsed };
}
