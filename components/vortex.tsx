"use client";

import React from "react";
import { Vortex } from "./ui/vortex";
import LandingPage from "./Landing";

export function VortexDemoSecond() {
  return (
    <div className="w-[calc(100%)] mx-auto">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="md:px-10  py-4 w-full h-full"
      >
        <LandingPage />
      </Vortex>
    </div>
  );
}
