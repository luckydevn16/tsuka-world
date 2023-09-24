"use client";

import * as React from "react";
import ReactCardCarousel from "react-card-carousel";

import { project_content, project_image } from "@/lib/database.types";

import Carousel from "@/components/Carousel";
import Description from "@/components/DescriptionComponent";

const Cards = (arr: project_image[]) =>
  arr.map((img) => (
    <img
      key={`img-${img.id}`}
      src={`${img.url}`}
      className="w-[25rem] rounded-md"
      alt="project image"
    />
  ));

type Props = {
  images: project_image[];
  projectContent: project_content | null;
};
export default function ProjectSection({ images, projectContent }: Props) {
  return (
    <div className="flex w-[70%] flex-col  border-r-[1px] border-line pb-[50px] pr-[100px] descriptionmobile:w-full descriptionmobile:border-r-0 descriptionmobile:pr-0">
      {/* Carousel in each Mode*/}
      <div>
        <div className="relative top-[150px] block descriptionmobile:hidden ">
          <ReactCardCarousel
            autoPlay={true}
            autoplay_speed={1000}
            offsetRadius={30}
            spread="wide"
            length={10}
          >
            {Cards(images)}
          </ReactCardCarousel>
        </div>
        <div className="px-[50px] py-[25px] descriptionpc:hidden">
          <Carousel images={images} />
        </div>
      </div>
      {/* Description */}
      <span className="font-hylia text-[24px] text-gold descriptionpc:mt-[330px]">
        DESCRIPTION
      </span>
      <div className="">
        <Description description={projectContent?.description || ""} />
      </div>
    </div>
  );
}
