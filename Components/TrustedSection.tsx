"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MarqueueProps {
  items?: string[];
}

export default function TrustedSection({
  items = [
    "/Logo/figma.png",
    "/Logo/google.png",
    "/Logo/meta.png",
    "/Logo/Microsoft.png",
    "/Logo/notion.png",
    "/Logo/Nvidia.png",
    "/Logo/Perplexity.png",
    "/Logo/tcs.png",
  ],
}: MarqueueProps): React.ReactElement {
  const containerRef = useRef<HTMLElement | null>(null);

  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      itemRefs.current.forEach((el) => {
        if (!el) return;
        el.style.transform = "translateY(0) scale(1)";
        el.style.opacity = "1";
        el.style.filter = "blur(0px)";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const targets = itemRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(targets, {
        y: 100,
        opacity: 0,
        scale: 0.8,
        filter: "blur(8px)",
      });

      gsap.to(targets, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full mx-auto px-4 py-8 bg-[#FFF4EC] flex justify-center items-center"
      aria-labelledby="trusted-heading"
    >
      <div className="w-[98%] md:w-[90%] lg:w-[82%]">
        <h2
          id="trusted-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#25170D] mb-6 flex flex-wrap items-center justify-center gap-2"
        >
          <span>Trusted By Top Companies</span>
          <span className="text-[#F54A00] bg-[#FFE5C0] px-2 py-2 rounded-xl">
            HR / Recruiter
          </span>
        </h2>

        <div className="bg-[#FFE5C0] rounded-lg p-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-2">
            {items.map((item, idx) => (
              <div
                key={`logo-${idx}`}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className="flex items-center justify-center bg-white/90 rounded-md p-3 h-20 md:h-24 lg:h-28"
              >
                <img
                  src={item}
                  alt={`trusted-logo-${idx}`}
                  loading="lazy"
                  className="max-w-[90px] sm:max-w-[110px] md:max-w-[140px] lg:max-w-40 w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
