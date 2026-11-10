"use client";

import Script from "next/script";
import { useEffect } from "react";
import { publicEnv } from "@/lib/public-env";

declare global {
  interface Window {
    plausible?: ((event: string, options?: { props?: Record<string, string> }) => void) & { q?: unknown[] };
  }
}

export function track(event: string, props?: Record<string, string>) {
  window.plausible?.(event, props ? { props } : undefined);
}

export function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (el?.dataset.track) track(el.dataset.track, { path: window.location.pathname });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!publicEnv.plausibleDomain) return null;
  return (
    <Script
      src="https://plausible.io/js/script.js"
      data-domain={publicEnv.plausibleDomain}
      strategy="afterInteractive"
    />
  );
}
