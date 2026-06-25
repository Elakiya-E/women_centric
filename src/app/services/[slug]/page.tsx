"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Star, MapPin, CheckCircle, ArrowRight, ShieldCheck, 
  HelpCircle, ChevronRight, Sparkles, Building, AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCaseStudiesForService } from "@/lib/caseStudiesData";

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [service, setService] = useState<any>(null);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServiceData = async () => {
      try {
        setLoading(true);
        // Fetch current service
        const res = await fetch(`/api/services/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Service not found");
          } else {
            setError("Failed to load service details");
          }
          return;
        }
        const data = await res.json();
        setService(data);

        // Fetch all services for related services section
        const allRes = await fetch("/api/services");
        if (allRes.ok) {
          const allData = await allRes.json();
          const filtered = allData.filter(
            (s: any) => s.categorySlug === data.categorySlug && s.id !== data.id
          );
          setRelatedServices(filtered.slice(0, 3));
        }
      } catch (err) {
        console.error("Error loading service details:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadServiceData();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar onBookNowClick={() => router.push("/booking")} />
        <div className="pt-24 pb-20 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-slate-600 font-medium">Loading service details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !service) {
    return (
      <>
        <Navbar onBookNowClick={() => router.push("/booking")} />
        <div className="pt-24 pb-20 min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-md w-full text-center">
            <AlertCircle className="h-16 w-16 text-rose-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Oops!</h2>
            <p className="text-slate-600 mb-6">{error || "We couldn't find the service you are looking for."}</p>
            <button
              onClick={() => router.push("/services")}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Back to All Services
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const caseStudies = getCaseStudiesForService(service.slug);

  return (
    <>
      <Navbar onBookNowClick={() => router.push("/booking")} />

      <main className="pt-20 pb-24 bg-gray-50 min-h-screen">
        {/* Banner Section */}
        <div className={`w-full bg-gradient-to-r ${service.gradient} text-white py-16 sm:py-24 relative overflow-hidden`}>
          {/* Background Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              {/* Premium Badge or Standard Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 shadow-sm ${
                  service.isPremium || service.slug === "long-distance-driver"
                    ? "bg-amber-500/80 text-white"
                    : "bg-white/15 text-white"
                }`}>
                  <Sparkles className="h-3 w-3" />
                  {service.isPremium || service.slug === "long-distance-driver" ? "Premium Service" : service.badge || "Verified Service"}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
                {service.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 font-medium mb-6 max-w-2xl leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-4 items-center text-sm font-semibold">
                <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 shadow-sm">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span>{service.rating} Customer Rating</span>
                </div>
                <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 shadow-sm">
                  <span>Starts from </span>
                  <span className="text-amber-300 font-bold text-base">{service.startingPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            
            {/* Left Column (Main Info & Sub-services) */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Core Features & Highlights */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Service Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-800">100% Women-Led</h4>
                      <p className="text-sm text-slate-500 mt-1">Delivered strictly by verified female professionals.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-800">Vetted & Trained</h4>
                      <p className="text-sm text-slate-500 mt-1">Rigorous background verification check and professional training.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-800">Real-time Location Share</h4>
                      <p className="text-sm text-slate-500 mt-1">Live tracking and safety controls integrated with WhatsApp.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-800">Flexible Scheduling</h4>
                      <p className="text-sm text-slate-500 mt-1">Book for a day, week, month or single visits easily.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-services & Pricing List */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Choose Sub-Service Options</h2>
                  <p className="text-sm text-slate-500 mt-1">Select from our specialized packages tailored to your needs.</p>
                </div>

                <div className="grid gap-4">
                  {service.subServices && service.subServices.length > 0 ? (
                    service.subServices.map((sub: any, idx: number) => (
                      <div 
                        key={sub.id || idx}
                        className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-primary/30 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                      >
                        <div className="max-w-xl">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                            {sub.title}
                          </h3>
                          {sub.description && (
                            <p className="text-sm text-slate-500 mt-1 leading-relaxed">{sub.description}</p>
                          )}
                        </div>
                        <div className="flex items-center justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 gap-6">
                          <div className="text-left sm:text-right">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Starting from</p>
                            <p className="text-lg font-black text-primary">{sub.price || service.startingPrice}</p>
                          </div>
                          <button
                            onClick={() => router.push(`/booking?service=${service.id}`)}
                            className="bg-primary/5 hover:bg-primary text-primary hover:text-white font-bold text-sm px-4 py-2.5 rounded-xl border border-primary/20 hover:border-transparent transition-all flex items-center gap-1 shadow-sm shrink-0"
                          >
                            Select
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center text-slate-500 font-medium">
                      No sub-services listed. Please use the Book button to configure requirements.
                    </div>
                  )}
                </div>
              </div>

              {/* Service Cities Availability */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-black text-slate-900">Service Availability Locations</h2>
                </div>
                <p className="text-slate-600 mb-6">
                  We are rapidly expanding our women-led operational hubs. Currently, {service.title} is available in:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {service.availability?.cities && service.availability.cities.length > 0 ? (
                    service.availability.cities.map((city: string) => (
                      <span 
                        key={city} 
                        className="bg-slate-50 hover:bg-primary/5 text-slate-800 hover:text-primary font-bold text-sm px-4 py-2 rounded-xl border border-slate-200 transition-colors shadow-sm"
                      >
                        {city}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 font-medium">All major hubs</span>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column (Booking Widget & Case Studies) */}
            <div className="space-y-10 lg:sticky lg:top-24">
              
              {/* Sticky Book Now Card */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Book This Service</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    Connect with premium verified women partners in minutes. Schedule according to your convenience.
                  </p>
                  
                  <div className="space-y-4 border-t border-b border-slate-100 py-6 mb-6">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-500">Service Provider</span>
                      <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        100% Women
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-500">Standard Price</span>
                      <span className="text-slate-900">{service.startingPrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-500">Service Hours</span>
                      <span className="text-slate-900">Customizable</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/booking?service=${service.id}`)}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Service Now</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              {/* Case Studies Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Real Impact & Stories</h3>
                  <p className="text-sm text-slate-500 mt-1">Read how this service has supported families and businesses.</p>
                </div>

                <div className="space-y-6">
                  {caseStudies.map((study, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-4 py-1 space-y-2">
                      <h4 className="font-extrabold text-slate-800 text-sm">{study.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        <strong className="text-slate-700">Challenge:</strong> {study.challenge}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        <strong className="text-slate-700">Solution:</strong> {study.solution}
                      </p>
                      <p className="text-xs text-emerald-700 leading-relaxed font-semibold bg-emerald-50/50 p-1.5 rounded border border-emerald-100/50">
                        <strong className="text-emerald-800">Outcome:</strong> {study.outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Related Services Section */}
          {relatedServices.length > 0 && (
            <div className="mt-20 border-t border-slate-200 pt-16">
              <h2 className="text-3xl font-black text-slate-900 mb-8 text-center sm:text-left">
                Related Services in this Category
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedServices.map((rel: any) => (
                  <div 
                    key={rel.id} 
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full cursor-pointer group"
                    onClick={() => router.push(`/services/${rel.slug}`)}
                  >
                    <div className={`h-24 bg-gradient-to-r ${rel.gradient} p-4 flex items-end justify-between`}>
                      <span className="text-xs font-bold text-white bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        {rel.badge}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-slate-900 group-hover:text-primary transition-colors mb-1.5">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{rel.description}</p>
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-4">
                        <span className="text-sm font-black text-primary">{rel.startingPrice}</span>
                        <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors flex items-center gap-0.5">
                          View details
                          <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
