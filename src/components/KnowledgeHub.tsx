"use client";

import React, { useState } from "react";
import { BookOpen, ArrowUpRight, GraduationCap, Shield, HeartHandshake, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface Article {
  title: string;
  category: "Government Schemes" | "Women Safety" | "Senior Citizen Care" | "Health Awareness";
  desc: string;
  readTime: string;
}

const articles: Article[] = [
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
];

export default function KnowledgeHub() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Government Schemes", "Women Safety", "Senior Citizen Care", "Health Awareness"];

  const filteredArticles = activeCategory === "All" 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <section id="knowledge" className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-base text-primary font-bold tracking-wide uppercase">Knowledge Hub</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Education & Resources
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Articles, handbooks, and guides curated by safety experts and medical coordinators.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all border ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-purple-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredArticles.map((article, idx) => (
            <motion.div
              layout
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs bg-purple-50 text-primary font-bold px-3 py-1 rounded-full border border-purple-100">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">{article.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{article.desc}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <button
                  onClick={() => alert(`Opening article: ${article.title}`)}
                  className="flex items-center space-x-1.5 text-xs sm:text-sm text-primary hover:text-secondary font-bold transition-all"
                >
                  <Eye className="h-4 w-4" />
                  <span>Read Article</span>
                </button>
                <span className="text-gray-300">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
