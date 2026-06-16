"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  review: string;
  initials: string;
  bgClass: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ramanathan Swamy",
    location: "Bengaluru",
    rating: 5,
    review: "The nursing companion from WithYours was incredibly dedicated when my mother was hospitalized. Absolute professionalism, constant safety updates, and genuine empathy. We couldn't have managed without them.",
    initials: "RS",
    bgClass: "bg-purple-100 text-purple-700",
  },
  {
    name: "Divya Balakrishnan",
    location: "Chennai",
    rating: 5,
    review: "I booked an airport pickup escort for my daughter flying back late at night. The safety notification panel worked flawlessly, and I tracked their path live. Outstanding service, true peace of mind.",
    initials: "DB",
    bgClass: "bg-pink-100 text-pink-700",
  },
  {
    name: "Karthik Raja",
    location: "Coimbatore",
    rating: 5,
    review: "Highly skilled women drivers who know the roads perfectly. Very safe driving, clean documentation, and friendly manner. Our go-to choice for outstation travels.",
    initials: "KR",
    bgClass: "bg-blue-100 text-blue-700",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[current];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-base text-primary font-bold tracking-wide uppercase">Client Reviews</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Trusted by 1000+ Families
          </p>
        </div>

        {/* Big Quote Icon */}
        <div className="absolute top-16 left-6 text-purple-100 -z-10 select-none">
          <Quote className="h-40 w-40 transform -rotate-12" />
        </div>

        {/* Carousel Slider Card */}
        <div className="relative bg-gray-50 border border-purple-50 rounded-3xl p-8 sm:p-12 shadow-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Star Rating */}
              <div className="flex space-x-1 justify-center sm:justify-start">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-lg sm:text-xl text-gray-800 font-medium italic leading-relaxed text-center sm:text-left">
                "{currentTestimonial.review}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200/60 gap-4">
                <div className="flex items-center space-x-3 text-left">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${currentTestimonial.bgClass}`}>
                    {currentTestimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900">{currentTestimonial.name}</h4>
                    <p className="text-xs text-gray-500 font-semibold">{currentTestimonial.location}</p>
                  </div>
                </div>

                {/* Navigation Controls inside slider */}
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-white border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-all text-gray-600 hover:text-primary"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-white border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-all text-gray-600 hover:text-primary"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                current === idx ? "bg-primary w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
