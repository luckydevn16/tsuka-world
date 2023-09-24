import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/lib/database.types";

import { createServerClient } from "@/utils/supabase-server";

import { ProjectVotes, Vote } from "@/types";

export type TypedSupabaseClient = SupabaseClient<Database>;

export async function getProjectVotes(projectId: string, walletAddress: string): Promise<ProjectVotes> {
  const supabase = createServerClient();

  try {
    // console.log("params---->", params, "<----");

    const { data: votes } = await supabase.from("project_score").select("*").eq("project_id", projectId).single();
    const { data: userVote } = await supabase.from("user_votes").select("*").eq("project_id", projectId).eq("wallet_address", walletAddress).single();

    let user_status: Vote = Vote.NO_VOTE;
    if(userVote?.is_upvote === true) user_status = Vote.UPVOTE;
    if(userVote?.is_upvote === false && userVote?.is_upvote !== null) user_status = Vote.DOWNVOTE;

    return {
      upvotes: votes?.upvotes ?? 0,
      downvotes: votes?.downvotes ?? 0,
      rating: votes?.score ?? 5,
      user_status
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      upvotes: 0,
      downvotes: 0,
      rating: 5,
      user_status: Vote.NO_VOTE
    };
  }
}
