"use client";

import React from "react";
import { Check, Info, ShieldCheck, Tag, HelpCircle, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

interface PricingPlan {
  title: string;
  subtitle: string;
  price: string;
  unit: string;
  recommended: boolean;
  features: string[];
  serviceId: string;
  badgeText?: string;
  bgGradient: string;
}

const pricingPlans: PricingPlan[] = [
  {
    title: "Transit Companion",
    subtitle: "Safe assisted travel for airport, railway, and city transits",
    price: "₹799",
    unit: "trip",
    recommended: false,
    serviceId: "railway",
    features: [
      "Verified female attendant meeting at gate/platform",
      "Real-time GPS travel tracking link",
      "Help with basic ticketing & luggage transfers",
      "Full background & police verified companion",
      "No hidden booking fees"
    ],
    bgGradient: "from-blue-500/10 to-indigo-500/10 border-blue-100",
  },
  {
    title: "Daily Attendant & Care",
    subtitle: "Empathetic home care, hospital bedside assistance & nursing support",
    price: "₹1,199",
    unit: "day",
    recommended: true,
    serviceId: "nursing",
    badgeText: "Most Popular",
    features: [
      "Qualified bedside caregiver / medical assistant",
      "Medicine schedules & wellness updates",
      "Choice of English, Hindi, or Tamil speakers",
      "Geriatric care or rehabilitation training",
      "Flexible schedule adjustments & backups"
    ],
    bgGradient: "from-purple-500/10 to-pink-500/10 border-purple-200",
  },
  {
    title: "Custom Security & Driver",
    subtitle: "Dedicated security guards, private drivers, and custom schedules",
    price: "₹1,999",
    unit: "day",
    recommended: false,
    serviceId: "security",
    features: [
      "Fully trained defensive security or expert driver",
      "Flexible hourly shifts & standby options",
      "Corporate-grade vetting standards",
      "Direct coordinator hotline (24/7)",
      "Multi-person or group care configurations"
    ],
    bgGradient: "from-amber-500/10 to-orange-500/10 border-amber-100",
  },
];

interface PricingProps {
  onSelectService: (serviceId: string) => void;
}

export default function Pricing({ onSelectService }: PricingProps) {
  const handleSelectPlan = (serviceId: string) => {
    onSelectService(serviceId);
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50/30 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Trust Badges */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-8">
          {[
            { text: "Transparent Pricing", color: "bg-purple-50 text-purple-700 border-purple-100" },
            { text: "Affordable Plans", color: "bg-pink-50 text-pink-700 border-pink-100" },
            { text: "Custom Packages", color: "bg-amber-50 text-amber-700 border-amber-100" }
          ].map((badge, idx) => (
            <span
              key={idx}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border tracking-wide shadow-sm ${badge.color}`}
            >
              ✓ {badge.text}
            </span>
          ))}
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-base text-primary font-bold tracking-wide uppercase">Transparent Pricing</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Clear, Honest Rates with No Hidden Charges
          </p>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Choose a plan that fits your family's needs perfectly. We believe in absolute transparency—you pay exactly what is quoted, inclusive of safety layers and coordinator support.
          </p>
        </div>

        {/* Pricing Cards Comparison Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-start mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className={`bg-white rounded-[32px] p-8 border shadow-sm transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full ${
                plan.recommended 
                  ? "border-primary ring-2 ring-primary/20 shadow-xl scale-102 z-10 md:-translate-y-2" 
                  : "border-gray-200"
              }`}
            >
              {/* Recommended Ribbon */}
              {plan.recommended && plan.badgeText && (
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    {plan.badgeText}
                  </span>
                </div>
              )}

              <div>
                {/* Title & Subtitle */}
                <h3 className="text-2xl font-black text-gray-900 mb-2">{plan.title}</h3>
                <p className="text-xs text-gray-500 font-semibold mb-6 min-h-[32px]">{plan.subtitle}</p>

                {/* Price Display */}
                <div className={`p-5 rounded-2xl bg-gradient-to-br ${plan.bgGradient} border mb-8 flex items-baseline justify-center`}>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-1">Starting From</span>
                  <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-sm font-semibold text-gray-500 ml-1">/{plan.unit}</span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-sm text-gray-600 leading-relaxed">
                      <span className="p-0.5 bg-emerald-100 text-emerald-600 rounded-full mr-3 mt-0.5 shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA */}
              <button
                onClick={() => handleSelectPlan(plan.serviceId)}
                className={`w-full py-4 rounded-full font-extrabold text-sm transition-all hover:scale-103 ${
                  plan.recommended
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg glow-primary"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                Book This Service
              </button>
            </motion.div>
          ))}
        </div>

        {/* No Hidden Charges Banner */}
        <div className="bg-slate-900 text-white rounded-[32px] p-8 border border-white/5 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-4">
            <span className="p-3 bg-white/10 rounded-2xl text-purple-400">
              <ShieldCheck className="h-8 w-8" />
            </span>
            <div>
              <h4 className="text-xl font-bold">Guaranteed No Hidden Charges</h4>
              <p className="text-sm text-gray-400 mt-1 max-w-xl">
                The price you customize and see in our checklist checkout is exactly what you pay. No service charge surprises, no dispatcher commissions, and no emergency response premiums.
              </p>
            </div>
          </div>
          <div className="flex space-x-3 shrink-0">
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <Info className="h-4 w-4" />
              <span>18% GST Invoicing Included</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <Tag className="h-4 w-4" />
              <span>Full Refund Protection</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
