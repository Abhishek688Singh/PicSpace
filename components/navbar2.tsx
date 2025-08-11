"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  const navItems = [
    { label: "Join Pic-Space", href: "/join" },
    { label: "Create Pic-Space", href: "/create" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40" />
          <span className="text-white text-lg font-bold tracking-wide">
            Pic-Space
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-white transition text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
