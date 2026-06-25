"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Plane, Train, HeartPulse, ShieldAlert, Award, Car, 
  Scissors, Baby, Wrench, Settings, Building, Gem, 
  Shield, Luggage, Mic, Home, Star, ArrowRight, Search, SlidersHorizontal 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ALL_CITIES } from "@/lib/serviceData";

// Icon mapper
const getIcon = (iconName: string) => {
  const map: Record<string, any> = {
    Plane, Train, HeartPulse, ShieldAlert, Award, Car,
    Scissors, Baby, Wrench, Settings, Building, Gem,
    Shield, Luggage, Mic, Home
  };
  return map[iconName] || Star;
};

// Categorization Logic
const CATEGORIES = [
  { id: "all", name: "All Services", icon: Star },
  { id: "home-care", name: "Home & Personal Care", icon: Home },
  { id: "repair", name: "Repair & Utility", icon: Wrench },
  { id: "security", name: "Safety & Security", icon: Shield },
  { id: "travel", name: "Travel & Mobility", icon: Car },
  { id: "lifestyle", name: "Event & Lifestyle", icon: Mic },
];

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) {
          console.error("Failed to fetch services, status", res.status);
          setServices([]);
          return;
        }
        const data = await res.json();
        const servicesArray = Array.isArray(data) ? data : (data?.services ?? []);
        setServices(servicesArray);
      } catch (err) {
        console.error("Failed to load services:", err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "Premium": return "bg-amber-100 text-amber-800 border-amber-300 font-extrabold shadow-sm bg-gradient-to-r from-yellow-100 to-amber-200";
      case "Popular": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Trending": return "bg-pink-100 text-pink-700 border-pink-200";
      case "Freshly Added": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredServices = (Array.isArray(services) ? services : []).filter(service => {
    const matchesCategory = activeCategory === "all" || service.categorySlug === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar onBookNowClick={() => router.push("/booking")} />
      
      <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Service Portfolio</span>
            </h1>
            <p className="text-lg text-slate-600">
              Women-Led Attendant Solutions for Homes, Healthcare, Travel, Security and Lifestyle Support.
            </p>
          </div>

          {/* Search & Filters Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="Search services..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            
            <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-medium text-slate-700 cursor-pointer"
                >
                  <option>All Cities</option>
                  {ALL_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                    activeCategory === cat.id 
                      ? "bg-primary text-white scale-105 shadow-primary/30" 
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Services Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800">No services found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredServices.map((service) => {
                  const IconComponent = getIcon(service.iconName);
                  const isAvailable = selectedCity === "All Cities" || 
                    (service.availability?.cities && service.availability.cities.includes(selectedCity));
                  
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      key={service.id}
                      className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col h-full group ${
                        service.isPremium || service.slug === "long-distance-driver"
                          ? "border-amber-400 shadow-md ring-1 ring-amber-400/20"
                          : "border-slate-100 shadow-sm"
                      } hover:shadow-xl hover:-translate-y-1`}
                    >
                      {/* Visual Header / Banner */}
                      <div className={`h-40 bg-gradient-to-r ${service.gradient} p-6 relative flex items-end justify-between`}>
                        <div className="absolute top-4 left-4">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${
                            service.isPremium || service.slug === "long-distance-driver"
                              ? getBadgeStyle("Premium")
                              : getBadgeStyle(service.badge)
                          }`}>
                            {service.isPremium || service.slug === "long-distance-driver" ? "Premium" : service.badge}
                          </span>
                        </div>
                        
                        {/* Service Icon Container */}
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 group-hover:scale-110 transition-transform">
                          <IconComponent className="h-8 w-8 text-white drop-shadow-md" />
                        </div>

                        <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-md px-2.5 py-1.5 rounded-full text-white text-xs font-bold border border-white/10 shadow-sm">
                          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          <span>{service.rating}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">{service.title}</h3>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">{service.description}</p>
                        </div>

                        <div className="border-t border-slate-100 pt-5 mt-auto">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Starting Price</p>
                              <p className="text-xl font-black text-primary">{service.startingPrice}</p>
                            </div>
                            
                            {isAvailable ? (
                              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                                ✓ Available
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
                                ✕ Unavailable in your city
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button 
                              onClick={() => router.push(`/services/${service.slug}`)}
                              className="flex-1 bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors text-sm"
                            >
                              Learn More
                            </button>
                            <button
                              onClick={() => router.push(`/booking?service=${service.id}`)}
                              className="flex-1 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-1"
                            >
                              <span>Book</span>
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </main>
      
      <Footer />
    </>
  );
}
