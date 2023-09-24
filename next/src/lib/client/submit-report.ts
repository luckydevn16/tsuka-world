import { ApiResponse } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";
import { getConnectedAddress } from "./wallet";

interface SubmitReportResult {
    success: boolean
    message: any | null
}

/**
 * A client-side function for preforming a type-safe call to the submit-report API route and propogates any errors
 * @param walletAddress The reporting userrs wallet address
 * @param reason The reason (report category) for the report
 * @param description The description of the report
 * @param projectId The ID of the project being reported
 * @returns A SubmitReportResult
 */
async function submitReport(walletAddress: string, reason: string, description: string, projectId: number): Promise<SubmitReportResult> {
    try {
        const result = (await axios.post("/api/submit-report", {walletAddress, reason, description, projectId})).data as ApiResponse
        if(result.success) {
            return {
                success: true,
                message: null
            }
        } else {
            return {
                success: false,
                message: result.data.error
            }
        }
    } catch(e) {
        return {
            success: false,
            message: JSON.stringify(e)
        }
    }
}

/**
 * Acts as a wrapper around submitReport and handles any errors which may occur. Displays a toast to the user on success or failure.
 * @param setProcessing True while processing the api request. Disables the submit button to prevent double submission
 * @param setShowReportModal When true the report modal is shown
 * @param reason The reason (report category) for the report
 * @param description The description of the report
 * @param projectId The ID of the project being reported
 * @returns Nothing
 */
async function submitReportAndHandleResult(setProcessing: any, setShowReportModal: any, reason: string, description: string, projectId: number) {
    setProcessing(true)
    
    const walletAddress = await getConnectedAddress()
    if(!walletAddress) {
        toast.error("Please connect a web3 wallet to submit a report")
        setProcessing(false)
        return
    }
    
    if(!description || description == "" || description == " ") {
        toast.error("Please enter a description for your report!")
        setProcessing(false)
        return
    }

    const result = await submitReport(walletAddress, reason, description, projectId)
    if(result.success) {
        toast.success("Successfully submitted report!")
    } else {
        let error = ""
        if(result?.message?.message) {
            error = result.message.message
        } else {
            error = JSON.stringify(result.message)
            toast.error("An error occured while processing your request: " + error);
        }
    }
    setProcessing(false)
    setShowReportModal(false)
}

export {submitReport, submitReportAndHandleResult}