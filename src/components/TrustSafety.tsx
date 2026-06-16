"use client";

import React, { useState } from "react";
import { ShieldAlert, CheckCircle, Languages, Star, Bell, MapPin, Radio, ShieldCheck, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Attendant {
  name: string;
  role: string;
  experience: string;
  languages: string[];
  rating: number;
  certifications: string[];
  bgGradient: string;
}

const verifiedAttendants: Attendant[] = [
  {
    name: "Sunitha Krishnan",
    role: "Senior Elderly Care Specialist",
    experience: "6+ Years Experience",
    languages: ["Tamil", "English", "Malayalam"],
    rating: 4.9,
    certifications: ["First Aid Certified", "Geriatric Care Dip."],
    bgGradient: "from-pink-100 to-purple-100",
  },
  {
    name: "Meera Nair",
    role: "Professional Driver & Companion",
    experience: "4 Years Experience",
    languages: ["Tamil", "Kannada", "English"],
    rating: 4.8,
    certifications: ["Defensive Driving Cert", "Safe Attendant Certified"],
    bgGradient: "from-blue-100 to-indigo-100",
  },
  {
    name: "Preeti Patil",
    role: "Home Nursing Assistant",
    experience: "5 Years Experience",
    languages: ["Telugu", "Hindi", "English"],
    rating: 5.0,
    certifications: ["General Nursing Certified", "BLS Certified"],
    bgGradient: "from-purple-100 to-purple-200",
  },
];

export default function TrustSafety() {
  const [sosActive, setSosActive] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const triggerSOS = () => {
    setSosActive(true);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <section id="safety" className="py-20 bg-gray-50/50 overflow-hidden relative">
      
      {/* SOS Alert Banner */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-2xl flex items-center space-x-3 border border-red-500 animate-pulse"
          >
            <Radio className="h-5 w-5 animate-ping" />
            <span>SOS Alert Active: Contacting Nearest Police & Family notified!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Experience Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-extrabold text-amber-600 uppercase tracking-widest shadow-sm mb-4">
            <Award className="h-4 w-4 text-amber-500 animate-pulse" />
            <span>8+ Years of Trusted Service</span>
          </div>

          <h2 className="text-base text-primary font-bold tracking-wide uppercase">Safety & Vetting</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Standard is Uncompromising Trust
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Every WithYours attendant passes multi-step background checks, certification programs, and safety training.
          </p>

          {/* Languages Spoken Badges */}
          <div className="mt-6 flex flex-col items-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">Languages Spoken</span>
            <div className="flex items-center space-x-3">
              {["English", "Hindi", "Tamil"].map((lang, idx) => (
                <React.Fragment key={lang}>
                  <span className="px-3.5 py-1 bg-white border border-purple-100/60 rounded-full text-xs font-extrabold text-purple-700 shadow-sm">
                    {lang}
                  </span>
                  {idx < 2 && <span className="text-gray-300 font-light">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Vetted Profiles Grid */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Meet Our Attendants</h3>
            
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {verifiedAttendants.map((person, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Avatar Illustration */}
                      <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${person.bgGradient} flex items-center justify-center font-bold text-primary text-xl`}>
                        {person.name[0]}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-gray-900">{person.name}</h4>
                        <p className="text-xs text-primary font-semibold">{person.role}</p>
                      </div>
                    </div>
                    
                    <span className="flex items-center space-x-1 text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span>{person.rating}</span>
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-gray-500 font-semibold">{person.experience}</p>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {person.certifications.map((c, i) => (
                        <span key={i} className="text-[10px] bg-purple-50 text-primary px-2 py-0.5 rounded font-bold">
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                      <Languages className="h-3.5 w-3.5 text-gray-400" />
                      <span>{person.languages.join(", ")}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-[11px] text-emerald-600 font-bold mt-2">
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>Police Verification Cleared</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SOS Panel */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
              
              {/* Decorative pulse ring */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl" />

              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <ShieldAlert className="h-6 w-6 text-red-500" />
                  <span className="font-bold text-sm text-red-400 tracking-wider uppercase">Active Security Layer</span>
                </div>

                <h3 className="text-2xl font-extrabold mb-4">Integrated Emergency SOS Section</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Every booking comes with real-time live tracking and an instant panic button. Pressing it triggers local field operators, police support, and family contacts.
                </p>

                {/* Features Checklist */}
                <div className="space-y-4 mb-8">
                  {[
                    "Instant Emergency SOS support & response",
                    "Automated SMS/Email notification to family contacts",
                    "24/7 dedicated control room monitoring",
                    "Live service tracking via GPS maps link",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center space-x-3 text-sm text-gray-300">
                      <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SOS Demo button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={triggerSOS}
                  className={`w-full py-4 rounded-full font-bold flex items-center justify-center space-x-2 transition-all ${
                    sosActive
                      ? "bg-red-700 text-white animate-pulse"
                      : "bg-red-600 hover:bg-red-700 text-white hover:scale-105"
                  }`}
                >
                  <Radio className={`h-5 w-5 ${sosActive ? "animate-spin" : ""}`} />
                  <span>{sosActive ? "SOS Broadcast Active" : "Trigger Demo SOS Alert"}</span>
                </button>
                <p className="text-[10px] text-gray-500 text-center mt-3">
                  Click to simulate how WithYours handles emergencies instantly.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
