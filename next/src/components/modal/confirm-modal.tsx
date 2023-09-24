"use client";

import Modal from "./modal";
import ModalHeader from "./modal-header";
import Image from "next/image";

interface Props {
  showReportModal: boolean;
  setShowReportModal: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: ()=>void,
  onCancel: ()=>void
  url: string;
}

/**
 * A modal that allows the user to report a project
 * @param showReportModal When true the modal is visible
 * @param setShowReportModal A function to set the visibility of the modal
 * @param projectId The id of the project to be reported
 * @param reportCategories The categories of reports that can be submitted
 */
const ConfirmModal: React.FC<Props> = ({
  showReportModal,
  setShowReportModal,
  onConfirm,
  onCancel,
  url,
}) => {
  if (showReportModal) {
    return (
      <Modal>
        <div className="h-full flex flex-col justify-end">
          <div className="w-full flex justify-center items-center py-4">
            <Image
              className="mx-auto"
              src={url}
              width={500}
              height={300}
              alt="url"
            />
          </div>
          <div className="mx-auto mt-[10px] flex flex-row gap-3 text-white">
            <button
              className="w-25 font-Opensans h-10 rounded-lg bg-[#181818] px-7 py-2 font-semibold transition-all hover:scale-105"
              onClick={(e) => {onCancel();}}
            >
              Cancel
            </button>
            <button
              className="w-25 font-Opensans h-10 rounded-lg bg-[#40BF6A] px-7 py-2 font-semibold transition-all hover:scale-105"
              onClick={(e) => {onConfirm();}}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    );
  } else {
    return <div className="invisible"></div>;
  }
};

export default ConfirmModal;
