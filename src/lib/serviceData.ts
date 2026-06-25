// Complete WithYours Phase 2 — Service Catalog, Subcategories, Availability & Role-Based Documents

export interface SubServiceDef {
  title: string;
  description?: string;
  price?: string;
}

export interface ServiceDef {
  title: string;
  slug: string;
  description: string;
  startingPrice: string;
  rating: number;
  badge: "Popular" | "Trending" | "Freshly Added" | "Premium";
  iconName: string;
  gradient: string;
  categorySlug: string;
  isPremium?: boolean;
  subServices: SubServiceDef[];
  availableCities: string[];
}

// ─── SERVICE CATEGORIES ───────────────────────────────────────────────────────
export const SERVICE_CATEGORIES = [
  { id: "all", name: "All Services", slug: "all", iconName: "Star" },
  { id: "home-care", name: "Home & Personal Care", slug: "home-care", iconName: "Home" },
  { id: "repair", name: "Repair & Utility", slug: "repair", iconName: "Wrench" },
  { id: "security", name: "Safety & Security", slug: "security", iconName: "Shield" },
  { id: "travel", name: "Travel & Mobility", slug: "travel", iconName: "Car" },
  { id: "lifestyle", name: "Event & Lifestyle", slug: "lifestyle", iconName: "Mic" },
];

// ─── ALL CITIES ───────────────────────────────────────────────────────────────
export const ALL_CITIES = ["Bengaluru", "Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Erode", "Tirunelveli", "Mysuru", "Hyderabad"];

// ─── WORKING DAYS ─────────────────────────────────────────────────────────────
export const WORKING_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// ─── WORKING SHIFTS ───────────────────────────────────────────────────────────
export const WORKING_SHIFTS = ["Morning Shift", "Afternoon Shift", "Evening Shift", "Night Shift", "Flexible"];

