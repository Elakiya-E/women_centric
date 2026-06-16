"use client";

import React from "react";
import { Shield, Handshake, Heart, Star, Award } from "lucide-react";
import { motion } from "framer-motion";

interface KeywordCard {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  colorClass: string;
  bgGlow: string;
  fillRightIcon?: boolean;
}

const keywords: KeywordCard[] = [
  {
    icon: Shield,
    title: "Safety",
    description: "Every companion undergoes extensive background checks, police verification, and is backed by our real-time GPS tracking and instant 24/7 SOS alert system.",
    colorClass: "text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/30",
    bgGlow: "group-hover:bg-purple-500/10",
    fillRightIcon: true,
  },
  {
    icon: Handshake,
    title: "Reliability",
    description: "Count on us for absolute punctuality. We maintain strict backup dispatch networks so that your family's plans and assistance schedules are never interrupted.",
    colorClass: "text-pink-600 dark:text-pink-400 border-pink-100 dark:border-pink-900/30",
    bgGlow: "group-hover:bg-pink-500/10",
    fillRightIcon: false,
  },
  {
    icon: Heart,
    title: "Supportiveness",
    description: "Compassion is at our core. Our professional attendants provide gentle care, bedside warmth, active communication, and patient understanding to those in need.",
    colorClass: "text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30",
    bgGlow: "group-hover:bg-rose-500/10",
    fillRightIcon: true,
  },
  {
    icon: Star,
    title: "Trust",
    description: "Backed by 8+ Years of Trusted Service and over 1,000 satisfied families. We operate with complete pricing transparency and a dedication to absolute integrity.",
    colorClass: "text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30",
    bgGlow: "group-hover:bg-amber-500/10",
    fillRightIcon: true,
  },
];

export default function BrandKeywords() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Experience Header Banner */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/40 px-4 py-1.5 rounded-full text-xs font-extrabold text-primary uppercase tracking-widest shadow-sm">
            <Award className="h-4 w-4 text-purple-600 animate-pulse" />
            <span>8+ Years of Trusted Service</span>
          </span>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Why Families Trust WithYours
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Our company is built on absolute dedication to family reassurance. We set the highest standards for safety, reliability, and compassionate care.
          </p>
        </div>

        {/* Keywords Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keywords.map((kw, index) => {
            const Icon = kw.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className={`group bg-white rounded-3xl p-6 border ${kw.colorClass} shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
              >
                {/* Micro-glow backdrop hover effect */}
                <div className={`absolute inset-0 bg-transparent transition-all duration-300 -z-10 ${kw.bgGlow}`} />

                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-3 bg-slate-50 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      <Icon className="h-6 w-6 text-current" />
                    </span>
                    <Icon className={`h-6 w-6 text-current/80 transition-transform duration-300 group-hover:scale-110 ${kw.fillRightIcon ? 'fill-current' : ''}`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2.5">
                    {kw.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {kw.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
