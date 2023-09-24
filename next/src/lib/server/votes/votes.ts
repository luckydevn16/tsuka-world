import { ProjectScore } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

const SCALE = 5;

/**
 * Adds an upvote to the provided project from the provided user
 * @param supabase 
 * @param projectId 
 * @param walletAddress 
 */
export async function addUpvote(supabase: SupabaseClient, projectId: number, walletAddress: string) {
    const existingScore = await getProjectScore(supabase, projectId)
    console.log("Existing score:")
    console.log(existingScore)
    let newScore = 0
  
    if (existingScore) {
      newScore = calculateScore(existingScore.upvotes + 1, existingScore.downvotes, SCALE)
      await supabase.from("project_score")
                    .update({
                      upvotes: existingScore.upvotes + 1,
                      score: newScore
                    })
                    .eq("project_id", projectId)
    } else {
      newScore = 5
      await supabase.from("project_score")
                    .insert({
                      project_id: projectId,
                      upvotes: 1,
                      downvotes: 0,
                      score: 5
                    })
    }
  
    await supabase.from("user_votes").insert({
      is_upvote: true,
      project_id: projectId,
      wallet_address: walletAddress,
    });

    console.log("New score: " + newScore)
    const res2 = await supabase.from("project_data").update({
      rating: newScore
    })
    .eq("project_id", projectId)
    console.log(res2)
}
  
  /**
   * Removes an upvote from the provided user and project
   * @param supabase 
   * @param projectId 
   * @param walletAddress 
   */
export async function removeUpvote(supabase: SupabaseClient, projectId: number, walletAddress: string) {
    const existingScore = await getProjectScore(supabase, projectId)
    let newScore = 0
  
    if(existingScore) {
      await removeVote(supabase, projectId, walletAddress)
      newScore = calculateScore(existingScore.upvotes - 1, existingScore.downvotes, SCALE)
      const res = await supabase.from("project_score")
                    .update({
                      upvotes: existingScore.upvotes - 1,
                      score: newScore
                    })
                    .eq("project_id", projectId)
                    console.log(res)
    }
  
    await supabase.from("user_votes")
            .delete()
            .eq("project_id", projectId)
            .eq("wallet_address", walletAddress);

    await supabase.from("project_data").update({
      rating: newScore
    })
    .eq("project_id", projectId)
}
  
  /**
   * Adds a downvote to the provided project from the provided user
   * @param supabase 
   * @param projectId 
   * @param walletAddress 
   */
export async function addDownvote(supabase: SupabaseClient, projectId: number, walletAddress: string) {
    const existingScore = await getProjectScore(supabase, projectId)
    let newScore = 0
  
    if (existingScore) {
      console.log("Project has already been scored")
      newScore = calculateScore(existingScore.upvotes, existingScore.downvotes + 1, SCALE)
      await supabase.from("project_score")
                    .update({
                      downvotes: existingScore.downvotes + 1,
                      score: newScore
                    })
                    .eq("project_id", projectId)
    } else {
      console.log("Project has not yet been scored")
      const res = await supabase.from("project_score")
                    .insert({
                      project_id: projectId,
                      upvotes: 0,
                      downvotes: 1,
                      score: 0
                    })
        console.log(res)
    }
  
    await supabase.from("user_votes").insert({
      is_upvote: false,
      project_id: projectId,
      wallet_address: walletAddress,
    });

    await supabase.from("project_data").update({
      rating: newScore
    })
    .eq("project_id", projectId)
}
  
  /**
   * Removes a downvote from the provided user and project
   * @param supabase 
   * @param projectId 
   * @param walletAddress 
   */
export async function removeDownvote(supabase: SupabaseClient, projectId: number, walletAddress: string) {
    const existingScore = await getProjectScore(supabase, projectId)
    console.log("Existing score:")
    console.log(existingScore)
    let newScore = 0

    await removeVote(supabase, projectId, walletAddress)
  
    if(existingScore) {
      newScore = calculateScore(existingScore.upvotes, existingScore.downvotes - 1, SCALE)
      await supabase.from("project_score")
                    .update({
                      downvotes: existingScore.downvotes - 1,
                      score: newScore
                    })
                    .eq("project_id", projectId)
    }
    
    await supabase.from("project_data").update({
      rating: newScore
    })
    .eq("project_id", projectId)
}
  
  /**
   * Removes an upvote from the provided user and project
   * @param supabase 
   * @param projectId 
   * @param walletAddress 
   */
export async function removeVote(supabase: SupabaseClient, projectId: number, walletAddress: string) {
    await supabase.from("user_votes")
                  .delete()
                  .eq("project_id", projectId)
                  .eq("wallet_address", walletAddress);
}
  
  /**
   * Fetches a projects score from the project_score table in supabase. If no entry is found, null is returned
   * @param supabase 
   * @param projectId 
   * @returns 
   */
export async function getProjectScore(supabase: SupabaseClient, projectId: number): Promise<ProjectScore | null> {
    const { data: existingScore } = await supabase.from("project_score")
                                                  .select("*")
                                                  .eq("project_id", projectId)
  
    if(!existingScore || existingScore?.length == 0) return null //Return null if the project doesn't have a score yet
  
    return existingScore[0] as ProjectScore
}
  
  /**
   * Normalizes the number of upvotes & downvotes to be a number that ranges from 0-scale
   * @param upvotes 
   * @param downvotes 
   * @param scale
   * @returns 
   */
export function calculateScore(upvotes: number, downvotes: number, scale: number): number {
    const totalVotes = upvotes + downvotes;
    const fractionUpvoted = (upvotes / totalVotes);

    return Math.round(fractionUpvoted * scale)
}