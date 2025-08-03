"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react"

export function SignupFormDemo() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.id;
    setFormData((prevValue) => {
      return ({
        ...prevValue,
        [id]: e.target.value
      });
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
      // callbackUrl: "/dashboard"
    });

    if (res?.error) {
      // console.log(res)
      alert("Wrong email,password! or You are not registered or May be registered with Google "); // ✅ Show exact backend error
    } else if (res?.ok && !res.error) {
      window.location.href = "/dashbord"; // ⬅️ redirect manually
    }

  };

  return (
    <div className=" h-[100vh] flex flex-row items-center">
      <div style={{ border: "3px solid white" }} className="mx-auto w-full max-w-md rounded-xl bg-[#0f0f0f] p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white">Welcome to Pic-Space</h2>
        <p className="mt-2 text-sm text-gray-400">
          Log in to Pic-Space to manage your space and share your work privately.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 md:flex-row">
            {/* <LabelInputContainer>
              <Label htmlFor="firstname" className="text-white text-sm">User name</Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                className="bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700"
              />
            </LabelInputContainer> */}
            {/* <LabelInputContainer>
            <Label htmlFor="lastname" className="text-white text-sm">Last name</Label>
            <Input
              id="lastname"
              placeholder="Durden"
              className="bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700"
            />
          </LabelInputContainer> */}
          </div>

          <LabelInputContainer>
            <Label htmlFor="email" className="text-white text-sm">Email Address</Label>
            <Input
              onChange={handleChange}
              id="email"
              type="email"
              placeholder="asc@mail.com"
              className="bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password" className="text-white text-sm">Password</Label>
            <Input
              onChange={handleChange}
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700"
            />
          </LabelInputContainer>

          {/* <LabelInputContainer>
          <Label htmlFor="twitterpassword" className="text-white text-sm">Your twitter password</Label>
          <Input
            id="twitterpassword"
            placeholder="••••••••"
            type="password"
            className="bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700"
          />
        </LabelInputContainer> */}

          <button
            type="submit"
            className="w-full h-10 bg-white text-black font-medium rounded-md transition hover:opacity-90"
          >
            Login →
          </button>

          <div className="my-6 h-px bg-neutral-700" />

          <div className="flex flex-col space-y-3 items-center justify-center">
            {/* <SocialButton icon={<IconBrandGithub className="h-4 w-4" />} label="GitHub" /> */}
            <button
              type="button"
              onClick={() => signIn("google", { redirectTo: "/dashbord" })}
              className="w-full h-10 bg-white text-black font-medium rounded-md transition hover:opacity-90"
            >
              Sign In with Google →
            </button>
            {/* <SocialButton  icon={<IconBrandGoogle className="h-4 w-4 " />} label="Google" /> */}
            {/* <SocialButton icon={<IconBrandOnlyfans className="h-4 w-4" />} label="OnlyFans" /> */}
          </div>
        </form>
      </div></div>
  );
}

const SocialButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button
    type="button"
    className="flex items-center justify-start w-full h-10 px-4 rounded-md bg-neutral-800 text-white text-sm font-medium space-x-2 hover:bg-neutral-700 transition"
  >
    {icon}
    <span>{label}</span>
  </button>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-1 w-full", className)}>
    {children}
  </div>
);
