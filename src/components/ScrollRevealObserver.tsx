"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Observador ligero con IntersectionObserver para animar la aparición gradual
 * y escalonada (fade-up) de elementos con la clase `.scroll-reveal` a medida
 * que el usuario hace scroll hacia abajo en la página.
 */
export function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = document.querySelectorAll<HTMLElement>(
      ".scroll-reveal:not(.is-revealed)"
    );
    if (elements.length === 0) return;

    // Respetar preferencia de movimiento reducido del usuario
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const delayAttr = target.dataset.revealDelay;
            if (delayAttr) {
              target.style.setProperty("--reveal-delay", `${delayAttr}ms`);
            }
            target.classList.add("is-revealed");
            observer.unobserve(target);
          }
        }
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
