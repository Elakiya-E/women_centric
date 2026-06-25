export interface CaseStudyDef {
  title: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export const CASE_STUDIES: Record<string, CaseStudyDef[]> = {
  "elderly-care": [
    {
      title: "24/7 Companion Care for Mrs. Raghavan",
      challenge: "82-year-old Mrs. Raghavan, living in Chennai, suffered from mild dementia and loneliness after her husband passed away. Her children live in the US and were anxious about her safety and daily nutrition.",
      solution: "WithYours matched her with Sunitha, a trained senior care attendant. Sunitha provided round-the-clock assistance, prepared nutritious meals, engaged her in mental stimulation exercises, and managed her medications.",
      outcome: "Mrs. Raghavan's cognitive engagement improved, and she gained 2kg of healthy weight. Her children received daily updates via the app, providing them complete peace of mind."
    },
    {
      title: "Post-Stroke Recovery Support for Mrs. Sen",
      challenge: "Mrs. Sen needed constant assistance and passive exercises to regain mobility after a minor stroke, while her daughter had to travel frequently for work.",
      solution: "A recovery care attendant was deployed to assist with daily transfers, personal hygiene, and companion support during physical therapy sessions.",
      outcome: "Mrs. Sen showed a 40% improvement in walking mobility within 6 weeks and was able to perform basic household tasks independently."
    },
    {
      title: "Companionship & Safety for Retired Professor",
      challenge: "An elderly retired academician in Bengaluru wanted to live independently but required supervision during night-time hours to prevent falls.",
      solution: "A night-care attendant was assigned to assist with evening routines, bathroom trips, and immediate emergency response.",
      outcome: "Zero incidents of falls over 6 months, and the professor continued living in his preferred home environment safely."
    }
  ],
  "hospital-attendants": [
    {
      title: "Bedside ICU Assistance for Mrs. Kapoor",
      challenge: "Mrs. Kapoor was admitted to a hospital in Bengaluru for a major cardiac surgery. Her family needed a reliable female attendant to stay overnight at the bedside, manage nursing coordination, and assist with post-op care.",
      solution: "WithYours assigned Meenakshi, an experienced hospital attendant. She monitored vitals, assisted in early mobilization, and provided emotional support during the critical post-op phase.",
      outcome: "The patient recovered smoothly with minimal anxiety. The hospital staff praised Meenakshi's professional coordination and adherence to hygiene protocols."
    },
    {
      title: "Post-Orthopedic Bedside Care for Teenager Ananya",
      challenge: "A 16-year-old girl underwent spinal surgery and needed an empathetic female caregiver for bathing and personal care during her 10-day ward stay.",
      solution: "A specialized female hospital attendant was assigned to provide respectful and sensitive bedside support.",
      outcome: "The patient felt comfortable and secure, allowing her parents to take scheduled rests without worrying about care quality."
    },
    {
      title: "Elderly Patient Support During COVID Recovery",
      challenge: "An 75-year-old lady needed non-medical bedside assistance in a Chennai hospital ward while recovering from pulmonary complications.",
      solution: "A trained hospital attendant equipped with PPE and infection-control training was deployed for 24/7 support.",
      outcome: "Successful recovery with no secondary infections. The family was relieved of the physical burden of hospital shifts."
    }
  ],
  "nursing-services": [
    {
      title: "Wound Management & Care for Diabetic Ulcer",
      challenge: "A senior citizen in Madurai had a persistent diabetic foot ulcer that required sterile dressing changes, insulin administration, and strict glucose monitoring twice daily.",
      solution: "A certified home nurse from WithYours was deployed for daily visits to perform sterile debridement, dress the wound, and coordinate with the endocrinologist.",
      outcome: "Complete healing of the ulcer was achieved in 8 weeks, avoiding potential surgical intervention or amputation."
    },
    {
      title: "In-home IV Antibiotic Therapy for Chronic Infection",
      challenge: "A patient recovering from a joint replacement developed an infection requiring 14 days of intravenous antibiotics, but wanted to avoid prolonged hospitalization.",
      solution: "A registered home care nurse visited twice daily to administer IV drugs, manage the PICC line, and monitor for adverse reactions.",
      outcome: "Successful completion of therapy at home with substantial cost savings compared to private room hospital stay."
    },
    {
      title: "Palliative Care Support for Oncology Patient",
      challenge: "A terminal stage oncology patient needed pain management, symptom control, and compassionate end-of-life care at home.",
      solution: "An experienced palliative care nurse was assigned to manage pain pumps, provide wound care, and offer counseling to the grieving family.",
      outcome: "The patient passed away peacefully, pain-free, surrounded by family, as per their wishes."
    }
  ],
  "long-distance-driver": [
    {
      title: "Interstate Drive for Solo Female Artist",
      challenge: "A solo female artist needed to travel from Bengaluru to Ooty with valuable paintings for an exhibition, but felt unsafe driving long distances on mountain roads alone.",
      solution: "WithYours provided Geetha, an expert outstation woman driver. She drove the client's SUV safely through the hairpin bends and assisted with luggage security.",
      outcome: "The client arrived refreshed and on time, with all artwork intact, expressing extreme confidence in the safe and comfortable travel experience."
    },
    {
      title: "Weekend Pilgrimage Drive for Elderly Couple",
      challenge: "An elderly couple in Chennai wanted to visit temples in Madurai but could not drive the 450 km highway route themselves.",
      solution: "A professional highway-certified woman driver was assigned to drive them, manage fuel stops, and assist with temple entry navigation.",
      outcome: "A smooth, stress-free 3-day pilgrimage journey. The couple appreciated the driver's respectful behavior and safe driving speeds."
    },
    {
      title: "Night Drive for Corporate Consultant",
      challenge: "A female management consultant needed to travel overnight from Coimbatore to Chennai for an early morning board meeting.",
      solution: "An experienced night-shift woman driver was assigned to ensure the client could sleep during the transit.",
      outcome: "The client arrived fully rested and prepared for her meeting, with 100% safety and absolute privacy during the journey."
    }
  ],
  "women-security-guards": [
    {
      title: "Residential Security for Women's Apartment Complex",
      challenge: "A women-only apartment complex in Chennai needed a specialized security team to manage visitor logs, patrol premises at night, and ensure absolute safety.",
      solution: "WithYours deployed a team of three verified female security guards working in shifts to provide round-the-clock surveillance.",
      outcome: "Zero unauthorized entries recorded over 12 months. Residents reported feeling highly secure and appreciated the guards' professional and polite demeanor."
    },
    {
      title: "Event Security for High-profile Art Exhibition",
      challenge: "An art gallery in Bengaluru hosting a female-centric exhibition wanted security personnel who were both vigilant and capable of polite guest interactions.",
      solution: "Four event security guards in corporate blazers were deployed for crowd control, bags checking, and VIP escorting.",
      outcome: "Flawless execution of the event with 500+ attendees. The gallery owner commended the guards' poise and security readiness."
    },
    {
      title: "Personal Safety Escort for Jewellery Shopping",
      challenge: "A lady purchasing wedding jewellery worth several lakhs needed personal protection while transporting the valuables from the showroom to her home.",
      solution: "An armed/trained female personal security guard was assigned to escort the client throughout the shopping day.",
      outcome: "Secure transit of valuables without any security breaches, giving the family peace of mind during a major celebration."
    }
  ]
};

export const DEFAULT_CASE_STUDIES: CaseStudyDef[] = [
  {
    title: "Seamless Support for Local Family",
    challenge: "A busy working household needed immediate, professional, and trustworthy assistance to handle daily tasks and care requirements.",
    solution: "WithYours assigned a certified female associate who took charge of the operations, coordinating schedules and providing high-quality care.",
    outcome: "The family restored their work-life balance and reported high satisfaction with the professionalism and security updates."
  },
  {
    title: "Emergency Care Assistance",
    challenge: "An unexpected medical recovery requirement left a family searching for immediate, short-term professional support.",
    solution: "On-demand dispatch of a verified companion who managed medications, safety protocols, and daily routines.",
    outcome: "Smooth recovery of the patient at home, avoiding readmission and reducing stress for the family."
  },
  {
    title: "Safe Highway Transit Escort",
    challenge: "A customer needed safe transit across cities with a reliable companion to ensure security and guide them through logistics.",
    solution: "A verified woman travel companion assisted with navigation, luggage, and emergency support throughout the journey.",
    outcome: "Safe, comfortable, and timely completion of the trip with absolute peace of mind."
  }
];

export function getCaseStudiesForService(slug: string): CaseStudyDef[] {
  return CASE_STUDIES[slug] || DEFAULT_CASE_STUDIES;
}
