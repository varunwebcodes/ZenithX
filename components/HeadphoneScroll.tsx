"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export default function HeadphoneScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });


  // Draw to canvas
  const renderFrame = React.useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Scale for containment
    const scale = Math.min(
      canvasWidth / img.naturalWidth,
      canvasHeight / img.naturalHeight
    );

    // Center alignment
    const x = canvasWidth / 2 - (img.naturalWidth / 2) * scale;
    const y = canvasHeight / 2 - (img.naturalHeight / 2) * scale;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }, [images]);

  // Handle resize and canvas dimensions
  const updateCanvasSize = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    // Initial render
    const latest = scrollYProgress.get();
    const frameIndex = Math.max(0, Math.min(
      images.length - 1,
      Math.floor(latest * (images.length - 1))
    ));
    if (images.length > 0) {
        requestAnimationFrame(() => renderFrame(frameIndex));
    }
  }, [images.length, scrollYProgress, renderFrame]);

  // Handle images loading
  useEffect(() => {
    let mounted = true;
    const loadImages = async () => {
      const frameCount = 240;
      const loadedImages: HTMLImageElement[] = new Array(frameCount);
      
      // Load first 10 immediately to show something
      const initialBatch = 10;
      for (let i = 1; i <= initialBatch; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(3, "0");
        img.src = `/frames/ezgif-frame-${frameIndex}.jpg`;
        await new Promise(r => { img.onload = r; img.onerror = r; });
        loadedImages[i-1] = img;
      }
      
      if (mounted) {
        setImages([...loadedImages.filter(Boolean)]);
      }

      // Load the rest in batches
      const batchSize = 20;
      for (let i = initialBatch + 1; i <= frameCount; i += batchSize) {
        if (!mounted) return;
        const promises = [];
        for (let j = 0; j < batchSize && (i + j) <= frameCount; j++) {
          const idx = i + j;
          const img = new Image();
          img.src = `/frames/ezgif-frame-${idx.toString().padStart(3, "0")}.jpg`;
          promises.push(new Promise(r => { img.onload = r; img.onerror = r; }));
          loadedImages[idx-1] = img;
        }
        await Promise.all(promises);
        if (mounted && i % 40 === 11) {
            setImages([...loadedImages.filter(Boolean)]);
        }
      }
      
      if (mounted) {
        setImages([...loadedImages.filter(Boolean)]);
        setIsLoaded(true);
      }
    };

    loadImages();
    return () => { mounted = false; };
  }, []);

  // Draw to canvas
  // Sync scroll to frame
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    // Initial render
    updateCanvasSize();
    renderFrame(0);

    const unsubscribe = scrollYProgress.on("change", (latest: number) => {
      const frameIndex = Math.max(0, Math.min(
        images.length - 1,
        Math.floor(latest * (images.length - 1))
      ));
      requestAnimationFrame(() => renderFrame(frameIndex));
    });

    window.addEventListener("resize", updateCanvasSize);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [scrollYProgress, isLoaded, images.length, renderFrame, updateCanvasSize]);

  // Text Opacities
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <div ref={containerRef} className="h-[400vh] relative bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain block"
          style={{ width: "100%", height: "100%" }}
        />

        {!isLoaded && (
             <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-50">
                 <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
             </div>
        )}

        {/* Text Overlays - Pointer events none to allow scrolling through */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-10">
          {/* 0% - Center */}
          <motion.div
            style={{ opacity: opacity1 }}
            className="absolute text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white/90 tracking-tighter">
              Zenith X
            </h1>
            <p className="text-xl md:text-2xl text-white/60 mt-4 tracking-tight">
              Pure Sound.
            </p>
          </motion.div>

          {/* 30% - Left */}
          <motion.div
            style={{ opacity: opacity2 }}
            className="absolute left-10 md:left-32 top-1/2 -translate-y-1/2 max-w-lg"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white/90 tracking-tight">
              Precision Engineering.
            </h2>
            <p className="text-lg text-white/60 mt-4">
              Every component meticulously crafted for audio perfection.
            </p>
          </motion.div>

          {/* 60% - Right */}
          <motion.div
            style={{ opacity: opacity3 }}
            className="absolute right-10 md:right-32 top-1/2 -translate-y-1/2 text-right max-w-lg"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white/90 tracking-tight">
              Titanium Drivers.
            </h2>
            <p className="text-lg text-white/60 mt-4">
              Unmatched clarity across all frequencies.
            </p>
          </motion.div>

          {/* 90% - Center CTA */}
          <motion.div
            style={{ opacity: opacity4 }}
            className="absolute bottom-20 text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white/90 tracking-tighter mb-8">
              Hear Everything.
            </h2>
            <a href="#collection" className="pointer-events-auto bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors inline-block decoration-none">
              Pre-order Now
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
