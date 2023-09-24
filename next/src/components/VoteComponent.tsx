"use client";

import { IconButton } from "@mui/material";
import { FC } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { HiArrowDownLeft } from "react-icons/hi2";
interface IProps {
  loading: boolean; // prevent the user from clicking vote buttons while processing one vote request
  value: number; // number of upvotes/downvotes
  caption: string;
  userStatus: boolean | null; // represents the reaction that the user has taken, true -> thumbsup, false -> thumbsdown, null -> no reaction yet
  onClick: () => void; // handles vote button clicks
}

const Vote: FC<IProps> = (props) => {
  const { caption, value, loading, userStatus, onClick } = props;

  return loading ? (
    <button
      className={`mb-[15px] flex h-[45px] cursor-not-allowed items-center justify-center rounded-[5px] border-[1px] ${
        caption === "Upvote" ? "border-up" : "border-down"
      }`}
      disabled
    >
      <svg
        className="h-5 w-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </button>
  ) : (
    <button
      className={`flex items-stretch justify-center rounded-[5px] border-[1px] md:items-center ${
        caption === "Upvote" ? "border-up" : "border-down"
      } ${
        userStatus === true && caption === "Upvote"
          ? "bg-green-500/20"
          : userStatus === false && caption === "Downvote"
          ? "bg-red-500/20"
          : ""
      } mb-[15px] h-[45px] font-open-sans font-bold`}
      onClick={onClick}
    >
      <div className="mb-[7px] ml-[13px] mr-[7px] mt-[11px]">
        {caption === "Upvote" ? (
          <HiArrowUpRight size={20} className="text-up" />
        ) : (
          <HiArrowDownLeft size={20} className="text-down" />
        )}
      </div>
      <span
        className={`w-full ${
          caption === "Upvote" ? "text-up" : "text-down"
        } my-auto text-[14px]`}
      >
        {caption}
      </span>
      <div
        className={`h-full w-[60px] py-[13px] pl-[17px] pr-4 text-[14px] ${
          caption === "Upvote" ? "bg-up" : "bg-down"
        }`}
      >
        {value}
      </div>
    </button>
  );
};

export default Vote;
