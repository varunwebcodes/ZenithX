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

  // Load images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const frameCount = 240; // Based on actual file count

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(3, "0");
        img.src = `/frames/ezgif-frame-${frameIndex}.jpg`;
        await new Promise((resolve) => {
          img.onload = () => resolve(null);
          // Continue even if error to prevent hanging, but log it
          img.onerror = () => {
            console.error(`Failed to load frame ${i}`);
            resolve(null);
          };
        });
        loadedImages.push(img);
      }
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  // Draw to canvas
  const renderFrame = React.useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    // Scale for containment
    const scale = Math.min(
      canvas.width / img.width,
      canvas.height / img.height
    );

    // Center alignment
    const x = canvas.width / 2 - (img.width / 2) * scale;
    const y = canvas.height / 2 - (img.height / 2) * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Optional: Fill background to ensure seamless edge if image has bg
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, [images]);

  // Sync scroll to frame
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest: number) => {
      if (!isLoaded || images.length === 0) return;
      const frameIndex = Math.max(0, Math.min(
        images.length - 1,
        Math.floor(latest * (images.length - 1))
      ));
      requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Initial render
    if (isLoaded && images.length > 0) {
      renderFrame(0);
    }

    return () => unsubscribe();
  }, [scrollYProgress, isLoaded, images, renderFrame]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded && images.length > 0) {
        // Re-render current frame
        const latest = scrollYProgress.get();
        const frameIndex = Math.min(
          images.length - 1,
          Math.floor(latest * (images.length - 1))
        );
        renderFrame(frameIndex);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images, scrollYProgress, renderFrame]);

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
