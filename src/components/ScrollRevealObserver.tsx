"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      (typeof CSS !== "undefined" &&
        CSS.supports("(animation-timeline: view()) and (animation-range: entry)"))
    ) {
      return;
    }

    const elements = document.querySelectorAll<HTMLElement>(".scroll-reveal");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
