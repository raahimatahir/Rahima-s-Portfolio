"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 75; // 0 to 74

const currentFrame = (index: number) => 
  `/sequence/frame_${String(index).padStart(2, '0')}_delay-0.067s.png`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to frame index (0 to FRAME_COUNT - 1)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        // If it's the first frame, draw it immediately to avoid empty canvas on load
        if (i === 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            drawImageCover(ctx, img, canvasRef.current.width, canvasRef.current.height);
          }
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle Resize for object-fit: cover logic
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Redraw current frame
      const currentIdx = Math.round(frameIndex.get());
      if (images[currentIdx]) {
        drawImageCover(ctx, images[currentIdx], canvas.width, canvas.height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  useEffect(() => {
    // Re-render on frame change
    const unsubscribe = frameIndex.on("change", (latest) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx || images.length === 0) return;

      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest)));
      const img = images[idx];
      
      if (img && img.complete) {
        drawImageCover(ctx, img, canvas.width, canvas.height);
      }
    });

    return () => unsubscribe();
  }, [frameIndex, images]);

  // Helper for object-fit: cover drawing on canvas
  const drawImageCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, width: number, height: number) => {
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;
    let renderWidth, renderHeight, x, y;

    if (canvasRatio > imgRatio) {
      renderWidth = width;
      renderHeight = width / imgRatio;
      x = 0;
      y = (height - renderHeight) / 2;
    } else {
      renderWidth = height * imgRatio;
      renderHeight = height;
      x = (width - renderWidth) / 2;
      y = 0;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, x, y, renderWidth, renderHeight);
  };

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        {/* We can place the overlay inside or outside, but usually better in a separate component layered on top */}
      </div>
    </div>
  );
}
