'use client';

import { RadioGroupAlign } from "@/types/radio.types"
import RadioGroup from "../radio-button/radio-group"
import Modal from "./modal"
import ModalHeader from "./modal-header"
import LabeledTextArea from "../LabeledTextArea"
import Button from "./button"
import { useState } from "react";
import { submitReportAndHandleResult } from "@/lib/client/submit-report";

interface Props {
    showReportModal: boolean
    setShowReportModal: React.Dispatch<React.SetStateAction<boolean>>
    projectId: number
    reportCategories: Array<string>
}

/**
 * A modal that allows the user to report a project
 * @param showReportModal When true the modal is visible
 * @param setShowReportModal A function to set the visibility of the modal
 * @param projectId The id of the project to be reported
 * @param reportCategories The categories of reports that can be submitted 
 */
const ReportModal: React.FC<Props> = ({showReportModal, setShowReportModal, projectId, reportCategories}) => {
    const radioItems = reportCategories.map(a => {
        return {
            id: reportCategories.indexOf(a),
            label: a
        }
    })

    const [selectedReason, setSelectedReason] = useState<number>(radioItems[0].id)
    const [description, setDescription] = useState<string>("")
    const [processing, setProcessing] = useState<boolean>(false)

    async function submit() {
        submitReportAndHandleResult(
            setProcessing, 
            setShowReportModal, 
            radioItems.find(a => a.id == selectedReason)?.label ?? "", 
            description, 
            projectId
        )
    }

    if(showReportModal) {
        return (
            <Modal>
                <ModalHeader iconPath={"/icons/stop-icon.png"} iconAlt={"report"} text={"Report Project"} />
                <div className="flex flex-col w-full mt-10 text-center gap-5">
                    <RadioGroup 
                        radioItems={radioItems} 
                        align={RadioGroupAlign.HORIZONTAL} 
                        onChange={(selectedId)=>{setSelectedReason(selectedId)}}
                    />
                    <LabeledTextArea 
                        label={"Add a case description"} 
                        placeholder={"Add a description"} 
                        onChange={(e)=>{setDescription(e.target.value)}} 
                    />

                    <div className="flex flex-row gap-3 mx-auto">
                        <Button 
                            text="Cancel" 
                            backgroundColor="[#181818]" 
                            textColor="white"
                            onClick={()=>setShowReportModal(false)}
                            disabled={false}
                        />
                        <Button 
                            text="Submit" 
                            backgroundColor="[#DF2040]" 
                            textColor="white"
                            disabled={processing}
                            onClick={submit}
                        />
                    </div>
                </div>
            </Modal>
        )
    } else {
        return (
            <div className="invisible"></div>
        )
    }
}

export default ReportModal