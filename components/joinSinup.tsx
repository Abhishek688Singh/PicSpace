"use client";

import React, { useState } from "react";
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { div } from "motion/react-m";
import { signIn } from "next-auth/react";
import axios from "axios";



type SessionType = {
    sessionDetail: {
        user: {
            id: string;
            email: string;
            name: string;
        };
    };
};

export function JoinWorkspace({ sessionDetail }: SessionType) {

    const [formDetail, setFormDetail] = useState({
        workspaceId: "",
        enterInvite_code: "",
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
            const result = await axios.post("/api/joinWorkspace", {
                workspaceId: formDetail.workspaceId,
                enterInvite_code: formDetail.enterInvite_code,
                name: sessionDetail.user.name,
                friend_id: sessionDetail.user.id,

            });

            if (result.status === 201) {
                window.location.href = `/join-workspace/${formDetail.workspaceId}/`; // ❗ Use window.location in client components (not `redirect`)
            }
        } catch (err) {
            console.log(err);
            alert(`Error joining Pic-Space (Invite code or id is not invalid): ${err}`);
        }
    }



    return (
        <div className="bg-[#0f0f0f] h-[100vh] flex flex-row items-center">
            <div style={{ border: "3px solid white" }} className="mx-auto w-full max-w-md rounded-xl bg-[#0f0f0f] p-6 md:p-8  shadow-lg" >
                <h2 className="text-2xl font-bold text-white">Welcome to Aceternity</h2>
                <p className="mt-2 text-sm text-gray-400">
                    Login to aceternity if you can because we don't have a login flow yet
                </p>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <LabelInputContainer>
                            <Label htmlFor="id" className="text-white text-sm">Enter Pic-Space ID</Label>
                            <Input
                                onChange={handleChange}
                                id="workspaceId"
                                placeholder="<---- ID ---->"
                                className="bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700"
                            />
                        </LabelInputContainer>

                    </div>

                    <LabelInputContainer>
                        <Label htmlFor="text" className="text-white text-sm">Invite Code</Label>
                        <Input
                            onChange={handleChange}
                            id="enterInvite_code"
                            type="text"
                            placeholder="••••••••"
                            className="bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700"
                        />
                    </LabelInputContainer>





                    <button
                        type="submit"
                        className="w-full h-10 bg-white text-black font-medium rounded-md transition hover:opacity-90"
                    >
                        Join Pic-Space →
                    </button>




                </form>
            </div></div>
    );
}


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
