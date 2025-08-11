// components/CameraLoader.tsx
"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const CameraLoader = () => {
  const controls = useAnimation();

  useEffect(() => {
    const loopRotation = async () => {
      while (true) {
        await controls.start({
          rotate: 360,
          transition: { duration: 3, ease: "easeInOut" }, // slow spin
        });
        await controls.start({
          rotate: 720,
          transition: { duration: 1.5, ease: "easeInOut" }, // fast spin
        });
        controls.set({ rotate: 0 }); // reset instantly for loop
      }
    };
    loopRotation();
  }, [controls]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 z-[9999]">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="white"
        strokeWidth="2"
        viewBox="0 0 24 24"
        className="w-16 h-16 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        animate={controls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8h4l2-3h6l2 3h4v12H3V8z"
        />
        <circle cx="12" cy="14" r="4" />
      </motion.svg>

      <motion.span
        className="mt-4 text-gray-200 text-sm tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.8,
        }}
      >
        Loading
      </motion.span>
    </div>
  );
};

export default CameraLoader;
