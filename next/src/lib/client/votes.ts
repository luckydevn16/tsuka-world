import { ProjectVotes } from "@/types";
import axios from "axios";

export async function getProjectVotes(projectId: number, walletAddress: string): Promise<ProjectVotes> {
    const {data} = await axios.get(`/api/get-project-votes/${projectId}/${walletAddress}`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          projectId,
          walletAddress,
        },
      })

    return data.data
}