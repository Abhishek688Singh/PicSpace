"use client"

import { useState } from "react";
import { SelectDemo } from "./roleSelect";
import axios from "axios";
import { Session } from "inspector/promises";

export default function CreateNewUser({ wSpaceId }: { wSpaceId: string }) {

  const [formDetail, setFormDetail] = useState({
    name: "",
    role: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFormDetail((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
    // console.log(formDetail);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    console.log(formDetail);
    try {
      const result = await axios.post("/api/createMember", {
        name: formDetail.name,
        role : formDetail.role,
        workspaceId : wSpaceId 
      });

      if (result.status === 201) {
        window.location.href = `/dashbord/${wSpaceId}`; // ❗ Use window.location in client components (not `redirect`)
      }
    } catch (err) {
      console.log(err);
      alert(`Error adding member: ${err}`);
    }
  }



  function handleRoleChange(value: string) {
    setFormDetail((prevValue) => ({

      ...prevValue,
      role: value

    }));
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
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
          <h2 className="text-2xl font-bold text-white mb-2">Add Member to your Pic-Space</h2>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Member name
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="name"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 border-gray-600"
              />
            </div>
            <div>
              <SelectDemo getClicked={handleRoleChange} />
            </div>
            {/* <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 border-gray-600"
              />
            </div> */}
            {/* <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 border-gray-600"
              />
            </div> */}

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 font-medium"
            >
              Add Member
            </button>
          </form>


          {/* Social Buttons */}
          {/* <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-600 py-2 px-4 rounded-md hover:bg-gray-700 text-white">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
          </div> */}
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
