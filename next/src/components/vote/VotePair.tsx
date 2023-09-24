"use client";

import Vote from "./VoteComponent";
import { ApiResponse, ProjectVotes, Vote as VoteEnum } from "@/types";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getConnectedAddress } from "@/lib/client/wallet";
import { useAccount } from 'wagmi'

interface Props {
  projectVotes: ProjectVotes;
  projectId: number;
}

const VotePair: React.FC<Props> = ({ projectVotes, projectId }) => {
  const [userVote, setUserVote] = useState<VoteEnum>(
    projectVotes?.user_status
  );
  const [userVoteChanged, setUserVoteChanged] = useState<boolean>(false); //Flag that lets us know when to update the users vote
  const [numUpvotes, setNumUpvotes] = useState<number>(
    projectVotes?.upvotes ?? 0
  );
  const [numDownvotes, setNumDownvotes] = useState<number>(
    projectVotes?.downvotes ?? 0
  );

  const account = useAccount()

  console.log(projectVotes)

  const handleVoteChange = async () => {
    const walletAddress = account?.address
    if (!walletAddress) {
      toast.error("Please connect your wallet.");
      return;
    }
    console.log("userVote: " + userVote)
    console.log("New vote: " + VoteEnum[userVote])
    const result = (
      await axios.post("/api/submit-vote", {
        projectId: projectId,
        vote: userVote,
        walletAddress,
      })
    ).data as ApiResponse;
  };

  useEffect(() => {
    setUserVote(projectVotes?.user_status ?? null);
    setNumUpvotes(projectVotes?.upvotes ?? 0);
    setNumDownvotes(projectVotes?.downvotes ?? 0);
  }, [projectVotes]);

  useEffect(() =>{
    if(userVoteChanged) handleVoteChange()
    setUserVoteChanged(false)
  }, [userVote, userVoteChanged])

  return (
    <>
      <Vote
        value={projectVotes?.upvotes ?? -1}
        usersVote={userVote}
        setUsersVote={setUserVote}
        numUpvotes={numUpvotes}
        setNumUpvotes={setNumUpvotes}
        numDownvotes={numDownvotes}
        setNumDownvotes={setNumDownvotes}
        setUserVoteChanged={setUserVoteChanged}
        caption="Upvote"
      />
      <Vote
        value={projectVotes?.downvotes ?? -1}
        usersVote={userVote}
        setUsersVote={setUserVote}
        numUpvotes={numUpvotes}
        setNumUpvotes={setNumUpvotes}
        numDownvotes={numDownvotes}
        setNumDownvotes={setNumDownvotes}
        setUserVoteChanged={setUserVoteChanged}
        caption="Downvote"
      />
    </>
  );
};

export default VotePair;
