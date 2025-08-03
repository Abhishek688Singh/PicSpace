"use client";

import React, { ReactEventHandler, useState } from "react";
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { div } from "motion/react-m";
import { signIn } from "next-auth/react";
import axios from "axios";
import { redirect } from "next/navigation"
import { Result } from "pg";


export default function NewWorkspace() {
    const [formDetail, setFormDetail] = useState({
        name: "",
        invite_code: "",
        description: "",
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = event.target;
        setFormDetail((prevValue) => ({
            ...prevValue,
            [id]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formDetail);
        try {
            const result = await axios.post("/api/action", {
                name: formDetail.name,
                invite_code: formDetail.invite_code,
                description: formDetail.description,
            });

            if (result.status === 201) {
                window.location.href = "/dashbord"; // ❗ Use window.location in client components (not `redirect`)
            }
        } catch (err) {
            console.log(err);
            alert(`Error creating Pic-Space (Invite code is not available): ${err}`);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center  px-4 py-12">
            <div className="max-w-4xl w-full bg-gray-800 rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* Left Side: Form */}
                <div className="p-10 flex flex-col justify-center">
                    {/* Logo */}
                    <div className="mb-6">
                        <svg className="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0C6 3 4 6 4 10s2 7 6 10c4-3 6-6 6-10s-2-7-6-10z" />
                        </svg>
                    </div>

                    {/* Header */}
                    <h2 className="text-2xl font-bold text-white mb-2">Create New Pic-Space</h2>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                Name of Pic-Space <br /><span className="text-[10px]">This name will be visible to everyone in your space.</span>
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="name"
                                required
                                value={formDetail.name}
                                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 border-gray-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="invite_code" className="block text-sm font-medium text-gray-300">
                                Create Invite Code for Pic-Space : <br /><span className="text-[10px]">All team members will join your space through this invite code.</span>
                            </label>
                            <input
                                onChange={handleChange}
                                value={formDetail.invite_code}
                                type="text"
                                id="invite_code"
                                required
                                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 border-gray-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="Description" className="block text-sm font-medium text-gray-300">
                                Description
                            </label>
                            <input
                                onChange={handleChange}
                                value={formDetail.description}
                                type="Description"
                                id="description"
                                required
                                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 border-gray-600"
                            />
                        </div>
                        {/* <div className="flex items-center justify-between text-sm text-gray-400">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-indigo-500 bg-gray-800 border-gray-600" />
                                Remember me
                            </label>
                            <a href="#" className="text-indigo-400 hover:underline">Forgot password?</a>
                        </div> */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md
                             hover:bg-indigo-700 font-medium"
                        >
                            Create
                        </button>
                    </form>

                    {/* Divider */}
                    {/* <div className="my-6 flex items-center">
                        <div className="flex-grow h-px bg-gray-600" />
                        <span className="mx-4 text-sm text-gray-400">or continue with</span>
                        <div className="flex-grow h-px bg-gray-600" />
                    </div> */}

                    {/* Social Buttons */}
                    <div className="flex gap-4">

                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="hidden md:block">
                    <img
                        src="https://picsum.photos/536/354" // Replace with your actual image path
                        alt="Login Visual"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}