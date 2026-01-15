"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Lossless Audio",
    desc: "Experience sound as if you were in the studio with 24-bit/192kHz support.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
  },
  {
    title: "Active Isolation",
    desc: "Proprietary ANC technology cancels up to 45dB of external noise.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
  },
  {
    title: "Fast Charge",
    desc: "Get 3 hours of listening time from a 5-minute charge.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  },
  {
    title: "Spatial Sound",
    desc: "Dynamic head tracking for a theater-like sound that surrounds you.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
  }
];

export default function Features() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-8">
            Advanced <br /> <span className="text-white/40">Technology.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-lg mb-12">
            We pushed the boundaries of acoustic engineering to create a sensory experience that feels as natural as it is immersive.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-blue-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="relative aspect-square">
          <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             transition={{ duration: 1 }}
             className="absolute inset-0 bg-linear-to-tr from-blue-600/20 to-purple-600/20 rounded-[4rem] blur-3xl"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-3/4 h-3/4 glass rounded-[3rem] relative shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full p-8">
                   <div className="h-1 w-12 bg-blue-500 rounded-full mb-2" />
                   <div className="text-xs font-mono text-white/30 uppercase tracking-widest">Acoustic Engine v2.0</div>
                </div>
                <div className="text-8xl font-bold text-white/5 pointer-events-none select-none">ZENITH</div>
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-48 h-48 rounded-full border border-blue-500/30 flex items-center justify-center"
                >
                  <div className="w-32 h-32 rounded-full border border-blue-500/20" />
                </motion.div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
