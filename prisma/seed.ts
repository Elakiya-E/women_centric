import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // Clean existing data to ensure idempotent seeding
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.attendant.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.article.deleteMany();
  await prisma.testimonial.deleteMany();

  // 1. Services
  const airport = await prisma.service.create({
    data: {
      title: "Airport Pickup & Drop",
      description: "Safe, trusted female companions to assist you or your loved ones to/from the airport, helping with luggage and transport.",
      startingPrice: "₹999",
      rating: 4.9,
      badge: "Popular",
      iconName: "Plane",
      gradient: "from-[#FF9E7D] to-[#E07A5F]",
    },
  });

  const railway = await prisma.service.create({
    data: {
      title: "Railway Pickup & Drop",
      description: "Dedicated female companions meeting passengers right at the platform. Ensuring secure transfers to their final destination.",
      startingPrice: "₹799",
      rating: 4.8,
      badge: "Trending",
      iconName: "Train",
      gradient: "from-[#E07A5F] to-[#C97A8E]",
    },
  });

  const nursing = await prisma.service.create({
    data: {
      title: "Nursing Care At Home",
      description: "Qualified, empathetic female medical assistants and nurses for critical health monitoring and recovery care.",
      startingPrice: "₹1,499/day",
      rating: 4.9,
      badge: "Popular",
      iconName: "HeartPulse",
      gradient: "from-[#E2B380] to-[#C68B59]",
    },
  });

  const security = await prisma.service.create({
    data: {
      title: "Women Security Guards",
      description: "Highly trained, alert female security professionals for private functions, corporate events, or personal safety.",
      startingPrice: "₹1,999/day",
      rating: 5.0,
      badge: "Freshly Added",
      iconName: "ShieldAlert",
      gradient: "from-[#D87D56] to-[#B85C38]",
    },
  });

  const hospital = await prisma.service.create({
    data: {
      title: "Elderly Hospital Attendants",
      description: "Compassionate bedside assistance, medicine reminders, and companionship for elder family members in hospitals.",
      startingPrice: "₹1,299/day",
      rating: 4.9,
      badge: "Popular",
      iconName: "Award",
      gradient: "from-[#A9AF90] to-[#828A6B]",
    },
  });

  const driver = await prisma.service.create({
    data: {
      title: "Women Drivers",
      description: "Experienced, verified professional female drivers for daily city runs, errands, or outstation family trips.",
      startingPrice: "₹1,199/day",
      rating: 4.8,
      badge: "Trending",
      iconName: "Car",
      gradient: "from-[#EBC75A] to-[#C09A34]",
    },
  });

  console.log("Services seeded!");

  // 2. Attendants
  await prisma.attendant.createMany({
    data: [
      {
        name: "Sunitha Krishnan",
        role: "Senior Elderly Care Specialist",
        experience: "6+ Years Experience",
        languages: ["Tamil", "English", "Malayalam"],
        rating: 4.9,
        certifications: ["First Aid Certified", "Geriatric Care Dip."],
        bgGradient: "from-pink-100 to-purple-100",
      },
      {
        name: "Meera Nair",
        role: "Professional Driver & Companion",
        experience: "4 Years Experience",
        languages: ["Tamil", "Kannada", "English"],
        rating: 4.8,
        certifications: ["Defensive Driving Cert", "Safe Attendant Certified"],
        bgGradient: "from-blue-100 to-indigo-100",
      },
      {
        name: "Preeti Patil",
        role: "Home Nursing Assistant",
        experience: "5 Years Experience",
        languages: ["Telugu", "Hindi", "English"],
        rating: 5.0,
        certifications: ["General Nursing Certified", "BLS Certified"],
        bgGradient: "from-purple-100 to-purple-200",
      },
    ],
  });

  console.log("Attendants seeded!");

  // 3. Offers
  await prisma.offer.createMany({
    data: [
      {
        title: "Care & Comfort Bundle",
        desc: "Combine Nursing Care + Elderly Hospital Attendant for comprehensive protection.",
        discount: "15% OFF",
        code: "CARECOMBO15",
        bgGradient: "from-purple-600 to-indigo-700",
        active: true,
      },
      {
        title: "Safe Traveler Combo",
        desc: "Book Airport Pickup + Dedicated Driver for seamless transit around the city.",
        discount: "10% OFF",
        code: "TRAVELSAFE10",
        bgGradient: "from-pink-600 to-rose-700",
        active: true,
      },
    ],
  });

  console.log("Offers seeded!");

  // 4. Articles (Knowledge Hub)
  await prisma.article.createMany({
    data: [
      {
        title: "Understanding Safety Rights & Travel Mandates for Women",
        category: "Women Safety",
        desc: "Key legal frameworks, digital tracking apps, and transit safety protocols everyone should know when travelling alone.",
        readTime: "4 min read",
      },
      {
        title: "Senior Citizen Support Schemes & Pension Benefits in India",
        category: "Government Schemes",
        desc: "A comprehensive handbook detailing national health insurance, subsidies, and security schemes for elderly citizens.",
        readTime: "6 min read",
      },
      {
        title: "Crucial Health Monitoring Metrics for Elder Care at Home",
        category: "Health Awareness",
        desc: "A simple guide to tracking vitals, blood pressure trends, and symptoms requiring immediate professional attention.",
        readTime: "5 min read",
      },
      {
        title: "Tips for Creating an Elderly-Safe and Fall-Proof Household",
        category: "Senior Citizen Care",
        desc: "Practical adjustments to lighting, flooring, and grab bars to prevent domestic slips and ensure senior independence.",
        readTime: "3 min read",
      },
    ],
  });

  console.log("Knowledge Hub seeded!");

  // 5. Testimonials
  await prisma.testimonial.createMany({
    data: [
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
    ],
  });

  console.log("Testimonials seeded!");
  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
