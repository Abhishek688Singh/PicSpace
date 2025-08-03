"use client";

import React from "react";
import { Vortex } from "./ui/vortex";

export function VortexDemoSecond() {
  return (
    <div className="w-[calc(100%)] mx-auto h-screen overflow-hidden">
      <Vortex
        backgroundColor="transparent"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h1 className="text-white text-4xl md:text-6xl font-bold pb-9 text-center">
          Pic-Space
        </h1>
        <h3 className="text-white text-2xl md:text-2xl font-bold text-center">
          Capture. Control. Collaborate.
        </h3>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          A private workspace for photographers to manage teams, upload images, and store creative briefs — each in its own dedicated space.
          Empower your studio with seamless content control, selective sharing, and the tools to stay organized, focused, and creatively free.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button
            onClick={() => { window.location.href = "/login" }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Login
          </button>
          <button onClick={() => { window.location.href = "/register" }}
            className="px-4 py-2  text-white ">Sign-Up</button>
        </div>
      </Vortex>
    </div>
  );
}
