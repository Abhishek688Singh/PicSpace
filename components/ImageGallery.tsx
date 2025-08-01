"use client";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

import cloudinaryLoader from "@/lib/cloudinaryLoader";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import axios from "axios";


// Dynamically import the Lightbox (to avoid SSR issues)
// const Lightbox = dynamic(() => import("react-lightbox-component"), { ssr: false });

type ImageData = {
    public_id: string;
    content: string;
    created_at: string;
};

type Props = {
    images: ImageData[];
};

const ImageGallery = ({ images }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Build full Cloudinary URLs

    const [imageState, setImageState] = useState(images);


    // const imageList = images.map(({ public_id, content }) => ({
    //     src: `https://res.cloudinary.com/dbpqs51lc/image/upload/w_1200,q_auto,f_auto/${public_id}`,
    //     title: content,
    // }));

    const imageList = imageState.map(({ public_id, content }) => ({
        src: `https://res.cloudinary.com/dbpqs51lc/image/upload/w_1200,q_auto,f_auto/${public_id}`,
        title: content,
    }));


    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };


    return (
        <>

            {/* Grid of images */}
            <div className="grid cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {imageState.map(({ public_id, content, created_at }, idx) => (
                    <div
                        key={public_id}
                        className="rounded overflow-hidden shadow-md 
                         bg-black cursor-pointer border-1  border-amber-100 *
                         flex flex-col "
                        onClick={() => openLightbox(idx)}
                    >
                        <Image
                            loader={cloudinaryLoader}
                            src={public_id}
                            alt={`Uploaded image ${idx}`}
                            width={400}
                            height={300}
                            loading="lazy"
                            className="object-cover w-full !max-h-[300]"
                        />




                        <div className="p-2 border-t flex flex-row items-start justify-between gap-2 mt-auto">
                            <div>
                                <p className="text-sm text-gray-700">{content}</p>
                                <p className="text-xs text-white">
                                    Uploaded on {new Date(created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                {/* Delete button */}
                                <button
                                    className="relative bg-gradient-to-br from-gray-800 to-black text-white px-3 py-1 rounded-lg border border-gray-500 shadow-md hover:scale-105 transform transition-all duration-200 hover:shadow-red-500/50 text-sm z-10"
                                    onClick={async (e) => {
                                        e.stopPropagation(); // prevent triggering openLightbox

                                        const confirmed = window.confirm("Are you sure you want to delete this image?");
                                        if (!confirmed) return;

                                        console.log(`Delete image with public_id: ${public_id}`);

                                        try {
                                            const result = await axios.post("/api/deleteImage", {
                                                public_id: public_id,
                                            });

                                            console.log(result);
                                            if (result.data.status === 204 || result.status === 200) {
                                                alert("deleted sucessfully");
                                                setImageState((prev) => prev.filter((img) => img.public_id !== public_id));

                                                // window.location.reload();
                                            } else {
                                                console.log(result.data);
                                            }
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    }}
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    </div>
                ))}


            </div>



            {/* Lightbox */}
            {isOpen && (
                <div>

                    <Lightbox
                        plugins={[Captions, Zoom, Fullscreen, Thumbnails, Slideshow]}
                        zoom={{ maxZoomPixelRatio: 5, scrollToZoom: true, pinchZoom: true }}
                        thumbnails={{
                            border: 2,
                            width: 100,
                            height: 70,
                            vignette: false,
                        }}
                        open={isOpen}
                        close={() => setIsOpen(false)}
                        slides={imageState}
                        index={currentIndex}
                    />



                </div>

            )}
        </>
    );
};

export default ImageGallery;
