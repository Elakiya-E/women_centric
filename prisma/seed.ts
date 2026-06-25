import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { FULL_SERVICE_CATALOG } from "../src/lib/serviceData";

async function main() {
  console.log("Seeding started...");

  // Clean existing data to ensure idempotent seeding
  await prisma.sessionLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.attendantAccount.deleteMany();
  await prisma.attendantLocation.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.attendant.deleteMany();
  await prisma.subService.deleteMany();
  await prisma.serviceAvailability.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.service.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.article.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.partnerEnquiry.deleteMany();
  await prisma.attendantRegistration.deleteMany();

  // 1. Services
  console.log("Seeding services from serviceData...");
  for (const s of FULL_SERVICE_CATALOG) {
    await prisma.service.create({
      data: {
        title: s.title,
        slug: s.slug,
        description: s.description,
        startingPrice: s.startingPrice,
        rating: s.rating,
        badge: s.badge,
        iconName: s.iconName,
        gradient: s.gradient,
        categorySlug: s.categorySlug,
        isPremium: s.isPremium || false,
        subServices: {
          create: s.subServices.map(sub => ({
            title: sub.title,
            description: sub.description || "",
            price: sub.price || "",
          })),
        },
        availability: {
          create: {
            cities: s.availableCities,
          },
        },
      },
    });
  }

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
