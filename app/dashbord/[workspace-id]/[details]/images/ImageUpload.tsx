"use client"


import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import axios from 'axios'


const Images = ({ workspaceId, memberFriendId }: { workspaceId: string, memberFriendId: string }) => {
  return (

    <>
      {/* BUTTON FOR UPLOAD IMAGE */}
      <section>
        <CldUploadWidget signatureEndpoint="/api/imag"
          options={{
            resourceType: "image", // Cloudinary accepts only images
            // clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
            // maxFileSize: 5 * 1024 * 1024, // optional: max 5MB
            // multiple: false // optional: allow single image upload
          }}
          onSuccess={async (results) => {
            const public_id: { public_id: string } = results?.info?.public_id;
            try {
              const result = await axios.post("/api/imageInDB", {
                public_id: public_id,
                workspaceId: workspaceId,
                memberFriendId: memberFriendId
              }
                // console.log(`${result}`)
              )
              if (result.data.status === 201) { alert("Image Uploaded Sucessfully.") }
              window.location.reload();
            } catch (err) {
              console.log(err),
                alert("Error image db save fail !!")
            }

          }
          }
        >


          {({ open }) => {
            return (
              <button
                className="bg-gradient-to-br mb-[50] from-gray-800 to-black text-white px-6 py-2 rounded-lg border border-gray-500 shadow-md hover:scale-105 transform transition-all duration-200 hover:shadow-blue-500/50"
                onClick={() => open()}
              >
                Upload an Image
              </button>
            )
          }}
        </CldUploadWidget>
      </section >
    </>
  )
}

export default Images;