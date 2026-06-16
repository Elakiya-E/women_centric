"use client";

import React from "react";
import { MapPin, Navigation, Compass, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface City {
  name: string;
  attendants: string;
  families: string;
  response: string;
  accentClass: string;
  illustrationBg: string;
}

const citiesList: City[] = [
  {
    name: "Bengaluru",
    attendants: "220+ Attendants",
    families: "450+ Families Helped",
    response: "<15 min Emergency Dispatch",
    accentClass: "text-purple-600 border-purple-100 bg-purple-50/40",
    illustrationBg: "from-purple-500 to-indigo-600",
  },
  {
    name: "Chennai",
    attendants: "150+ Attendants",
    families: "300+ Families Helped",
    response: "<18 min Emergency Dispatch",
    accentClass: "text-pink-600 border-pink-100 bg-pink-50/40",
    illustrationBg: "from-pink-500 to-rose-600",
  },
  {
    name: "Hyderabad",
    attendants: "100+ Attendants",
    families: "200+ Families Helped",
    response: "<20 min Emergency Dispatch",
    accentClass: "text-blue-600 border-blue-100 bg-blue-50/40",
    illustrationBg: "from-blue-500 to-sky-600",
  },
  {
    name: "Coimbatore",
    attendants: "60+ Attendants",
    families: "100+ Families Helped",
    response: "<15 min Emergency Dispatch",
    accentClass: "text-teal-600 border-teal-100 bg-teal-50/40",
    illustrationBg: "from-teal-500 to-emerald-600",
  },
];

export default function Cities() {
  return (
    <section id="cities" className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-primary font-bold tracking-wide uppercase">Operational Hubs</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Cities We Serve
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Active command center coverage across South India's major metropolitan zones.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {citiesList.map((city, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className={`p-6 rounded-3xl border bg-white shadow-sm flex flex-col justify-between h-72 hover:shadow-md transition-all`}
            >
              <div>
                {/* Visual Header / Stylized Landmark Badge */}
                <div className={`h-24 w-full rounded-2xl bg-gradient-to-br ${city.illustrationBg} mb-4 relative flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400 via-red-500 to-purple-600 scale-150" />
                  <Compass className="h-10 w-10 text-white/40 absolute -right-2 -bottom-2" />
                  <MapPin className="h-10 w-10 text-white drop-shadow-md animate-bounce" />
                </div>

                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-extrabold text-gray-900">{city.name}</h3>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t pt-4 border-gray-100 text-xs text-gray-600">
                <p className="font-semibold text-gray-800">{city.attendants}</p>
                <p>{city.families}</p>
                <div className="flex items-center space-x-1.5 text-emerald-600 font-bold">
                  <Shield className="h-3.5 w-3.5" />
                  <span>{city.response}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
