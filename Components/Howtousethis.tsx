"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Howtousethis() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (!el) return;
    if (!cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useLayoutEffect(() => {
    cardsRef.current = cardsRef.current.filter(Boolean);

    if (!wrapperRef.current || cardsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      const totalCards = cardsRef.current.length;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const perCardScroll = Math.max(320, window.innerHeight * 0.6);
        const totalScroll = perCardScroll * totalCards;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top+=80",
            end: () => `+=${totalScroll}`,
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            markers: process.env.NODE_ENV === "development",
          },
        });

        tl.from(cardsRef.current, {
          y: 120,
          opacity: 0,
          scale: 0.98,
          duration: 0.9,
          ease: "power3.out",
          stagger: {
            each: 0.28,
            amount: totalCards * 0.28,
          },
        });

        return () => {
          tl.scrollTrigger && tl.scrollTrigger.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(cardsRef.current, { clearProps: "all" });

        return () => {
          gsap.set(cardsRef.current, { clearProps: "all" });
        };
      });

      return () => {
        mm.revert();
      };
    }, wrapperRef.current ?? undefined);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#FFF4EC] text-[#2b2219] w-full flex flex-col justify-center items-center mt-24">
      <div className="w-[90%] md:w-[75%]">
        <h2
          style={{ fontFamily: "Fontspring" }}
          className="text-4xl md:text-7xl mb-2"
        >
          How to use this
        </h2>
      </div>

      <div
        ref={wrapperRef}
        className="w-[90%] md:w-[75%] flex flex-col md:flex-row gap-5"
      >
        <div ref={addToRefs} className="w-full md:w-1/3">
          <h2 className="text-2xl mb-2">Send hi to Maya</h2>
          <p className="text-md text-[#6b5d4f] mb-2 w-[90%]">
            Send "hi" — Maya will start responding to you in less than 100
            milliseconds.
          </p>

          <div className="bg-white p-3 rounded-2xl w-full">
            <div className="bg-[#F4EEE4] w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-2xl"
                src="/Images/hi2.png"
                alt="send hi"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div ref={addToRefs} className="w-full md:w-1/3">
          <h3 className="text-2xl mb-2">Chat with Maya</h3>
          <p className="text-md text-[#6b5d4f] mb-2 w-[90%]">
            Maya is not a robot — talk to her like you talk to your best friend.
          </p>

          <div className="bg-white p-3 rounded-2xl w-full">
            <div className="bg-[#F4EEE4] w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden">
              <img
                className="w-full h-full object-contain mt-4"
                src="/Images/response2.png"
                alt="chat"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div ref={addToRefs} className="w-full md:w-1/3">
          <h3 className="text-2xl mb-2">Get Offer</h3>
          <p className="text-md text-[#6b5d4f] mb-2 w-[90%]">
            Maya instantly connects you with HR / founders who are actually
            looking for you.
          </p>

          <div className="bg-white p-3 rounded-2xl w-full">
            <div className="bg-[#F4EEE4] w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden">
              <img
                className="w-full h-full object-contain mt-6"
                src="/Images/offer2.png"
                alt="offer"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
