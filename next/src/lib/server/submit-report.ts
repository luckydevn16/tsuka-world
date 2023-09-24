import { createServiceRoleClient } from "@/utils/supabase-server";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * A server-side function for submitting a report. Returns nothing if successful, otherwise returns an error message.
 * @param walletAddress The reporting userrs wallet address
 * @param reason The reason (report category) for the report
 * @param description The description of the report
 * @param projectId The ID of the project being reported
 * @returns 
 */
async function submitReport(walletAddress: string, reason: string, description: string, projectId: number): Promise<undefined | null | PostgrestError> {
  try {
    const supabase = createServiceRoleClient()
    const {data, error} = await supabase.from("reports").insert({
      reporter_wallet_address: walletAddress,
      category: reason,
      complaint: description,
      project_id: projectId
    })
    if(error) {
      throw error
    }
    return
  } catch (error: any) {
    return error.message
  }
}

export default submitReport