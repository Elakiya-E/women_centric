"use client";

import React, { useState, useEffect } from "react";
import { Percent, Clock, Sparkles, ShoppingBag } from "lucide-react";

interface Offer {
  title: string;
  desc: string;
  discount: string;
  code: string;
  bgGradient: string;
}

const offers: Offer[] = [
  {
    title: "Care & Comfort Bundle",
    desc: "Combine Nursing Care + Elderly Hospital Attendant for comprehensive protection.",
    discount: "15% OFF",
    code: "CARECOMBO15",
    bgGradient: "from-purple-600 to-indigo-700",
  },
  {
    title: "Safe Traveler Combo",
    desc: "Book Airport Pickup + Dedicated Driver for seamless transit around the city.",
    discount: "10% OFF",
    code: "TRAVELSAFE10",
    bgGradient: "from-pink-600 to-rose-700",
  },
];

export default function Offers() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 10,
  });

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to keep demo going
          return { hours: 3, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-primary font-bold tracking-wide uppercase">Limited Promotions</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Exclusive Bundle Offers
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Combine multiple services to maximize your family's protection while unlocking discounted rates.
          </p>
        </div>

        {/* Promo Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 text-white relative overflow-hidden bg-gradient-to-br ${offer.bgGradient} shadow-xl flex flex-col justify-between min-h-[260px]`}
            >
              {/* Decorative circle backdrop */}
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-xl" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="p-3 bg-white/20 backdrop-blur rounded-2xl border border-white/20">
                  <Percent className="h-6 w-6 text-white" />
                </span>
                <span className="bg-amber-400 text-slate-900 text-xs font-black uppercase px-3 py-1 rounded-full tracking-widest shadow-sm">
                  {offer.discount}
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <h3 className="text-2xl font-extrabold mb-2">{offer.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">{offer.desc}</p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-white/60 font-semibold uppercase">Coupon Code</p>
                  <p className="font-mono font-bold tracking-wider">{offer.code}</p>
                </div>
                <button
                  onClick={() => alert(`Applied code: ${offer.code}`)}
                  className="bg-white text-primary text-xs font-bold px-4 py-2.5 rounded-full hover:bg-opacity-95 transition-all hover:scale-105"
                >
                  Apply Promo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown & Personalized Banner Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 sm:p-10 border border-purple-100/60 shadow-md grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Personalized Recommendation Banner */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2 text-primary">
              <Sparkles className="h-5 w-5 animate-bounce" />
              <span className="text-xs font-bold uppercase tracking-wider">Personalized For You</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              Need custom schedule planning or emergency standby?
            </h3>
            
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
              Based on your search, we recommend configuring our **Emergency Standby Attendant** package. Talk to our coordinator to design a custom schedule.
            </p>

            <button
              onClick={() => alert("Connecting with custom coordinator...")}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-full shadow"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Get Custom Recommendation</span>
            </button>
          </div>

          {/* Countdown Clock */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white p-6 rounded-2xl border border-purple-100 shadow-inner">
            <div className="flex items-center space-x-2 text-gray-500 mb-4">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Offer Closes Soon In:</span>
            </div>

            <div className="flex space-x-4">
              {[
                { label: "HRS", val: timeLeft.hours },
                { label: "MINS", val: timeLeft.minutes },
                { label: "SECS", val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center font-extrabold text-xl shadow-md">
                    {formatNumber(item.val)}
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold mt-2">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
