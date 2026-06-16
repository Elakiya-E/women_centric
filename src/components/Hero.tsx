"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PhoneCall, CheckCircle2, Star, Users, Shield } from "lucide-react";

interface HeroProps {
  onBookNowClick: () => void;
}

export default function Hero({ onBookNowClick }: HeroProps) {
  /* ── animation helpers ── */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const slideLeft = (delay = 0) => ({
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const float = (delay = 0) => ({
    animate: { y: [0, -10, 0] },
    transition: {
      repeat: Infinity,
      duration: 3.2,
      delay,
      ease: "easeInOut" as const,
    },
  });

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        paddingTop: 120,
        paddingBottom: 100,
        background:
          "linear-gradient(135deg, #ffffff 0%, #f3eeff 40%, #fce4f0 100%)",
      }}
    >
      {/* ── Container ── */}
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 flex flex-col lg:flex-row items-center gap-14 lg:gap-8">
        {/* ═══════════ LEFT ═══════════ */}
        <motion.div className="w-full lg:w-[60%]" {...fadeUp(0)}>
          {/* pill badge */}
          <motion.span
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold mb-7"
            style={{
              background: "rgba(124, 58, 237, 0.08)",
              color: "#7c3aed",
              border: "1px solid rgba(124, 58, 237, 0.15)",
            }}
          >
            🛡️ Trusted by Families Across Bengaluru
          </motion.span>

          {/* headline */}
          <motion.h1
            {...fadeUp(0.18)}
            className="mb-5"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#111827",
              letterSpacing: "-0.02em",
              maxWidth: 640,
            }}
          >
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #7c3aed, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Trusted
            </span>{" "}
            Women Attendant Services for{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #059669, #10b981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Safe
            </span>{" "}
            and{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #2563eb, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Reliable
            </span>{" "}
            Care
          </motion.h1>

          {/* description */}
          <motion.p
            {...fadeUp(0.26)}
            className="mb-8"
            style={{
              fontSize: 18,
              fontWeight: 400,
              lineHeight: 1.7,
              color: "#4b5563",
              maxWidth: 540,
            }}
          >
            Verified women attendants providing professional support for
            elderly care, hospital assistance, travel support, and home
            services with safety and compassion.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp(0.34)}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBookNowClick}
              className="rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-lg cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, #7c3aed, #a855f7)",
                boxShadow: "0 8px 30px rgba(124, 58, 237, 0.35)",
              }}
            >
              Book a Service
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 text-base font-semibold cursor-pointer"
              style={{
                borderColor: "#e5e7eb",
                background: "#ffffff",
                color: "#374151",
              }}
            >
              <PhoneCall className="h-4 w-4" />
              Call Support
            </motion.a>
          </motion.div>

          {/* trust indicators */}
          <motion.ul
            {...fadeUp(0.42)}
            className="flex flex-wrap gap-x-6 gap-y-2"
            style={{ listStyle: "none", padding: 0, margin: 0 }}
          >
            {[
              "Verified Attendants",
              "Police Checked",
              "Transparent Pricing",
              "24/7 Support",
            ].map((text) => (
              <li
                key={text}
                className="flex items-center gap-1.5 text-sm font-medium"
                style={{ color: "#4b5563" }}
              >
                <CheckCircle2
                  className="h-4 w-4"
                  style={{ color: "#059669" }}
                />
                {text}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ═══════════ RIGHT ═══════════ */}
        <motion.div
          className="w-full lg:w-[40%] relative flex items-center justify-center"
          style={{ minHeight: 420 }}
          {...slideLeft(0.2)}
        >
          {/* illustration */}
          <div
            className="relative z-[1] w-full"
            style={{ maxWidth: 440 }}
          >
            <Image
              src="/hero_illustration.png"
              alt="Woman attendant helping an elderly person"
              width={520}
              height={520}
              priority
              className="w-full h-auto drop-shadow-xl"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Floating card 1 — top-left */}
          <motion.div
            className="absolute z-[2] flex items-center gap-2.5 rounded-2xl px-4 py-3"
            style={{
              top: "5%",
              left: "-4%",
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
            {...float(0)}
          >
            <span
              className="flex items-center justify-center rounded-lg p-1.5"
              style={{ background: "rgba(250, 204, 21, 0.15)" }}
            >
              <Star className="h-4 w-4" style={{ color: "#f59e0b" }} />
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: "#1f2937" }}
            >
              4.9 Customer Rating
            </span>
          </motion.div>

          {/* Floating card 2 — right */}
          <motion.div
            className="absolute z-[2] flex items-center gap-2.5 rounded-2xl px-4 py-3"
            style={{
              top: "40%",
              right: "-8%",
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
            {...float(0.6)}
          >
            <span
              className="flex items-center justify-center rounded-lg p-1.5"
              style={{ background: "rgba(124, 58, 237, 0.12)" }}
            >
              <Users
                className="h-4 w-4"
                style={{ color: "#7c3aed" }}
              />
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: "#1f2937" }}
            >
              500+ Verified Attendants
            </span>
          </motion.div>

          {/* Floating card 3 — bottom-left */}
          <motion.div
            className="absolute z-[2] flex items-center gap-2.5 rounded-2xl px-4 py-3"
            style={{
              bottom: "2%",
              left: "0%",
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
            {...float(1.2)}
          >
            <span
              className="flex items-center justify-center rounded-lg p-1.5"
              style={{ background: "rgba(5, 150, 105, 0.12)" }}
            >
              <Shield
                className="h-4 w-4"
                style={{ color: "#059669" }}
              />
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: "#1f2937" }}
            >
              24/7 Emergency Support
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
