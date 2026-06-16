"use client";

import React from "react";
import { Phone, ShieldAlert, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <a href="#home" className="inline-block">
              <span className="font-extrabold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                WithYours
              </span>
            </a>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm italic">
              "Safe, Reliable and Trustworthy Women Attendant Services with Compassionate Support."
            </p>
            <p className="text-gray-450 text-xs leading-relaxed max-w-sm">
              Providing professional care built on our core values: **Safety, Reliability, Trust, and Supportiveness**. Every companion is vetted and police-verified, available 24/7.
            </p>
            
            {/* Emergency Hotline */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 max-w-xs">
              <div className="flex items-center space-x-2 text-red-400 font-bold mb-1">
                <ShieldAlert className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Emergency Operations</span>
              </div>
              <a href="tel:+919876543210" className="flex items-center space-x-2 text-white font-extrabold text-lg">
                <Phone className="h-5 w-5 text-red-500 shrink-0" />
                <span>+91 98765 43210</span>
              </a>
            </div>
          </div>

          {/* Columns */}
          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400 font-semibold">
              <li><a href="#home" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#home" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#home" className="hover:text-white transition-colors">Press Kit</a></li>
              <li><a href="#home" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400 font-semibold">
              <li><a href="#services" className="hover:text-white transition-colors">Airport Attendant</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Railway Attendant</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Elder Care Nursing</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Women Drivers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">Safety</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400 font-semibold">
              <li><a href="#safety" className="hover:text-white transition-colors">Vetting Standards</a></li>
              <li><a href="#safety" className="hover:text-white transition-colors">SOS Protocols</a></li>
              <li><a href="#safety" className="hover:text-white transition-colors">Insurance Policy</a></li>
              <li><a href="#safety" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400 font-semibold">
              <li><a href="#home" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#home" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#home" className="hover:text-white transition-colors">Refund Guidelines</a></li>
              <li><a href="#home" className="hover:text-white transition-colors">Safety Guidelines</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-semibold gap-4">
          <div className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} WithYours Attendant Services. Made with</span>
            <Heart className="h-3.5 w-3.5 text-pink-500 fill-pink-500" />
            <span>in India.</span>
          </div>

          {/* Socials - SVGs instead of Lucide React brand icons */}
          <div className="flex space-x-4">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            {/* Linkedin */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