// ─── COMPLETE SERVICE CATALOG ─────────────────────────────────────────────────
export const FULL_SERVICE_CATALOG: ServiceDef[] = [
  // ══════════════════════════════════════════════════════════════
  // HOME & PERSONAL CARE
  // ══════════════════════════════════════════════════════════════
  {
    title: "Elderly Care",
    slug: "elderly-care",
    description: "Compassionate and trained women attendants providing 24/7 companionship, daily assistance, and emotional support for elderly family members at home.",
    startingPrice: "₹1,299/day",
    rating: 4.9,
    badge: "Popular",
    iconName: "Award",
    gradient: "from-[#A9AF90] to-[#828A6B]",
    categorySlug: "home-care",
    subServices: [
      { title: "Daily Living Assistance", description: "Bathing, dressing, grooming, and mobility support", price: "₹1,299/day" },
      { title: "Medication Management", description: "Timely medicine reminders and administration", price: "₹1,499/day" },
      { title: "Companionship Services", description: "Emotional support, conversation, and activity engagement", price: "₹999/day" },
      { title: "Night Care Attendant", description: "Overnight supervision and emergency response", price: "₹1,599/day" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore", "Madurai"],
  },
  {
    title: "Hospital Attendants",
    slug: "hospital-attendants",
    description: "Compassionate bedside assistance, medicine reminders, and companionship for family members in hospitals. Trusted women attendants who provide 24/7 hospital support.",
    startingPrice: "₹1,499/day",
    rating: 4.9,
    badge: "Popular",
    iconName: "HeartPulse",
    gradient: "from-[#E2B380] to-[#C68B59]",
    categorySlug: "home-care",
    subServices: [
      { title: "Day-Time Hospital Attendant", description: "6 AM to 6 PM bedside assistance", price: "₹1,499/day" },
      { title: "Night-Time Hospital Attendant", description: "6 PM to 6 AM overnight care", price: "₹1,699/day" },
      { title: "24-Hour Hospital Attendant", description: "Round-the-clock hospital support", price: "₹2,499/day" },
      { title: "ICU Companion Support", description: "Specialized ICU waiting area support and family coordination", price: "₹1,999/day" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore", "Madurai"],
  },
  {
    title: "Nursing Services",
    slug: "nursing-services",
    description: "Qualified, empathetic female nurses and medical assistants for critical health monitoring, wound care, injection support, and recovery care at home.",
    startingPrice: "₹1,999/day",
    rating: 4.9,
    badge: "Popular",
    iconName: "HeartPulse",
    gradient: "from-[#FF6B6B] to-[#EE5A24]",
    categorySlug: "home-care",
    subServices: [
      { title: "General Nursing", description: "Routine health monitoring, vitals check, and medication management", price: "₹1,999/day" },
      { title: "ICU Nursing", description: "Specialized care for critical patients at home", price: "₹3,499/day" },
      { title: "IV Support", description: "Intravenous fluid administration and monitoring", price: "₹999/visit" },
      { title: "Injection Support", description: "Intramuscular and subcutaneous injection administration", price: "₹499/visit" },
      { title: "Physiotherapy", description: "Physical rehabilitation exercises and mobility training", price: "₹1,299/session" },
      { title: "Home Recovery Care", description: "Post-surgery or post-discharge recovery assistance", price: "₹2,499/day" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore"],
  },
  {
    title: "Post-Natal Care",
    slug: "post-natal-care",
    description: "Trained women attendants providing specialized care for new mothers and newborns, including feeding assistance, baby care, and maternal recovery support.",
    startingPrice: "₹1,999/day",
    rating: 5.0,
    badge: "Popular",
    iconName: "Baby",
    gradient: "from-[#FFB7B2] to-[#E28495]",
    categorySlug: "home-care",
    subServices: [
      { title: "Mother Care Support", description: "Post-delivery recovery, nutrition, and emotional support", price: "₹1,999/day" },
      { title: "Newborn Baby Care", description: "Bathing, feeding, and routine monitoring of newborns", price: "₹1,799/day" },
      { title: "Lactation Support", description: "Breastfeeding guidance and support", price: "₹999/visit" },
      { title: "Full Post-Natal Package", description: "Combined mother and baby care for 30 days", price: "₹49,999/month" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore", "Madurai"],
  },
  {
    title: "Newborn Mother Care",
    slug: "newborn-mother-care",
    description: "Dedicated care for first-time mothers. Our trained attendants help with baby handling, nutrition planning, and postpartum wellness.",
    startingPrice: "₹1,799/day",
    rating: 4.9,
    badge: "Trending",
    iconName: "Baby",
    gradient: "from-[#FDA085] to-[#F6D365]",
    categorySlug: "home-care",
    subServices: [
      { title: "Newborn Handling Training", description: "Teaching new mothers safe baby handling techniques", price: "₹999/session" },
      { title: "Mother Nutrition Planning", description: "Customized diet planning for lactating mothers", price: "₹799/visit" },
      { title: "24/7 Mother-Baby Support", description: "Round-the-clock newborn and mother assistance", price: "₹2,499/day" },
    ],
    availableCities: ["Bengaluru", "Chennai"],
  },
  {
    title: "Recovery Care",
    slug: "recovery-care",
    description: "Professional women attendants assisting patients recovering from surgery, illness, or injury with mobility support, wound care, and rehabilitation.",
    startingPrice: "₹1,599/day",
    rating: 4.8,
    badge: "Trending",
    iconName: "HeartPulse",
    gradient: "from-[#667EEA] to-[#764BA2]",
    categorySlug: "home-care",
    subServices: [
      { title: "Post-Surgery Recovery", description: "Wound management, mobility assistance, and medication management", price: "₹1,999/day" },
      { title: "Fracture Care Support", description: "Immobilization assistance and rehabilitation exercises", price: "₹1,599/day" },
      { title: "Chronic Illness Management", description: "Ongoing support for diabetes, hypertension, and other conditions", price: "₹1,499/day" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore"],
  },
  {
    title: "Physiotherapy Support",
    slug: "physiotherapy-support",
    description: "Certified women physiotherapists providing rehabilitation, mobility training, and therapeutic exercises at home.",
    startingPrice: "₹1,299/session",
    rating: 4.8,
    badge: "Freshly Added",
    iconName: "HeartPulse",
    gradient: "from-[#43E97B] to-[#38F9D7]",
    categorySlug: "home-care",
    subServices: [
      { title: "Orthopaedic Physiotherapy", description: "Joint pain, back pain, and post-fracture rehabilitation", price: "₹1,299/session" },
      { title: "Neurological Physiotherapy", description: "Stroke recovery, paralysis rehabilitation", price: "₹1,599/session" },
      { title: "Geriatric Physiotherapy", description: "Mobility and balance training for elderly", price: "₹1,199/session" },
      { title: "Sports Physiotherapy", description: "Sports injury recovery and performance rehabilitation", price: "₹1,499/session" },
    ],
    availableCities: ["Bengaluru", "Chennai"],
  },
  {
    title: "IV Support",
    slug: "iv-support",
    description: "Trained nursing professionals providing safe intravenous fluid administration and monitoring at home.",
    startingPrice: "₹999/visit",
    rating: 4.9,
    badge: "Popular",
    iconName: "HeartPulse",
    gradient: "from-[#A18CD1] to-[#FBC2EB]",
    categorySlug: "home-care",
    subServices: [
      { title: "IV Fluid Administration", description: "Saline, glucose, and medication infusions", price: "₹999/visit" },
      { title: "IV Monitoring", description: "Ongoing monitoring during long infusions", price: "₹1,499/visit" },
      { title: "Blood Sample Collection", description: "Home blood draw and sample preparation", price: "₹499/visit" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore"],
  },
  {
    title: "Home Tailoring Services",
    slug: "home-tailoring",
    description: "On-demand women tailors visiting your home for stitching, alterations, and custom garment creation.",
    startingPrice: "₹499/hr",
    rating: 4.8,
    badge: "Trending",
    iconName: "Scissors",
    gradient: "from-[#F9A826] to-[#F27121]",
    categorySlug: "home-care",
    subServices: [
      { title: "Blouse Stitching", description: "Custom blouse stitching and fitting", price: "₹499" },
      { title: "Dress Alterations", description: "Adjustments, hemming, and modifications", price: "₹299" },
      { title: "Custom Tailoring", description: "Full garment creation from fabric", price: "₹999" },
      { title: "Embroidery Work", description: "Hand and machine embroidery designs", price: "₹799" },
    ],
    availableCities: ["Chennai", "Coimbatore", "Madurai"],
  },
  {
    title: "Domestic Support Staff",
    slug: "domestic-support",
    description: "Trusted women support staff for household management, cooking assistance, and cleaning services.",
    startingPrice: "₹899/day",
    rating: 4.9,
    badge: "Popular",
    iconName: "Home",
    gradient: "from-[#1D976C] to-[#93F9B9]",
    categorySlug: "home-care",
    subServices: [
      { title: "House Cleaning", description: "Deep cleaning and daily maintenance", price: "₹899/day" },
      { title: "Cooking Assistance", description: "Meal preparation and kitchen management", price: "₹999/day" },
      { title: "Laundry & Ironing", description: "Clothes washing, drying, and ironing", price: "₹599/day" },
      { title: "Full Domestic Support", description: "All-inclusive household management", price: "₹1,499/day" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore", "Madurai"],
  },

  // ══════════════════════════════════════════════════════════════
  // REPAIR & UTILITY
  // ══════════════════════════════════════════════════════════════
  {
    title: "Women Electrician",
    slug: "women-electrician",
    description: "Certified women electricians for safe and reliable home electrical repairs, installations, and troubleshooting.",
    startingPrice: "₹599/visit",
    rating: 4.7,
    badge: "Freshly Added",
    iconName: "Wrench",
    gradient: "from-[#4B79A1] to-[#283E51]",
    categorySlug: "repair",
    subServices: [
      { title: "Wiring Repair", description: "Faulty wiring diagnosis and repair", price: "₹599/visit" },
      { title: "Switch & Socket Installation", description: "New switch and socket fitting", price: "₹399/visit" },
      { title: "Fan & Light Installation", description: "Ceiling fan and lighting fixture setup", price: "₹499/visit" },
      { title: "Full Home Inspection", description: "Complete electrical safety audit", price: "₹999/visit" },
    ],
    availableCities: ["Bengaluru", "Chennai"],
  },
  {
    title: "Women Plumber",
    slug: "women-plumber",
    description: "Trained women plumbing professionals for leak repairs, pipe installations, and bathroom fixture maintenance.",
    startingPrice: "₹599/visit",
    rating: 4.7,
    badge: "Freshly Added",
    iconName: "Wrench",
    gradient: "from-[#2193B0] to-[#6DD5ED]",
    categorySlug: "repair",
    subServices: [
      { title: "Leak Repair", description: "Pipe and faucet leak fixing", price: "₹599/visit" },
      { title: "Drain Cleaning", description: "Blocked drain and pipe clearing", price: "₹499/visit" },
      { title: "Fixture Installation", description: "Tap, shower, and toilet installation", price: "₹699/visit" },
      { title: "Water Tank Maintenance", description: "Tank cleaning and pump repair", price: "₹899/visit" },
    ],
    availableCities: ["Bengaluru", "Chennai"],
  },
  {
    title: "Women Carpenter",
    slug: "women-carpenter",
    description: "Skilled women carpenters for furniture repair, assembly, and custom woodworking at your home.",
    startingPrice: "₹699/visit",
    rating: 4.7,
    badge: "Freshly Added",
    iconName: "Wrench",
    gradient: "from-[#C94B4B] to-[#4B134F]",
    categorySlug: "repair",
    subServices: [
      { title: "Furniture Repair", description: "Chair, table, and cupboard fixes", price: "₹699/visit" },
      { title: "Door & Lock Repair", description: "Door alignment and lock replacement", price: "₹599/visit" },
      { title: "Furniture Assembly", description: "New furniture assembly and setup", price: "₹499/visit" },
      { title: "Custom Shelving", description: "Wall shelves and storage solutions", price: "₹999/visit" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore"],
  },
  {
    title: "Appliance Assistance",
    slug: "appliance-assistance",
    description: "Minor troubleshooting and maintenance for home appliances by trained women technicians.",
    startingPrice: "₹499/visit",
    rating: 4.8,
    badge: "Trending",
    iconName: "Settings",
    gradient: "from-[#8E2DE2] to-[#4A00E0]",
    categorySlug: "repair",
    subServices: [
      { title: "Washing Machine Service", description: "Cleaning, filter maintenance, and minor repairs", price: "₹499/visit" },
      { title: "AC Service", description: "Filter cleaning and gas top-up", price: "₹699/visit" },
      { title: "Refrigerator Service", description: "Compressor check and thermostat calibration", price: "₹599/visit" },
      { title: "Microwave & Oven Service", description: "Maintenance and minor troubleshooting", price: "₹399/visit" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore"],
  },

  // ══════════════════════════════════════════════════════════════
  // SAFETY & SECURITY
  // ══════════════════════════════════════════════════════════════
  {
    title: "Women Security Guards",
    slug: "women-security-guards",
    description: "Highly trained, alert female security professionals for private functions, corporate events, residential security, or personal safety.",
    startingPrice: "₹1,999/day",
    rating: 5.0,
    badge: "Popular",
    iconName: "ShieldAlert",
    gradient: "from-[#D87D56] to-[#B85C38]",
    categorySlug: "security",
    subServices: [
      { title: "Residential Security", description: "24/7 gated community or apartment security", price: "₹1,999/day" },
      { title: "Corporate Security", description: "Office and workspace security personnel", price: "₹2,499/day" },
      { title: "Personal Security", description: "Individual bodyguard and safety escort", price: "₹2,999/day" },
      { title: "VIP Security", description: "Premium protection for high-profile individuals", price: "₹4,999/day" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore", "Madurai"],
  },
  {
    title: "Women Hostel Security",
    slug: "women-hostel-security",
    description: "Trusted women-led safety support for women's hostels, PG accommodations, and residential environments.",
    startingPrice: "₹1,499/day",
    rating: 4.9,
    badge: "Popular",
    iconName: "Building",
    gradient: "from-[#11998E] to-[#38EF7D]",
    categorySlug: "security",
    subServices: [
      { title: "Hostel Gate Security", description: "Entry/exit monitoring and visitor management", price: "₹1,499/day" },
      { title: "Night Patrol Security", description: "Nighttime premises monitoring and patrol", price: "₹1,799/day" },
      { title: "CCTV Monitoring Support", description: "Security camera operation and incident reporting", price: "₹1,299/day" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore", "Madurai"],
  },
  {
    title: "Women Security for Jewellery Shopping",
    slug: "jewellery-shopping-security",
    description: "Secure companionship for high-value personal shopping. Our trained guards ensure safety during jewellery purchases and transport.",
    startingPrice: "₹999/visit",
    rating: 4.9,
    badge: "Freshly Added",
    iconName: "Gem",
    gradient: "from-[#F7971E] to-[#FFD200]",
    categorySlug: "security",
    subServices: [
      { title: "Shopping Escort", description: "Accompanying you to jewellery shops and back", price: "₹999/visit" },
      { title: "Transport Security", description: "Secure transit with purchased valuables", price: "₹1,499/visit" },
      { title: "Wedding Shopping Guard", description: "Full-day security for wedding jewellery shopping", price: "₹2,499/day" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore", "Madurai"],
  },
  {
    title: "Women Event Security",
    slug: "women-event-security",
    description: "Professional female security for social and corporate events, ensuring guest safety and crowd management.",
    startingPrice: "₹2,499/event",
    rating: 4.8,
    badge: "Popular",
    iconName: "Shield",
    gradient: "from-[#CB2D3E] to-[#EF473A]",
    categorySlug: "security",
    subServices: [
      { title: "Wedding Security", description: "Complete security management for wedding events", price: "₹4,999/event" },
      { title: "Corporate Event Security", description: "Conference and seminar security", price: "₹3,499/event" },
      { title: "Private Party Security", description: "Birthday, anniversary, and social event security", price: "₹2,499/event" },
      { title: "Exhibition Security", description: "Trade show and art gallery security", price: "₹2,999/event" },
    ],
    availableCities: ["Bengaluru", "Chennai"],
  },

  // ══════════════════════════════════════════════════════════════
  // TRAVEL & MOBILITY
  // ══════════════════════════════════════════════════════════════
  {
    title: "Long Distance Women Driver Services",
    slug: "long-distance-driver",
    description: "Premium outstation and long-distance driving services by experienced, verified professional women drivers. Your trusted companion for interstate and highway travel.",
    startingPrice: "₹2,499/day",
    rating: 4.9,
    badge: "Premium",
    iconName: "Car",
    gradient: "from-[#FFD700] to-[#FF8C00]",
    categorySlug: "travel",
    isPremium: true,
    subServices: [
      { title: "Outstation Day Trip", description: "Single-day outstation driving within 300 km", price: "₹2,499/day" },
      { title: "Multi-Day Outstation", description: "Multi-day highway and interstate driving", price: "₹2,199/day" },
      { title: "Pilgrimage Trip Driver", description: "Temple and religious site tour driving", price: "₹2,299/day" },
      { title: "Corporate Road Trip", description: "Business travel with professional driving", price: "₹2,999/day" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore", "Madurai"],
  },
  {
    title: "Airport Pickup",
    slug: "airport-pickup",
    description: "Safe, trusted female companions to assist you or your loved ones from the airport, helping with luggage and secure transport to your destination.",
    startingPrice: "₹999",
    rating: 4.9,
    badge: "Popular",
    iconName: "Plane",
    gradient: "from-[#FF9E7D] to-[#E07A5F]",
    categorySlug: "travel",
    subServices: [
      { title: "Home → Airport", description: "Pickup from home and drop at airport terminal", price: "₹999" },
      { title: "Airport → Home", description: "Airport arrival pickup and home drop", price: "₹999" },
      { title: "Airport Assistance Only", description: "Terminal navigation, check-in, and boarding assistance", price: "₹699" },
      { title: "Airport Meet & Greet", description: "VIP arrival welcome with signage and luggage handling", price: "₹1,299" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore"],
  },
  {
    title: "Airport Drop",
    slug: "airport-drop",
    description: "Reliable women companions ensuring safe transport to the airport with luggage assistance and check-in support.",
    startingPrice: "₹999",
    rating: 4.9,
    badge: "Popular",
    iconName: "Plane",
    gradient: "from-[#E07A5F] to-[#C97A8E]",
    categorySlug: "travel",
    subServices: [
      { title: "Home → Airport Drop", description: "Secure transport from residence to airport", price: "₹999" },
      { title: "Office → Airport Drop", description: "Corporate pickup and airport transfer", price: "₹1,199" },
      { title: "Check-in Assistance", description: "Guided check-in and security navigation", price: "₹499" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore"],
  },
  {
    title: "Railway Pickup",
    slug: "railway-pickup",
    description: "Dedicated female companions meeting passengers at the railway station platform, ensuring secure transfers to final destination.",
    startingPrice: "₹799",
    rating: 4.8,
    badge: "Trending",
    iconName: "Train",
    gradient: "from-[#E07A5F] to-[#C97A8E]",
    categorySlug: "travel",
    subServices: [
      { title: "Home → Railway Station", description: "Pickup from home and drop at railway station", price: "₹799" },
      { title: "Railway Station → Home", description: "Platform pickup and home drop-off", price: "₹799" },
      { title: "Platform Assistance", description: "On-platform navigation, boarding, and seat location", price: "₹499" },
      { title: "Luggage Assistance", description: "Heavy luggage handling and porter coordination", price: "₹399" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore", "Madurai"],
  },
  {
    title: "Railway Drop",
    slug: "railway-drop",
    description: "Safe transport to railway stations with platform assistance, luggage support, and boarding help by women attendants.",
    startingPrice: "₹799",
    rating: 4.8,
    badge: "Trending",
    iconName: "Train",
    gradient: "from-[#C97A8E] to-[#A9AF90]",
    categorySlug: "travel",
    subServices: [
      { title: "Home → Station Drop", description: "Secure transport to railway station", price: "₹799" },
      { title: "Boarding Assistance", description: "Help with boarding, seat finding, and luggage placement", price: "₹499" },
      { title: "Senior Citizen Railway Support", description: "Full assistance for elderly passengers", price: "₹999" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore", "Madurai"],
  },
  {
    title: "Women Travel Companion",
    slug: "women-travel-companion",
    description: "Safe and reliable travel companionship for solo women travelers, elderly persons, or children. Full-journey accompaniment with care and safety.",
    startingPrice: "₹1,299/day",
    rating: 4.9,
    badge: "Popular",
    iconName: "Luggage",
    gradient: "from-[#00B4DB] to-[#0083B0]",
    categorySlug: "travel",
    subServices: [
      { title: "City Tour Companion", description: "Full-day city sightseeing companionship", price: "₹1,299/day" },
      { title: "Interstate Travel Companion", description: "Multi-day travel buddy for long journeys", price: "₹1,999/day" },
      { title: "Medical Travel Companion", description: "Accompanying patients to hospitals in other cities", price: "₹2,499/day" },
      { title: "Child Travel Escort", description: "Safe accompaniment for unaccompanied minors", price: "₹1,799/trip" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore", "Madurai"],
  },

  // ══════════════════════════════════════════════════════════════
  // EVENT & LIFESTYLE
  // ══════════════════════════════════════════════════════════════
  {
    title: "Women Event Managers",
    slug: "women-event-managers",
    description: "Professional women event managers for planning, coordinating, and executing social and corporate events with attention to detail.",
    startingPrice: "₹3,999/event",
    rating: 4.8,
    badge: "Trending",
    iconName: "Mic",
    gradient: "from-[#DA4453] to-[#89216B]",
    categorySlug: "lifestyle",
    subServices: [
      { title: "Wedding Coordination", description: "Full wedding planning and day-of coordination", price: "₹9,999/event" },
      { title: "Birthday Party Management", description: "Theme planning, vendor coordination, and execution", price: "₹3,999/event" },
      { title: "Corporate Event Planning", description: "Conference, seminar, and team event management", price: "₹7,999/event" },
      { title: "Cultural Event Support", description: "Festival and cultural program coordination", price: "₹4,999/event" },
    ],
    availableCities: ["Bengaluru", "Chennai"],
  },
  {
    title: "Child Care Support",
    slug: "child-care-support",
    description: "Trusted women attendants providing professional child care, including feeding, bathing, play supervision, and educational activities.",
    startingPrice: "₹999/day",
    rating: 4.9,
    badge: "Popular",
    iconName: "Baby",
    gradient: "from-[#F093FB] to-[#F5576C]",
    categorySlug: "lifestyle",
    subServices: [
      { title: "Day Care Support", description: "8 AM to 6 PM child supervision and care", price: "₹999/day" },
      { title: "After-School Care", description: "Post-school supervision, homework help, and activities", price: "₹699/day" },
      { title: "Weekend Care", description: "Full-day weekend child care for working parents", price: "₹1,199/day" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore", "Madurai"],
  },
  {
    title: "Babysitting Services",
    slug: "babysitting",
    description: "Verified and trained women babysitters for short-term child care, date nights, events, or emergency situations.",
    startingPrice: "₹499/hr",
    rating: 4.8,
    badge: "Trending",
    iconName: "Baby",
    gradient: "from-[#A770EF] to-[#CF8BF3]",
    categorySlug: "lifestyle",
    subServices: [
      { title: "Evening Babysitting", description: "3-4 hour babysitting for parents' night out", price: "₹499/hr" },
      { title: "Overnight Babysitting", description: "Full overnight baby care and supervision", price: "₹1,999/night" },
      { title: "Event Babysitting", description: "On-site child care during weddings and events", price: "₹799/hr" },
    ],
    availableCities: ["Bengaluru", "Chennai", "Coimbatore"],
  },
  {
    title: "Nanny Services",
    slug: "nanny-services",
    description: "Full-time or part-time professional women nannies for long-term child care, development support, and household coordination.",
    startingPrice: "₹15,999/month",
    rating: 4.9,
    badge: "Popular",
    iconName: "Baby",
    gradient: "from-[#4FACFE] to-[#00F2FE]",
    categorySlug: "lifestyle",
    subServices: [
      { title: "Full-Time Nanny", description: "Live-in or daily nanny for comprehensive child care", price: "₹15,999/month" },
      { title: "Part-Time Nanny", description: "Half-day child care and development support", price: "₹8,999/month" },
      { title: "Infant Nanny", description: "Specialized care for babies under 2 years", price: "₹18,999/month" },
      { title: "Bilingual Nanny", description: "Nanny proficient in English and regional languages", price: "₹19,999/month" },
    ],
    availableCities: ["Bengaluru", "Chennai"],
  },
];

// ─── ROLE-BASED DOCUMENT REQUIREMENTS ─────────────────────────────────────────
export interface DocRequirement {
  id: string;
  label: string;
  required: boolean;
}

export const ROLE_DOCUMENT_REQUIREMENTS: Record<string, DocRequirement[]> = {
  "Women Driver": [
    { id: "drivingLicenseBase64", label: "Driving License", required: true },
    { id: "aadhaarBase64", label: "Aadhaar Card", required: true },
    { id: "panCardBase64", label: "PAN Card", required: true },
    { id: "policeVerifBase64", label: "Police Verification", required: true },
    { id: "experienceProofBase64", label: "Driving Experience Proof", required: true },
  ],
  "Nurse": [
    { id: "nursingDegreeBase64", label: "Nursing Degree", required: true },
    { id: "nursingRegCertBase64", label: "Nursing Registration Certificate", required: true },
    { id: "aadhaarBase64", label: "Aadhaar Card", required: true },
    { id: "policeVerifBase64", label: "Police Verification", required: true },
  ],
  "Physiotherapist": [
    { id: "physioDegreBase64", label: "Physiotherapy Degree", required: true },
    { id: "physioRegCertBase64", label: "Registration Certificate", required: true },
    { id: "experienceProofBase64", label: "Experience Proof", required: true },
    { id: "aadhaarBase64", label: "Aadhaar Card", required: true },
  ],
  "Elderly Care Attendant": [
    { id: "aadhaarBase64", label: "Identity Proof (Aadhaar)", required: true },
    { id: "policeVerifBase64", label: "Police Verification", required: true },
    { id: "experienceProofBase64", label: "Experience Certificate", required: true },
  ],
  "Security Guard": [
    { id: "policeVerifBase64", label: "Police Verification", required: true },
    { id: "criminalBgCheckBase64", label: "Criminal Background Check", required: true },
    { id: "aadhaarBase64", label: "Identity Document (Aadhaar)", required: true },
    { id: "panCardBase64", label: "PAN Card", required: false },
  ],
  "Hospital Attendant": [
    { id: "aadhaarBase64", label: "Aadhaar Card", required: true },
    { id: "policeVerifBase64", label: "Police Verification", required: true },
    { id: "experienceProofBase64", label: "Experience Certificate", required: true },
    { id: "professionalCertBase64", label: "Professional Certification", required: false },
  ],
  "Default": [
    { id: "aadhaarBase64", label: "Aadhaar Card", required: true },
    { id: "panCardBase64", label: "PAN Card", required: true },
    { id: "policeVerifBase64", label: "Police Verification", required: true },
  ],
};

// Helper to get document requirements based on selected services
export function getDocRequirements(selectedServices: string[]): DocRequirement[] {
  const seen = new Set<string>();
  const docs: DocRequirement[] = [];

  for (const service of selectedServices) {
    // Map service names to role keys
    let roleKey = "Default";
    const sLower = service.toLowerCase();
    if (sLower.includes("driver")) roleKey = "Women Driver";
    else if (sLower.includes("nursing") || sLower.includes("iv support") || sLower.includes("injection")) roleKey = "Nurse";
    else if (sLower.includes("physio")) roleKey = "Physiotherapist";
    else if (sLower.includes("elderly") || sLower.includes("recovery")) roleKey = "Elderly Care Attendant";
    else if (sLower.includes("security") || sLower.includes("guard")) roleKey = "Security Guard";
    else if (sLower.includes("hospital")) roleKey = "Hospital Attendant";

    const requirements = ROLE_DOCUMENT_REQUIREMENTS[roleKey] || ROLE_DOCUMENT_REQUIREMENTS["Default"];
    for (const doc of requirements) {
      if (!seen.has(doc.id)) {
        seen.add(doc.id);
        docs.push(doc);
      }
    }
  }

  // If no specific services selected, return default
  if (docs.length === 0) {
    return ROLE_DOCUMENT_REQUIREMENTS["Default"];
  }

  return docs;
}

// ─── BACKGROUND VERIFICATION CHECKLIST ────────────────────────────────────────
export const BGV_CHECKLIST_ITEMS = [
  { key: "bgvAadhaarVerified", label: "Aadhaar Verification" },
  { key: "bgvPanVerified", label: "PAN Verification" },
  { key: "bgvPoliceVerified", label: "Police Verification" },
  { key: "bgvCriminalBgCheck", label: "Criminal Background Check" },
  { key: "bgvNeighbourhoodEnquiry", label: "Neighbourhood Enquiry" },
  { key: "bgvAddressVerified", label: "Address Verification" },
  { key: "bgvEmploymentHistoryChecked", label: "Employment History Check" },
  { key: "bgvReferencesVerified", label: "Three Professional References" },
  { key: "bgvExperienceVerified", label: "Experience Verification" },
];

// ─── ONBOARDING STEPS (8-step flow) ──────────────────────────────────────────
export const ONBOARDING_STEPS = [
  { step: 1, label: "Personal Details", description: "Basic personal information" },
  { step: 2, label: "Professional Details", description: "Experience and qualifications" },
  { step: 3, label: "Service Selection", description: "Choose your service areas" },
  { step: 4, label: "Document Upload", description: "Upload required documents" },
  { step: 5, label: "Background Verification", description: "Identity and background checks" },
  { step: 6, label: "Admin Review", description: "Application under review" },
  { step: 7, label: "Approval", description: "Approval decision" },
  { step: 8, label: "Account Activation", description: "Your account is active" },
];

// ─── REGISTRATION STATUS STEPS ────────────────────────────────────────────────
export const REGISTRATION_STATUS_STEPS = [
  "Registration Submitted",
  "Documents Uploaded",
  "Background Verification",
  "Admin Review",
  "Approved",
  "Account Activated",
];

// ─── PARTNER CATEGORIES ───────────────────────────────────────────────────────
export const PARTNER_CATEGORIES = [
  { name: "Women NGOs", description: "Non-governmental organisations promoting women welfare and empowerment", iconName: "Heart" },
  { name: "Women Self Help Groups", description: "Community-based microfinance and skill development groups", iconName: "Users" },
  { name: "Nursing Colleges", description: "Accredited nursing education institutions for trained healthcare professionals", iconName: "GraduationCap" },
  { name: "Physiotherapy Colleges", description: "Educational institutions offering physiotherapy and rehabilitation courses", iconName: "GraduationCap" },
  { name: "Driver Training Institutes", description: "Professional driving schools with women-focused programs", iconName: "Car" },
  { name: "Government Skill Centres", description: "Government-sponsored vocational training and skill development centres", iconName: "Building" },
  { name: "Women Development Organisations", description: "Organizations focused on women's economic and social development", iconName: "Award" },
];

// ─── ATTENDANT SERVICE CATEGORIES FOR REGISTRATION ────────────────────────────
export const ATTENDANT_SERVICE_OPTIONS = [
  { label: "Women Driver", icon: "🚗" },
  { label: "Hospital Attendant", icon: "🏥" },
  { label: "Elderly Care", icon: "👵" },
  { label: "Nursing Care", icon: "💉" },
  { label: "Post-Natal Care", icon: "👶" },
  { label: "Recovery Care", icon: "🩺" },
  { label: "Physiotherapy Support", icon: "🦴" },
  { label: "IV Support", icon: "💧" },
  { label: "Home Tailoring", icon: "✂️" },
  { label: "Domestic Support", icon: "🏠" },
  { label: "Women Electrician", icon: "🔌" },
  { label: "Women Plumber", icon: "🔧" },
  { label: "Women Carpenter", icon: "🪚" },
  { label: "Appliance Assistance", icon: "⚙️" },
  { label: "Security Guard", icon: "🛡️" },
  { label: "Hostel Security", icon: "🏢" },
  { label: "Event Security", icon: "🎪" },
  { label: "Airport Pickup", icon: "✈️" },
  { label: "Railway Pickup", icon: "🚆" },
  { label: "Travel Companion", icon: "🧳" },
  { label: "Event Manager", icon: "🎤" },
  { label: "Child Care", icon: "👧" },
  { label: "Babysitting", icon: "🍼" },
  { label: "Nanny Services", icon: "👩‍👧" },
];
