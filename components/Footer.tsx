"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Zenith X</h2>
            <p className="text-white/40 max-w-sm mb-8">
              Pioneering the future of audio technology. Join our mission to bring pure, unfiltered sound to every ear.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'YouTube'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-white/60 rounded-sm" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 uppercase tracking-widest text-sm text-white/30">Shop</h3>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Zenith Wireless</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Zenith Studio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Zenith ANC</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 uppercase tracking-widest text-sm text-white/30">Support</h3>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Order Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4 text-sm text-white/30">
          <p>© 2026 Zenith X Audio Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
