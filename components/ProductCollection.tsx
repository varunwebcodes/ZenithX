"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Zenith Wireless",
    price: "$299",
    image: "/images/zenith-wireless.png",
    description: "Cloud-like comfort with zero cables.",
    features: ["40h Battery", "USB-C Fast Charge", "Haptic Controls"]
  },
  {
    id: 2,
    name: "Zenith Studio",
    price: "$499",
    image: "/images/zenith-studio.png",
    description: "Pure sound for professionals.",
    features: ["Carbon Fiber Build", "Gold-Plated Jack", "Extended Range"]
  },
  {
    id: 3,
    name: "Zenith ANC",
    price: "$349",
    image: "/images/zenith-wireless.png", // Reusing image with color filters or just as variety
    description: "Silence the world with active ANC.",
    features: ["Active Noise Cancellation", "Transparency Mode", "Adaptive EQ"]
  }
];

export default function ProductCollection() {
  return (
    <section id="collection" className="py-24 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-blue-500 font-medium tracking-widest uppercase text-sm"
          >
            The Collection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl font-bold mt-4 tracking-tight"
          >
            Choose Your <span className="text-white/50">Sound.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="glass-card rounded-[2rem] p-8 flex flex-col items-center text-center overflow-hidden relative group"
            >
              <div className="relative w-full aspect-square mb-8 transition-transform duration-500 group-hover:scale-110">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="mt-auto">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-white/60 mb-6 max-w-[250px] mx-auto text-sm">
                  {product.description}
                </p>
                <div className="text-3xl font-bold mb-8">{product.price}</div>
                
                <button className="w-full bg-white text-black py-4 rounded-full font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2 group/btn">
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
