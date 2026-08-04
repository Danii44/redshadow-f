"use client";

import { useEffect, useState } from 'react';

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const minimumDuration = 5000;
    const start = performance.now();
    let timeoutId: number | undefined;

    const hideLoader = () => {
      setIsVisible(false);
      document.body.style.overflow = '';
    };

    document.body.style.overflow = 'hidden';

    const onPageLoaded = () => {
      const elapsed = performance.now() - start;
      const remaining = minimumDuration - elapsed;
      timeoutId = window.setTimeout(() => hideLoader(), Math.max(remaining, 0));
    };

    if (document.readyState === 'complete') {
      onPageLoaded();
    } else {
      window.addEventListener('load', onPageLoaded, { once: true });
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      document.body.style.overflow = '';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="site-loader-shell" aria-live="polite" aria-busy="true">
      <div className="site-loader-card">
        <div className="site-loader-gear">⚙</div>
        <div className="site-loader-ring site-loader-ring-a" />
        <div className="site-loader-ring site-loader-ring-b" />
        <p className="site-loader-text">Initializing visual systems</p>
      </div>
    </div>
  );
}
