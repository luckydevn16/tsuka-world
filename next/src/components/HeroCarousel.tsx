"use client";

import { useCallback, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/custom-swiper.css";

import { ProjectFeaturedType } from "@/actions/getFeaturedProjects";

import Card from "./Card";
/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param data - Array of data with src and alt attributes
 * @returns React component
 */

interface Props {
  data: ProjectFeaturedType[];
}
const Carousel: React.FC<Props> = ({ data }) => {
  const swiperRef = useRef<SwiperCore>();
  const [activeIndex, setactiveIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, [swiperRef]);
  return (
    <div className="relative flex justify-end xl:justify-start">
      <div className="mx-auto flex w-full max-w-fit flex-row items-center justify-center lg:mx-0 xl:justify-end">
        <button className="mr-4 mt-16 hidden md:block">
          <BsChevronLeft
            color="#FFCE31"
            onClick={handlePrevious}
            className="z-20 text-7xl disabled:opacity-70 "
          />
        </button>
        <div className="relative z-10 ml-auto mt-[100px] overflow-hidden md:mt-[170px] 2xl:mt-[170px]">
          <div className="relative m-auto flex flex-col">
            <div className="mask relative z-50 h-full w-full">
              <h3 className="hidden pb-2 text-center font-RussoOne text-[30px] leading-9 text-normal md:block">
                Featured Projects
              </h3>
              <Swiper
                modules={[Pagination]}
                className="mb-10 w-[300px] max-w-[90vw] sm:w-full md:mb-44 lg:max-w-[710px]"
                slidesPerView={2}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {data?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Card
                      key={index}
                      image={item.project_image[0]?.url || ""}
                      title={item.title || ""}
                      description={item.description || ""}
                      project_id={item.project_id || ""}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <button className="ml-4 mt-16 hidden md:block">
          <BsChevronRight
            color="#FFCE31"
            onClick={handleNext}
            className="z-20 text-7xl"
          />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
