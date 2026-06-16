"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, PhoneCall, ShieldCheck, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onBookNowClick: () => void;
}

export default function Navbar({ onBookNowClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Consultation Form States
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    date: "",
    time: "",
    requirement: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Booking", href: "#booking" },
    { name: "Safety", href: "#safety" },
    { name: "Knowledge Hub", href: "#knowledge" },
    { name: "Cities", href: "#cities" },
    { name: "Contact", href: "#footer" },
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,15}$/.test(formData.phone.trim())) {
      errors.phone = "Enter a valid phone number";
    }
    if (!formData.city) errors.city = "Please select a city";
    if (!formData.date) errors.date = "Please select a preferred date";
    if (!formData.time) errors.time = "Please select a preferred time";
    if (!formData.requirement.trim()) errors.requirement = "Requirement is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      city: "",
      date: "",
      time: "",
      requirement: "",
    });
    setFormErrors({});
    setIsSubmitted(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-2 border-b border-purple-100"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-2 flex-shrink-0">
              <span className="bg-gradient-to-r from-primary to-secondary text-white p-1.5 rounded-xl">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                WithYours
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary font-medium text-sm transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 border border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-3.5 py-1.5 rounded-full font-semibold text-xs transition-all hover:scale-105"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.438 2.5 1.177 3.464L6.96 18l2.67-.783a5.722 5.722 0 0 0 2.4.527h.002c3.181 0 5.767-2.586 5.768-5.767a5.758 5.758 0 0 0-5.769-5.805zm3.621 8.232c-.15.421-.767.767-1.127.81-.36.043-.82.072-2.384-.572-1.999-.823-3.276-2.854-3.376-2.987-.1-.133-.795-.923-.795-1.762 0-.839.44-1.25.59-1.416.15-.166.33-.208.44-.208.11 0 .22.001.32.007.1.006.24-.038.37.276.13.314.44 1.071.48 1.153.04.082.07.18.01.293-.05.11-.08.196-.16.293-.08.096-.17.215-.24.293-.08.082-.17.171-.07.337a7.842 7.842 0 0 0 1.43 1.777 6.486 6.486 0 0 0 2.07 1.28c.18.09.29.077.4-.049.11-.125.48-.558.61-.749.13-.191.26-.161.44-.097.18.064 1.15.542 1.35.642.2.1.33.15.38.237.05.087.05.508-.1.929z" />
                </svg>
                <span>WhatsApp</span>
              </a>
              
              {/* Prominent Consultation CTA */}
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="flex items-center space-x-1.5 bg-primary text-white hover:bg-primary/95 px-4 py-2 rounded-full font-semibold text-xs shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Schedule Free Consultation</span>
              </button>

              <button
                onClick={onBookNowClick}
                className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full font-semibold text-xs shadow-sm hover:shadow-md transition-all hover:scale-105"
              >
                Book Now
              </button>
            </div>

            {/* Mobile hamburger menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 focus:outline-none p-2 rounded-lg hover:bg-gray-100"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-gray-100"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 hover:bg-purple-50 hover:text-primary transition-all"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 flex flex-col space-y-3 px-3">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 border border-emerald-500 text-emerald-600 py-2.5 rounded-full font-semibold text-sm"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.438 2.5 1.177 3.464L6.96 18l2.67-.783a5.722 5.722 0 0 0 2.4.527h.002c3.181 0 5.767-2.586 5.768-5.767a5.758 5.758 0 0 0-5.769-5.805zm3.621 8.232c-.15.421-.767.767-1.127.81-.36.043-.82.072-2.384-.572-1.999-.823-3.276-2.854-3.376-2.987-.1-.133-.795-.923-.795-1.762 0-.839.44-1.25.59-1.416.15-.166.33-.208.44-.208.11 0 .22.001.32.007.1.006.24-.038.37.276.13.314.44 1.071.48 1.153.04.082.07.18.01.293-.05.11-.08.196-.16.293-.08.096-.17.215-.24.293-.08.082-.17.171-.07.337a7.842 7.842 0 0 0 1.43 1.777 6.486 6.486 0 0 0 2.07 1.28c.18.09.29.077.4-.049.11-.125.48-.558.61-.749.13-.191.26-.161.44-.097.18.064 1.15.542 1.35.642.2.1.33.15.38.237.05.087.05.508-.1.929z" />
                    </svg>
                    <span>WhatsApp Chat</span>
                  </a>

                  {/* Mobile Consultation CTA */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      resetForm();
                      setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center space-x-2 bg-primary text-white py-2.5 rounded-full font-semibold shadow-sm text-sm"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Schedule Free Consultation</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onBookNowClick();
                    }}
                    className="bg-gradient-to-r from-primary to-secondary text-white py-2.5 rounded-full font-bold text-center shadow-md text-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Consultation Request Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-purple-50 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsSubmitted(false);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-all"
              >
                <X className="h-5 w-5" />
              </button>

              {!isSubmitted ? (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="p-2.5 bg-purple-100 text-primary rounded-xl">
                      <Calendar className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        Schedule Free Consultation
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500">
                        Speak with our experts to find the right attendant services.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border ${
                          formErrors.name ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-primary focus:ring-purple-200"
                        } focus:outline-none focus:ring-4 transition-all text-gray-900 bg-gray-50/50`}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border ${
                          formErrors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-primary focus:ring-purple-200"
                        } focus:outline-none focus:ring-4 transition-all text-gray-900 bg-gray-50/50`}
                      />
                      {formErrors.phone && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        City
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border ${
                          formErrors.city ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-primary focus:ring-purple-200"
                        } focus:outline-none focus:ring-4 transition-all text-gray-900 bg-gray-50/50`}
                      >
                        <option value="">Select your city</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Coimbatore">Coimbatore</option>
                      </select>
                      {formErrors.city && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.city}</p>
                      )}
                    </div>

                    {/* Date & Time Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className={`w-full px-4 py-2.5 rounded-xl border ${
                            formErrors.date ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-primary focus:ring-purple-200"
                          } focus:outline-none focus:ring-4 transition-all text-gray-900 bg-gray-50/50`}
                        />
                        {formErrors.date && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.date}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                          Preferred Time
                        </label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className={`w-full px-4 py-2.5 rounded-xl border ${
                            formErrors.time ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-primary focus:ring-purple-200"
                          } focus:outline-none focus:ring-4 transition-all text-gray-900 bg-gray-50/50`}
                        />
                        {formErrors.time && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.time}</p>
                        )}
                      </div>
                    </div>

                    {/* Requirement */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Requirement
                      </label>
                      <textarea
                        rows={3}
                        placeholder="What services are you looking for? (e.g. airport assistance, patient companion, elderly care)"
                        value={formData.requirement}
                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border ${
                          formErrors.requirement ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-primary focus:ring-purple-200"
                        } focus:outline-none focus:ring-4 transition-all text-gray-900 bg-gray-50/50 resize-none`}
                      />
                      {formErrors.requirement && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.requirement}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Scheduling...</span>
                        </>
                      ) : (
                        <span>Request Free Consultation</span>
                      )}
                    </button>
                  </form>

                  {/* Trust Footer */}
                  <p className="text-xs text-center text-gray-500 mt-4 leading-relaxed bg-gray-50 py-2.5 px-4 rounded-xl border border-gray-100">
                    Get expert guidance and personalized service recommendations at no cost.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="h-10 w-10 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Consultation Requested!
                  </h3>
                  <p className="text-gray-600 mb-6 px-2 text-sm leading-relaxed">
                    Thank you! We've received your request and our care coordinator will reach out to you shortly to confirm your free consultation.
                  </p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsSubmitted(false);
                    }}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-full font-semibold shadow transition-all hover:scale-105 cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

