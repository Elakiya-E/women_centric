"use client";

import React, { useState, useEffect } from "react";
import { Check, ArrowRight, ArrowLeft, Calendar, Clock, MapPin, Users, HeartHandshake, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingFlowProps {
  selectedServiceId: string;
}

const servicePricing: Record<string, { name: string; basePrice: number; unit: "trip" | "day" }> = {
  airport: { name: "Airport Pickup & Drop", basePrice: 999, unit: "trip" },
  railway: { name: "Railway Pickup & Drop", basePrice: 799, unit: "trip" },
  nursing: { name: "Nursing Care At Home", basePrice: 1499, unit: "day" },
  security: { name: "Women Security Guards", basePrice: 1999, unit: "day" },
  hospital: { name: "Elderly Hospital Attendants", basePrice: 1299, unit: "day" },
  driver: { name: "Women Drivers", basePrice: 1199, unit: "day" },
};

const addOnsList = [
  { id: "sos", name: "Premium SOS Family Alert", price: 199 },
  { id: "luggage", name: "Extra Luggage Assistance", price: 99 },
  { id: "multilingual", name: "Multi-lingual Attendant (English/Hindi/Tamil)", price: 149 },
];

export default function BookingFlow({ selectedServiceId }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [service, setService] = useState("airport");
  const [customReqs, setCustomReqs] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState(1);
  
  // Update local state when selectedServiceId changes from parent
  useEffect(() => {
    if (selectedServiceId && servicePricing[selectedServiceId]) {
      setService(selectedServiceId);
      const bookingSection = document.getElementById("booking");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedServiceId]);

  // Calculations
  const basePriceObj = servicePricing[service] || { name: "Airport Pickup & Drop", basePrice: 999, unit: "trip" };
  const subtotal = (basePriceObj.basePrice * duration) + 
    selectedAddOns.reduce((acc, addonId) => {
      const addon = addOnsList.find(a => a.id === addonId);
      return acc + (addon ? addon.price : 0);
    }, 0);
  
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const discount = subtotal > 1500 ? Math.round(subtotal * 0.1) : 0; // 10% Discount for orders > 1500
  const totalAmount = subtotal + tax - discount;

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(item => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-base text-primary font-bold tracking-wide uppercase">Easy Booking</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Schedule Your Verified Attendant
          </p>
          <p className="mt-3 text-lg text-gray-600">
            Book a trusted female companion or nurse in minutes with our transparent 3-step checkout.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-md mx-auto relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
            <div 
              className="absolute left-0 top-1/2 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
            
            {[1, 2, 3].map((step) => (
              <div key={step} className="z-10 flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                    currentStep > step
                      ? "bg-primary border-primary text-white"
                      : currentStep === step
                      ? "bg-white border-primary text-primary shadow-lg scale-110"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > step ? <Check className="h-5 w-5" /> : step}
                </div>
                <span className={`text-xs mt-2 font-bold ${currentStep === step ? "text-primary" : "text-gray-500"}`}>
                  {step === 1 ? "Requirements" : step === 2 ? "Schedule & Location" : "Review & Checkout"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl min-h-[400px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            
            {/* STEP 1 */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <HeartHandshake className="text-primary h-5 w-5" />
                    Step 1: Choose Service & Details
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Select Service</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      >
                        {Object.entries(servicePricing).map(([key, val]) => (
                          <option key={key} value={key}>
                            {val.name} (Base: {val.basePrice}/{val.unit === "trip" ? "trip" : "day"})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Attended People</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={numPeople}
                        onChange={(e) => setNumPeople(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Custom Safety/Medical Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="E.g., Prefers Tamil speaking attendant, assistance needed with wheelchair, medication list details..."
                    value={customReqs}
                    onChange={(e) => setCustomReqs(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available Add-ons</label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {addOnsList.map((addon) => {
                      const isSelected = selectedAddOns.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddOn(addon.id)}
                          className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                            isSelected
                              ? "bg-purple-50 border-primary shadow-sm"
                              : "bg-white border-gray-200 hover:border-purple-200"
                          }`}
                        >
                          <span className={`text-sm font-bold ${isSelected ? "text-primary" : "text-gray-800"}`}>
                            {addon.name}
                          </span>
                          <span className="text-xs text-gray-500 font-semibold mt-2">
                            +₹{addon.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="text-primary h-5 w-5" />
                  Step 2: Set Schedule & Address
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Service Address / Pickup Location</label>
                    <input
                      type="text"
                      placeholder="Street address, City, Landmark"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Duration ({basePriceObj.unit === "trip" ? "Trips" : "Days"})
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-primary h-5 w-5" />
                  Step 3: Review & Summary
                </h3>

                <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold text-gray-600">Selected Service:</span>
                    <span className="font-bold text-gray-900">{basePriceObj.name}</span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold text-gray-600">Duration:</span>
                    <span className="font-bold text-gray-900">
                      {duration} {basePriceObj.unit === "trip" ? "trip(s)" : "day(s)"}
                    </span>
                  </div>
                  {location && (
                    <div className="flex justify-between border-b pb-3">
                      <span className="font-semibold text-gray-600">Location:</span>
                      <span className="font-bold text-gray-900">{location}</span>
                    </div>
                  )}
                  {date && time && (
                    <div className="flex justify-between border-b pb-3">
                      <span className="font-semibold text-gray-600">Scheduled:</span>
                      <span className="font-bold text-gray-900">{date} at {time}</span>
                    </div>
                  )}

                  {/* Price Calculation Breakdowns */}
                  <div className="pt-2 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>GST (18%):</span>
                      <span>₹{tax}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Discount Applied:</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t">
                      <span>Total Amount:</span>
                      <span className="text-primary text-xl">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200/60">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 font-bold px-6 py-3 rounded-full transition-all ${
                currentStep === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3 rounded-full shadow hover:shadow-lg transition-all hover:scale-105"
              >
                <span>Continue</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => alert("Redirecting to secured sandbox gateway...")}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <span>Proceed to Payment</span>
                <ShieldCheck className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
