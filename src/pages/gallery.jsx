import { Footer } from "@/widgets/layout/footer";
import { Typography } from "@material-tailwind/react/components/Typography";
import axios from "axios";
import React, { useState, useEffect } from "react";

export function Gallery() {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get("https://businessboosters.club/public/api/getGallery");
                if (response.data && response.data.gallery) {
                    setGallery(response.data.gallery);
                }
            } catch (error) {
                console.error("Error fetching gallery:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    const openImage = (index) => {
        setCurrentIndex(index);
        setSelectedImage(gallery[index].large_image);
    };

    const nextImage = () => {
        const newIndex = (currentIndex + 1) % gallery.length;
        setCurrentIndex(newIndex);
        setSelectedImage(gallery[newIndex].large_image);
    };

    const prevImage = () => {
        const newIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        setCurrentIndex(newIndex);
        setSelectedImage(gallery[newIndex].large_image);
    };

    // Skeleton loader that matches gallery structure
    const GallerySkeleton = () => {
        // Create an array of 8 placeholders
        return Array(8).fill(0).map((_, index) => (
            <div key={index} className="w-full h-60 rounded-lg shadow-md bg-gray-200 animate-pulse">
                <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 0 486.1 0 456.1L0 456.1z" />
                    </svg>
                </div>
            </div>
        ));
    };

    return (
        <>
           
                  <section className="relative block h-[25vh]  bg-white mt-16 md:mt-16">
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
                      <Typography
                        variant="h1"
                        color="gray"
                        className="text-center font-bold text-5xl mb-4"
                      >
                       Gallery
                      </Typography>
                      <Typography
                        variant="lead"
                        color="gray"
                        className="text-xl text-center font-light max-w-2xl"
                      >
                        A mentor is an individual with expertise who can help develop the career of a mentee. Meet our Mentors.
                      </Typography>
                    </div>
                  </section>

            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading ? (
                    <GallerySkeleton />
                ) : (
                    gallery.map((item, index) => (
                        <img
                            key={index}
                            src={`https://businessboosters.club/public/images/gallery/${item.small_image}`}
                            alt={item.gallery_occasion}
                            className="w-full h-60 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => openImage(index)}
                        />
                    ))
                )}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setSelectedImage(null)}>×</button>
                    <button className="absolute left-4 text-white text-3xl" onClick={prevImage}>❮</button>
                    <img
                        src={`https://businessboosters.club/public/images/gallery/${selectedImage}`}
                        className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
                        alt="Selected"
                    />
                    <button className="absolute right-4 text-white text-3xl" onClick={nextImage}>❯</button>
                </div>
            )}

            <div className="bg-white mt-8">
                <Footer />
            </div>
        </>
    );
}

export default Gallery;
