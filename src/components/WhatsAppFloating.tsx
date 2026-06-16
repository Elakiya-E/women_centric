"use client";

import React, { useState } from "react";
import { MessageSquare, Calendar, HelpCircle, AlertOctagon, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      label: "Book A Service Now",
      desc: "Fast-track schedule coordinates",
      icon: Calendar,
      url: "https://wa.me/919876543210?text=Hi!%20I'd%20like%20to%20book%20a%20women%20attendant%20service.",
      color: "text-purple-600 bg-purple-50 hover:bg-purple-100",
    },
    {
      label: "Ask Any Question",
      desc: "Get instant vetting & support answers",
      icon: HelpCircle,
      url: "https://wa.me/919876543210?text=Hi!%20I%20have%20questions%20regarding%20your%20verification%20process.",
      color: "text-blue-600 bg-blue-50 hover:bg-blue-100",
    },
    {
      label: "24/7 Emergency Support",
      desc: "Instant live operations helpline",
      icon: AlertOctagon,
      url: "https://wa.me/919876543210?text=ALERT:%20I%20need%20immediate%20emergency%20operator%20assistance.",
      color: "text-red-600 bg-red-50 hover:bg-red-100",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Pop-up Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="bg-white border border-purple-100 shadow-2xl rounded-3xl p-5 mb-4 w-72 sm:w-80"
          >
            <div className="flex justify-between items-center mb-4 border-b pb-3 border-purple-50">
              <div>
                <h4 className="font-extrabold text-gray-900 text-sm sm:text-base flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  WithYours Chat
                </h4>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Typically replies instantly
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Actions List */}
            <div className="space-y-2">
              {actions.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <a
                    key={idx}
                    href={act.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 p-3 rounded-2xl transition-all border border-transparent hover:border-purple-100 ${act.color}`}
                  >
                    <span className="p-2 rounded-xl bg-white shadow-sm shrink-0">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-extrabold text-xs text-gray-800">{act.label}</p>
                      <p className="text-[10px] text-gray-500 font-semibold">{act.desc}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center justify-center border-4 border-white"
        aria-label="Open support chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : (
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 2.022 14.114.999 11.996.999c-5.443 0-9.87 4.372-9.874 9.802-.001 1.73.468 3.424 1.36 4.938L2.484 21.57l6.163-1.616z" />
          </svg>
        )}
      </button>
    </div>
  );
}
