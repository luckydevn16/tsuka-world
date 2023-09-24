"use client";

import { getConnectedAddress } from "@/lib/client/wallet";
import { Vote as VoteEnum } from "@/types";
import React, { FC, useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { HiArrowDownLeft } from "react-icons/hi2";
import { useAccount } from "wagmi";
interface IProps {
  value: number;
  caption: string;
  usersVote: VoteEnum;
  setUsersVote: React.Dispatch<React.SetStateAction<VoteEnum>>; // sets the user's vote
  numUpvotes: number; // number of upvotes
  numDownvotes: number; // number of downvotes
  setNumUpvotes: React.Dispatch<React.SetStateAction<number>>; // sets the number of upvotes
  setNumDownvotes: React.Dispatch<React.SetStateAction<number>>; // sets the number of downvotes
  setUserVoteChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const Vote: FC<IProps> = (props) => {
  const {
    caption,
    value,
    usersVote,
    setUsersVote,
    numUpvotes,
    setNumUpvotes,
    numDownvotes,
    setNumDownvotes,
    setUserVoteChanged
  } = props;

  const account = useAccount()

  return (
    <button
      className={`flex items-stretch justify-center rounded-[5px] border-[1px] md:items-center ${
        caption === "Upvote" ? "border-up" : "border-down"
      } ${
        usersVote == VoteEnum.UPVOTE && caption === "Upvote"
          ? "bg-green-500/20"
          : usersVote == VoteEnum.DOWNVOTE && caption === "Downvote"
          ? "bg-red-500/20"
          : ""
      } ${
        caption == "Upvote" ? "hover:bg-green-500/20" : "hover:bg-red-500/20"
      } mb-[15px] h-[45px] font-open-sans font-bold transition-all`}
      onClick={async () => {
        const walletAddress = account?.address ?? ""
        if (!walletAddress) return;
        if (usersVote == VoteEnum.UPVOTE) {
          if (caption == "Upvote") {
            setNumUpvotes(numUpvotes - 1);
            setUsersVote(VoteEnum.NO_VOTE);
          }

          if (caption == "Downvote") {
            setNumDownvotes(numDownvotes + 1);
            setNumUpvotes(numUpvotes - 1);
            setUsersVote(VoteEnum.DOWNVOTE);
          }
        }
        if (usersVote == VoteEnum.DOWNVOTE) {
          if (caption == "Upvote") {
            setNumUpvotes(numUpvotes + 1);
            setNumDownvotes(numDownvotes - 1);
            setUsersVote(VoteEnum.UPVOTE);
          }

          if (caption == "Downvote") {
            setNumDownvotes(numDownvotes - 1);
            setUsersVote(VoteEnum.NO_VOTE);
          }
        }
        if (usersVote == VoteEnum.NO_VOTE) {
          if (caption == "Upvote") {
            setNumUpvotes(numUpvotes + 1);
            setUsersVote(VoteEnum.UPVOTE);
          }

          if (caption == "Downvote") {
            setNumDownvotes(numDownvotes + 1);
            setUsersVote(VoteEnum.DOWNVOTE);
          }
        }

        setUserVoteChanged(true)
      }}
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
        {caption === "Upvote" ? numUpvotes : numDownvotes}
      </div>
    </button>
  );
};

export default Vote;
