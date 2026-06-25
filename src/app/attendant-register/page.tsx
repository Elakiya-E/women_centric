"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, MapPin, Phone, Mail, Calendar, UploadCloud, 
  CheckCircle, ChevronRight, ChevronLeft, Briefcase, 
  Clock, Shield, Star, Award, Search, AlertCircle, FileText, Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ATTENDANT_SERVICE_OPTIONS,
  getDocRequirements,
  ONBOARDING_STEPS,
  BGV_CHECKLIST_ITEMS,
  ALL_CITIES,
  WORKING_DAYS,
  WORKING_SHIFTS,
  FULL_SERVICE_CATALOG,
} from "@/lib/serviceData";

const languagesList = ["Tamil", "English", "Hindi", "Malayalam", "Telugu", "Kannada"];

export default function AttendantRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [trackingMobile, setTrackingMobile] = useState("");
  const [trackingMode, setTrackingMode] = useState(false);
  const [trackError, setTrackError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    dateOfBirth: "",
    age: "",
    mobileNumber: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "Tamil Nadu",
    pinCode: "",
    emergencyContact: "",

    // Step 2: Professional
    yearsOfExperience: "0",
    languagesKnown: [] as string[],
    certifications: "",
    specialSkills: "",
    previousExperience: "",

    // Step 2: Availability & Working Preferences
    workingDays: [] as string[],
    availableFrom: "08:00 AM",
    availableTo: "07:00 PM",
    preferredWorkingShift: "Flexible" as string,
    preferredCities: [] as string[],

    // Step 3: Service Selection
    selectedServices: [] as string[],
    selectedSubServices: {} as Record<string, string[]>,
    subServiceExperience: {} as Record<string, string>,

    // Step 4: Base64 Documents Storage
    profilePhotoBase64: "",
    aadhaarBase64: "",
    panCardBase64: "",
    drivingLicenseBase64: "",
    professionalCertBase64: "",
    policeVerifBase64: "",
    nursingDegreeBase64: "",
    nursingRegCertBase64: "",
    physioDegreBase64: "",
    physioRegCertBase64: "",
    experienceProofBase64: "",
    criminalBgCheckBase64: "",

    // BGV Status (from DB)
    bgvAadhaarVerified: false,
    bgvPanVerified: false,
    bgvPoliceVerified: false,
    bgvCriminalBgCheck: false,
    bgvNeighbourhoodEnquiry: false,
    bgvAddressVerified: false,
    bgvEmploymentHistoryChecked: false,
    bgvReferencesVerified: false,
    bgvExperienceVerified: false,
    verificationProgress: "SUBMITTED",
    status: "Pending Approval",
    approvalStatus: "Pending Approval",
    accountStatus: "Inactive",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageToggle = (lang: string) => {
    setFormData((prev) => {
      const isSelected = prev.languagesKnown.includes(lang);
      return {
        ...prev,
        languagesKnown: isSelected
          ? prev.languagesKnown.filter((l) => l !== lang)
          : [...prev.languagesKnown, lang],
      };
    });
  };

  const handleWorkingDayToggle = (day: string) => {
    setFormData((prev) => {
      const isSelected = prev.workingDays.includes(day);
      return {
        ...prev,
        workingDays: isSelected
          ? prev.workingDays.filter((d) => d !== day)
          : [...prev.workingDays, day],
      };
    });
  };

  const handlePreferredCityToggle = (city: string) => {
    setFormData((prev) => {
      const isSelected = prev.preferredCities.includes(city);
      return {
        ...prev,
        preferredCities: isSelected
          ? prev.preferredCities.filter((c) => c !== city)
          : [...prev.preferredCities, city],
      };
    });
  };

  const handleSubServiceToggle = (serviceLabel: string, subService: string) => {
    setFormData((prev) => {
      const currentSubServices = prev.selectedSubServices[serviceLabel] || [];
      const isSelected = currentSubServices.includes(subService);
      return {
        ...prev,
        selectedSubServices: {
          ...prev.selectedSubServices,
          [serviceLabel]: isSelected
            ? currentSubServices.filter((s) => s !== subService)
            : [...currentSubServices, subService],
        },
      };
    });
  };

  const handleSubServiceExperienceChange = (subService: string, years: string) => {
    setFormData((prev) => ({
      ...prev,
      subServiceExperience: {
        ...prev.subServiceExperience,
        [subService]: years,
      },
    }));
  };

  const getServiceByLabel = (label: string) => {
    // Map ATTENDANT_SERVICE_OPTIONS labels to FULL_SERVICE_CATALOG
    const labelToSlugMap: Record<string, string> = {
      "Women Driver": "long-distance-driver",
      "Hospital Attendant": "hospital-attendants",
      "Elderly Care": "elderly-care",
      "Nursing Care": "nursing-services",
      "Post-Natal Care": "post-natal-care",
      "Recovery Care": "recovery-care",
      "Physiotherapy Support": "physiotherapy-support",
      "IV Support": "iv-support",
      "Home Tailoring": "home-tailoring",
      "Domestic Support": "domestic-support",
      "Women Electrician": "women-electrician",
      "Women Plumber": "women-plumber",
      "Women Carpenter": "women-carpenter",
      "Appliance Assistance": "appliance-assistance",
      "Security Guard": "women-security-guards",
      "Hostel Security": "women-hostel-security",
      "Event Security": "women-event-security",
      "Airport Pickup": "airport-pickup",
      "Railway Pickup": "railway-pickup",
      "Travel Companion": "women-travel-companion",
      "Event Manager": "women-event-managers",
      "Child Care": "child-care-support",
      "Babysitting": "babysitting",
      "Nanny Services": "nanny-services",
    };
    const slug = labelToSlugMap[label];
    return FULL_SERVICE_CATALOG.find((s) => s.slug === slug);
  };

  const handleServiceToggle = (serviceLabel: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedServices.includes(serviceLabel);
      return {
        ...prev,
        selectedServices: isSelected 
          ? prev.selectedServices.filter((s) => s !== serviceLabel)
          : [...prev.selectedServices, serviceLabel]
      };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, [fieldName]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.mobileNumber || !formData.email || !formData.password || !formData.address || !formData.city || !formData.pinCode || !formData.emergencyContact) {
        alert("Please fill in all required personal details.");
        return false;
      }
      if (!/^\d{10}$/.test(formData.mobileNumber)) {
        alert("Please enter a valid 10-digit mobile number.");
        return false;
      }
    }
    if (currentStep === 2) {
      if (formData.languagesKnown.length === 0) {
        alert("Please select at least one language.");
        return false;
      }
    }
    if (currentStep === 3) {
      if (formData.selectedServices.length === 0) {
        alert("Please select at least one service role.");
        return false;
      }
    }
    if (currentStep === 4) {
      // Check required documents dynamically
      const requiredDocs = getDocRequirements(formData.selectedServices).filter(d => d.required);
      for (const doc of requiredDocs) {
        if (!formData[doc.id as keyof typeof formData]) {
          alert(`Please upload the required document: ${doc.label}`);
          return false;
        }
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((p) => Math.min(p + 1, 8));
    }
  };

  const prevStep = () => {
    setCurrentStep((p) => Math.max(p - 1, 1));
  };

  // Perform status tracking search
  const handleTrackStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingMobile) return;
    setLoading(true);
    setTrackError("");
    try {
      const res = await fetch(`/api/attendants/register?mobile=${encodeURIComponent(trackingMobile)}`);
      const data = await res.json();
      if (res.ok) {
        setFormData(data);
        // Transition direct to their tracking step (Step 6, 7 or 8)
        const stepMap: Record<string, number> = {
          "SUBMITTED": 6,
          "IN_PROGRESS": 6,
          "VERIFIED": 7,
          "APPROVED": 8
        };
        const targetStep = stepMap[data.verificationProgress] || 6;
        setCurrentStep(targetStep);
        setTrackingMode(true);
      } else {
        setTrackError(data.message || "No registration found with this mobile number.");
      }
    } catch (err) {
      setTrackError("Error checking registration status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Submit registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        registrationStep: 5,
        status: "Pending Approval",
        verificationProgress: "SUBMITTED"
      };

      const res = await fetch("/api/attendants/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData(data.registration);
        setCurrentStep(6); // Go directly to Step 6 (Admin Review status display)
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const requiredDocuments = getDocRequirements(formData.selectedServices);

  return (
    <>
      <Navbar onBookNowClick={() => {}} />

      <main className="min-h-screen pt-24 pb-20 bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {trackingMode ? "Track Onboarding Progress" : "Join WithYours Partner Program"}
            </h1>
            <p className="mt-3 text-slate-600 text-base max-w-lg mx-auto">
              {trackingMode 
                ? "View real-time status of your documents and background check checks."
                : "Become a certified, premium women companion or nursing specialist. Start your 8-step verification flow."
              }
            </p>
            
            {!trackingMode && (
              <button 
                onClick={() => setTrackingMode(true)}
                className="mt-4 text-sm font-bold text-primary hover:underline focus:outline-none"
              >
                Already applied? Track your status here
              </button>
            )}
          </div>

          {/* Track application status panel */}
          {trackingMode && currentStep < 6 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
              <form onSubmit={handleTrackStatus} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Enter Registered Mobile Number</label>
                  <div className="flex gap-2">
                    <input 
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={trackingMobile}
                      onChange={(e) => setTrackingMobile(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-slate-800"
                    />
                    <button 
                      type="submit"
                      disabled={loading}
                      className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-primary/95 transition-all"
                    >
                      {loading ? "Checking..." : "Track Status"}
                    </button>
                  </div>
                </div>
                {trackError && (
                  <p className="text-xs font-semibold text-rose-500 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {trackError}</p>
                )}
                <button 
                  type="button"
                  onClick={() => {
                    setTrackingMode(false);
                    setCurrentStep(1);
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-700 underline focus:outline-none"
                >
                  Back to Registration Form
                </button>
              </form>
            </div>
          )}

          {/* Progress Timeline Indicator */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
            <div className="flex justify-between items-center min-w-[600px] relative px-4">
              <div className="absolute left-4 right-4 top-5 h-0.5 bg-slate-100 -z-10" />
              <div 
                className="absolute left-4 top-5 h-0.5 bg-primary -z-10 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 7) * 100}%` }}
              />
              
              {ONBOARDING_STEPS.map((s) => (
                <div key={s.step} className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-4 ${
                      currentStep >= s.step 
                        ? "bg-primary border-primary/20 text-white shadow-md scale-105" 
                        : "bg-white border-slate-200 text-slate-400"
                    }`}
                  >
                    {currentStep > s.step ? <Check className="h-4.5 w-4.5" /> : s.step}
                  </div>
                  <span className={`text-[10px] mt-2 font-bold text-center leading-tight max-w-[80px] ${
                    currentStep >= s.step ? "text-primary" : "text-slate-400"
                  }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Form Container */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden min-h-[450px] flex flex-col justify-between">
            <form onSubmit={currentStep === 5 ? handleSubmit : (e) => e.preventDefault()}>
              <div className="p-6 sm:p-10">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* STEP 1: Personal Details */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-black text-slate-900 border-b pb-3 flex items-center gap-2">
                          <User className="text-primary h-5 w-5" />
                          Step 1: Personal Details
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
                            <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address *</label>
                            <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Password *</label>
                            <input type="password" name="password" required value={formData.password} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Mobile Number *</label>
                            <input type="tel" name="mobileNumber" required placeholder="10-digit number" value={formData.mobileNumber} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Date of Birth *</label>
                            <input type="date" name="dateOfBirth" required value={formData.dateOfBirth} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Age *</label>
                            <input type="number" name="age" required value={formData.age} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Emergency Contact Number *</label>
                            <input type="tel" name="emergencyContact" required value={formData.emergencyContact} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">State *</label>
                            <input type="text" name="state" required value={formData.state} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Residential Address *</label>
                            <textarea name="address" rows={2} required value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none"></textarea>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">City *</label>
                            <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">PIN Code *</label>
                            <input type="text" name="pinCode" required value={formData.pinCode} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Professional Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-black text-slate-900 border-b pb-3 flex items-center gap-2">
                          <Briefcase className="text-primary h-5 w-5" />
                          Step 2: Professional Details
                        </h2>

                        <div className="grid grid-cols-1 gap-5">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-1">Years of Work Experience *</label>
                              <input type="number" name="yearsOfExperience" required value={formData.yearsOfExperience} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-1">Certifications / Degrees</label>
                              <input type="text" name="certifications" placeholder="e.g. GNM Nursing Diploma, Driver Cert" value={formData.certifications} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Languages Known * <span className="text-xs text-slate-400 font-normal">(Select all that apply)</span></label>
                            <div className="flex flex-wrap gap-2">
                              {languagesList.map((lang) => {
                                const isSelected = formData.languagesKnown.includes(lang);
                                return (
                                  <button
                                    type="button"
                                    key={lang}
                                    onClick={() => handleLanguageToggle(lang)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                                      isSelected
                                        ? "bg-primary text-white border-primary shadow-sm"
                                        : "bg-slate-50 text-slate-600 border-slate-200 hover:border-primary/30"
                                    }`}
                                  >
                                    {lang}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Special Skills</label>
                            <textarea name="specialSkills" placeholder="e.g. ICU patient monitoring, infant massage, cooking, automatic car specialist..." value={formData.specialSkills} onChange={handleInputChange} rows={2} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none" />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Previous Employment Experience</label>
                            <textarea name="previousExperience" placeholder="e.g. Worked at Apollo Hospital Chennai for 3 years..." value={formData.previousExperience} onChange={handleInputChange} rows={2} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none" />
                          </div>

                          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 space-y-4">
                            <h3 className="font-black text-purple-900 text-sm uppercase tracking-wider flex items-center gap-2">
                              <Clock className="h-4.5 w-4.5" />
                              Availability & Working Preferences
                            </h3>

                            <div>
                              <label className="block text-sm font-semibold text-purple-800 mb-2">Working Days <span className="text-xs text-purple-500 font-normal">(Select all that apply)</span></label>
                              <div className="flex flex-wrap gap-2">
                                {WORKING_DAYS.map((day) => {
                                  const isSelected = formData.workingDays.includes(day);
                                  return (
                                    <button
                                      type="button"
                                      key={day}
                                      onClick={() => handleWorkingDayToggle(day)}
                                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                                        isSelected
                                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                                          : "bg-white text-purple-700 border-purple-200 hover:border-purple-400"
                                      }`}
                                    >
                                      {day}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-purple-800 mb-1">Available From</label>
                                <input type="time" name="availableFrom" value={formData.availableFrom} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-purple-800 mb-1">Available To</label>
                                <input type="time" name="availableTo" value={formData.availableTo} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-purple-800 mb-1">Preferred Working Shift</label>
                              <select name="preferredWorkingShift" value={formData.preferredWorkingShift} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none">
                                {WORKING_SHIFTS.map((shift) => (
                                  <option key={shift} value={shift}>{shift}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-purple-800 mb-2">Preferred Cities <span className="text-xs text-purple-500 font-normal">(Select all that apply)</span></label>
                              <div className="flex flex-wrap gap-2">
                                {ALL_CITIES.map((city) => {
                                  const isSelected = formData.preferredCities.includes(city);
                                  return (
                                    <button
                                      type="button"
                                      key={city}
                                      onClick={() => handlePreferredCityToggle(city)}
                                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                                        isSelected
                                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                                          : "bg-white text-purple-700 border-purple-200 hover:border-purple-400"
                                      }`}
                                    >
                                      {city}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Service Selection */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-black text-slate-900 border-b pb-3 flex items-center gap-2">
                          <Star className="text-primary h-5 w-5" />
                          Step 3: Service Selection
                        </h2>
                        <p className="text-sm text-slate-500">Choose the service categories you want to be assigned for. Different roles have distinct verification documents.</p>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                          {ATTENDANT_SERVICE_OPTIONS.map((opt) => {
                            const isSelected = formData.selectedServices.includes(opt.label);
                            const service = getServiceByLabel(opt.label);
                            const selectedSubServicesForService = formData.selectedSubServices[opt.label] || [];

                            return (
                              <div key={opt.label} className={`border rounded-2xl p-4 transition-all ${isSelected ? "bg-purple-50/50 border-primary" : "bg-white border-slate-200"}`}>
                                <button
                                  type="button"
                                  onClick={() => handleServiceToggle(opt.label)}
                                  className="w-full text-left flex items-center gap-3"
                                >
                                  <span className="text-2xl">{opt.icon}</span>
                                  <div className="flex-1">
                                    <p className={`text-sm font-bold ${isSelected ? "text-primary" : "text-slate-800"}`}>
                                      {opt.label}
                                    </p>
                                  </div>
                                  {isSelected && <CheckCircle className="h-5 w-5 text-primary shrink-0" />}
                                </button>

                                {isSelected && service && service.subServices.length > 0 && (
                                  <div className="mt-4 space-y-4 border-t border-purple-200 pt-4">
                                    <h4 className="text-sm font-semibold text-purple-800">Select Sub-Services</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {service.subServices.map((subService) => {
                                        const isSubSelected = selectedSubServicesForService.includes(subService.title);
                                        return (
                                          <button
                                            key={subService.title}
                                            type="button"
                                            onClick={() => handleSubServiceToggle(opt.label, subService.title)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                              isSubSelected
                                                ? "bg-primary text-white border-primary shadow-sm"
                                                : "bg-white text-purple-700 border-purple-200 hover:border-purple-400"
                                            }`}
                                          >
                                            {subService.title}
                                          </button>
                                        );
                                      })}
                                    </div>

                                    {selectedSubServicesForService.length > 0 && (
                                      <div className="space-y-2">
                                        <h4 className="text-sm font-semibold text-purple-800">Experience for Selected Sub-Services</h4>
                                        {selectedSubServicesForService.map((subService) => (
                                          <div key={subService} className="flex items-center gap-3">
                                            <label className="text-xs text-slate-700 font-medium min-w-[150px]">{subService}</label>
                                            <input
                                              type="number"
                                              placeholder="Years"
                                              value={formData.subServiceExperience[subService] || ""}
                                              onChange={(e) => handleSubServiceExperienceChange(subService, e.target.value)}
                                              className="flex-1 px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                                            />
                                            <span className="text-xs text-slate-500">years</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 4: Document Upload */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-black text-slate-900 border-b pb-3 flex items-center gap-2">
                          <UploadCloud className="text-primary h-5 w-5" />
                          Step 4: Document Upload
                        </h2>
                        <p className="text-sm text-slate-500">Based on your service selections, upload the required documentation (PDF, JPG, PNG up to 5MB).</p>

                        <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                          {/* Profile Photo - Always Required */}
                          <div className="border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white shadow-sm">
                            <div className="flex items-center gap-3">
                              <User className="h-6 w-6 text-slate-400" />
                              <div>
                                <h4 className="font-bold text-slate-800 text-sm">Profile Photo <span className="text-rose-500">*</span></h4>
                                <p className="text-xs text-slate-400">Recent color passport photo</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                              <label className="cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
                                <UploadCloud className="w-4 h-4" />
                                <span>Upload Photo</span>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, "profilePhotoBase64")} />
                              </label>
                              {formData.profilePhotoBase64 && (
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 flex items-center gap-0.5">
                                  ✓ Uploaded
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Role-based required & optional docs */}
                          {requiredDocuments.map((doc) => (
                            <div key={doc.id} className="border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white shadow-sm">
                              <div className="flex items-center gap-3">
                                <Shield className="h-6 w-6 text-slate-400" />
                                <div>
                                  <h4 className="font-bold text-slate-800 text-sm">
                                    {doc.label} {doc.required && <span className="text-rose-500">*</span>}
                                  </h4>
                                  <p className="text-xs text-slate-400">National identity/proof certificate</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 shrink-0">
                                <label className="cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
                                  <UploadCloud className="w-4 h-4" />
                                  <span>Upload File</span>
                                  <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileUpload(e, doc.id)} />
                                </label>
                                {formData[doc.id as keyof typeof formData] && (
                                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 flex items-center gap-0.5">
                                    ✓ Uploaded
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 5: Background Verification Consent & Submit */}
                    {currentStep === 5 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-black text-slate-900 border-b pb-3 flex items-center gap-2">
                          <Shield className="text-primary h-5 w-5" />
                          Step 5: Background Verification Consent
                        </h2>

                        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 space-y-4">
                          <h4 className="font-extrabold text-purple-950 text-sm uppercase tracking-wider flex items-center gap-1">
                            <Award className="h-4.5 w-4.5" />
                            Official Attendant Declaration
                          </h4>
                          
                          <p className="text-xs text-purple-900 leading-relaxed font-medium">
                            I hereby authorize WithYours Platform and its designated agency to conduct comprehensive background checks including but not limited to: Aadhaar/Identity verification, PAN verification, Police record verification, Neighborhood enquiry, and experience check verification. 
                          </p>

                          <p className="text-xs text-purple-900 leading-relaxed font-medium">
                            I declare that all the information and documents uploaded are genuine. Any false statement or misrepresentation will lead to immediate termination of account and legal actions.
                          </p>

                          <label className="flex items-start gap-2 pt-2 cursor-pointer">
                            <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            <span className="text-xs text-purple-950 font-bold leading-tight">
                              I accept all terms and conditions and grant consent for background verification checks.
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* STEP 6: Admin Review display */}
                    {currentStep === 6 && (
                      <div className="space-y-6 text-center py-6">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-primary mb-4 animate-bounce">
                          <Clock className="h-9 w-9" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900">Step 6: Under Admin Review</h2>
                        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                          Your profile has been submitted successfully. Our safety inspectors are currently verifying your references, address and conducting neighborhood enquiry.
                        </p>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left max-w-md mx-auto mt-4 space-y-3">
                          <span className="text-xs font-bold text-slate-400 uppercase">Verification Progress Pipeline</span>
                          
                          <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                              <CheckCircle className="h-4 w-4 shrink-0" />
                              <span>Registration Details & Services Submitted</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                              <CheckCircle className="h-4 w-4 shrink-0" />
                              <span>Documents Uploaded Successfully</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                              <Clock className="h-4 w-4 shrink-0 animate-spin" />
                              <span>Independent Background Checks (In Progress)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 7: Approval Status */}
                    {currentStep === 7 && (
                      <div className="space-y-6 text-center py-6">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 mb-4 shadow-sm">
                          <Award className="h-9 w-9" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900">Step 7: Verification Verified!</h2>
                        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                          Congratulations! Your background checks (Aadhaar, Police clearance, Neighborhood verification) have passed. Your profile is waiting for administrator activation.
                        </p>

                        <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 text-left max-w-md mx-auto mt-4 space-y-3">
                          <span className="text-xs font-bold text-emerald-800 uppercase">Passed Checklists</span>
                          
                          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-emerald-700 pt-2">
                            <div className="flex items-center gap-1">✓ Aadhaar Card</div>
                            <div className="flex items-center gap-1">✓ PAN Card</div>
                            <div className="flex items-center gap-1">✓ Police Record</div>
                            <div className="flex items-center gap-1">✓ Address check</div>
                            <div className="flex items-center gap-1">✓ References check</div>
                            <div className="flex items-center gap-1">✓ Experience check</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 8: Activation status */}
                    {currentStep === 8 && (
                      <div className="space-y-6 text-center py-6">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-primary mb-4 shadow-sm animate-pulse">
                          <CheckCircle className="h-9 w-9" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900">Step 8: Account Activated!</h2>
                        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                          Your WithYours Attendant Account is officially active! You can now log into your Attendant Dashboard using your mobile number and start receiving duty calls.
                        </p>

                        <div className="pt-6">
                          <button
                            onClick={() => window.location.href = "/attendant-dashboard"}
                            className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
                          >
                            Go to Attendant Dashboard
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

              </div>

              {/* Form Navigation Buttons */}
              {currentStep <= 5 && (
                <div className="bg-slate-50 px-6 py-4 sm:px-10 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1 || loading}
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                      currentStep === 1 ? "text-slate-400 cursor-not-allowed opacity-50" : "text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" /> Back
                  </button>
                  
                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/95 transition-all shadow-md shadow-primary/20 cursor-pointer"
                    >
                      Next Step
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Clock className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <CheckCircle className="w-5 h-5 ml-1.5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
