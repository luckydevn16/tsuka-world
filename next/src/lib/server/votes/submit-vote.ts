import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/lib/database.types";

import { createServiceRoleClient } from "@/utils/supabase-server";
import { addDownvote, addUpvote, removeDownvote, removeUpvote } from "./votes";
import { Vote } from "@/types";

export type TypedSupabaseClient = SupabaseClient<Database>;

export default async function submitVote(
  projectId: number,
  walletAddress: string,
  vote: Vote
) {
  const supabase = createServiceRoleClient();
  console.log("\nNew vote: " + Vote[vote])

  try {
    const { data: userVote } = await supabase
      .from("user_votes")
      .select("*")
      .eq("project_id", projectId)
      .eq("wallet_address", walletAddress)
      .single();

    let userVoteEnum = Vote.NO_VOTE;
    if(userVote?.is_upvote === true) userVoteEnum = Vote.UPVOTE;
    if(userVote?.is_upvote === false && userVote?.is_upvote !== null) userVoteEnum = Vote.DOWNVOTE;
    console.log("userVote: " + userVote)
    console.log("Existing vote: " + Vote[userVoteEnum])

    //Record users vote
    if(userVoteEnum == Vote.NO_VOTE) { //If the user hasn't already voted on this project
      console.log("User has not already placed a vote on this project")
      if(vote == Vote.UPVOTE) { //If the users pending vote is an upvote
        console.log("Users pending vote is an upvote")
        await addUpvote(supabase, projectId, walletAddress)
      } 
      else if(vote == Vote.DOWNVOTE) { //If the users pending vote is a downvote
        console.log("Users pending vote is a downvote")
        await addDownvote(supabase, projectId, walletAddress)
      }
    } else { //If the user has already voted on this project
      console.log("User has already placed a vote on this project")
      console.log(`Existing Vote: ${Vote[userVoteEnum]}, New Vote: ${Vote[vote]}`)
      if(userVoteEnum === Vote.UPVOTE && vote == Vote.DOWNVOTE) { //If the user is changing their vote from an upvote to a downvote
        console.log("User is changing their vote from an upvote to a downvote")
        await removeUpvote(supabase, projectId, walletAddress)
        await addDownvote(supabase, projectId, walletAddress)
      }
      else if(userVoteEnum === Vote.DOWNVOTE && vote == Vote.UPVOTE) { //If the user is changing their vote from a downvote to an upvote
        console.log("User is changing their vote from a downvote to an upvote")
        await removeDownvote(supabase, projectId, walletAddress)
        await addUpvote(supabase, projectId, walletAddress)
      }
      else if(userVoteEnum == Vote.UPVOTE && vote == Vote.NO_VOTE) { //If the user is removing their upvote
        console.log("User is removing their upvote")
        await removeUpvote(supabase, projectId, walletAddress)
      }
      else if(userVoteEnum == Vote.DOWNVOTE && vote == Vote.NO_VOTE) { //If the user is removing their downvote
        console.log("User is removing their downvote")
        await removeDownvote(supabase, projectId, walletAddress)
      }
    }
    return {
      success: true,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      success: false,
    };
  }
}