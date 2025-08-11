"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Folder,
    UserPlus,
    Settings,
    Image as ImageIcon
} from "lucide-react";

const FloatingIcon = ({ children, delay = 0 }) => (
    <motion.div
        animate={{
            y: [0, -8, 0],
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
        }}
    >
        {children}
    </motion.div>
);

const LandingPage = () => {
    const featureItems = [
        { icon: <Folder size={28} />, label: "Private Workspaces" },
        { icon: <UserPlus size={28} />, label: "Invite-Only Access" },
        { icon: <Settings size={28} />, label: "Admin Control" },
        { icon: <ImageIcon size={28} />, label: "Separate Images & Ideas" },
    ];

    const exampleItems = [
        {
            img: "travel.png",
            label: "Travel Photos",
        },
        {
            img: "team.png",
            label: "Team Design Ideas",
        },
        {
            img: "family.png",
            label: "Family Album",
        },
    ];


    // Parallax scroll values
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 300], [0, 60]);
    const midLayerY = useTransform(scrollY, [0, 400], [0, -40]);
    const backLayerY = useTransform(scrollY, [0, 500], [0, -80]);

    return (
        <div
            className="relative font-sans text-gray-200 min-h-screen overflow-hidden"
            style={{
                backgroundImage: "url('/your-background-image.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Layered depth border boxes */}
            <motion.div
                style={{ y: backLayerY }}
                className="absolute inset-0 pointer-events-none"
            >
                {/* Faint far background layer */}
                <div className="absolute top-20 left-10 w-40 h-40 border-2 border-white opacity-20 rounded-lg" />
                <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-white opacity-20 rounded-lg" />
            </motion.div>

            <motion.div
                style={{ y: midLayerY }}
                className="absolute inset-0 pointer-events-none"
            >
                {/* Mid-layer white boxes */}
                <div className="absolute top-40 right-40 w-48 h-48 border-2 border-white opacity-30 rounded-lg" />
                <div className="absolute bottom-40 left-40 w-36 h-36 border-2 border-white opacity-30 rounded-lg" />
            </motion.div>

            {/* Hero Section */}
            <motion.section
                style={{ y: heroY }}
                className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20"
            >
                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="w-[500px] h-[500px] bg-blue-500/20 blur-[200px] rounded-full absolute top-0 left-0" />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-lg z-10"
                >
                    <h1 className="text-3xl md:text-5xl font-bold leading-snug mb-6 text-white">
                        Private workspaces to share photos, ideas, and memories — only with
                        who you choose
                    </h1>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { window.location.href = "/dashbord" }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
                    >
                        Start Your First Workspace
                    </motion.button>
                </motion.div>

                <motion.div
                    style={{ y: midLayerY }}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-8 md:mt-0 z-10"
                >
                    <div className="w-72 h-48 border-2 border-white flex items-center justify-center rounded-lg bg-black/60">
                        <div className="w-72 h-48 mt-[30] border-2 border-white flex items-center justify-center rounded-lg bg-black/60 shadow-[0_0_30px_rgba(0,150,255,0.5)]">
                            <motion.div
                                whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <span className="text-gray-300 mt-[10]"><img src="logo.png" alt="Workspace Preview" className="rounded-lg" />
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            {/* Features Section */}
            <section className="px-6 md:px-16 py-16">
                <h2 className="text-center text-xl font-semibold mb-12 text-white">
                    What you can do with PicSpace
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {featureItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="border-2 border-white rounded-lg p-6 flex flex-col items-center justify-center text-center font-medium bg-black/60 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 transition"
                        >
                            <FloatingIcon delay={idx * 0.3}>
                                <div className="mb-3 text-blue-400">{item.icon}</div>
                            </FloatingIcon>
                            {item.label}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Content Examples */}
            <section className="px-6 md:px-16 py-16 bg-black/70">
                <h2 className="text-center text-xl font-semibold mb-12 text-white">
                    See real content examples
                </h2>
                <div className="flex flex-col md:flex-row gap-8 justify-center">
                    {exampleItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="relative w-80 h-60 right-[10] overflow-hidden rounded-lg border-2 border-white bg-black/60 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 transition"
                        >
                            {/* Background image */}
                            <img
                                src={item.img}
                                alt={item.label}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40" />

                            {/* Content */}
                            <div className="relative flex flex-col items-center justify-center h-full text-center text-white font-medium">
                                {/* Optional floating icon */}
                                {/* <FloatingIcon delay={idx * 0.3}>
          <div className="mb-2 text-blue-400">{item.icon}</div>
        </FloatingIcon> */}

                                {item.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </section>

            {/* Testimonials */}
            <section className="px-6 md:px-16 py-16">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-xl font-semibold mb-4 text-white"
                >
                    What people are saying
                </motion.h2>
                <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center italic text-lg text-gray-300"
                >
                    “I’ve been using PicSpace since its very first day, and even in just a few days,
                    it already feels like an essential tool for our team. Sharing ideas and memories
                    has never been this smooth — it’s a total game-changer for collaboration!”
                </motion.blockquote>
                <p className="text-center mt-4 font-semibold text-gray-400">
                    — Ashish Kanaujiya
                    {/* <CheckCircleIcon className="w-5 h-5 text-blue-500" /> */}
                </p>
            </section>

            {/* Trust Section */}
            <section className="px-6 md:px-16 py-16 bg-black/80">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-xl font-semibold mb-4 text-white"
                >
                    Trust and Security
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto text-gray-300"
                >
                    Your data is encrypted and only visible to invited members. Privacy
                    and control are at the heart of PicSpace.
                </motion.p>
            </section>
        </div>
    );
};

export default LandingPage;
