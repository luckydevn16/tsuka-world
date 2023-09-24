"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { project_image } from "@/lib/database.types";

/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param images - Array of images with src and alt attributes
 * @returns React component
 */
interface IProps {
  images: project_image[]; // image url
}
const Carousel: React.FC<IProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCurrentSlide(
        currentSlide === images.length - 1 ? 0 : currentSlide + 1
      );
    }, 5000);
  }, [currentSlide, images.length]);

  return (
    <div>
      <div className="relative h-auto w-full overflow-hidden">
        {images[0]?.url && (
          <Image
            key="currentimage"
            src={images[0].url as string}
            width={100}
            height={100}
            className="h-full w-full opacity-0"
            alt="carousel"
          />
        )}
        {images[currentSlide]?.url && (
          <Image
            key={currentSlide}
            src={images[currentSlide].url as string}
            width={100}
            height={100}
            className="absolute top-0 w-full animate-fade object-cover"
            alt="carousel"
          />
        )}
      </div>
      <div className="relative flex justify-center p-2">
        {images.map((_, index) => {
          return (
            <div
              className={
                index === currentSlide
                  ? "mx-2 mb-2 h-2 w-2 rounded-full bg-gray-700"
                  : "mx-2 mb-2 h-2 w-2 rounded-full bg-gray-300"
              }
              key={"carouseldot" + index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
