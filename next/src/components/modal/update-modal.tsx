"use client";

import ModalContainer from "../positioning/ModalContainer";

interface Props {
  showUpdateModal: boolean;
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: ()=>void,
  onCancel: ()=>void,
}

/**
 * A modal that allows the user to report a project
 * @param showUpdateModal When true the modal is visible
 * @param setShowUpdateModal A function to set the visibility of the modal
 * @param projectId The id of the project to be reported
 * @param reportCategories The categories of reports that can be submitted
 */
const UpdateModal: React.FC<Props> = ({
  showUpdateModal,
  setShowUpdateModal,
  onConfirm,
  onCancel,
}) => {
  if (showUpdateModal) {
    return (
      <ModalContainer>
      <div className="xtraLarge:w-[30vw] medium:w-[40vw] w-[90vw] py-5 medium:max-h-[80vh] rounded-xl bg-[#FFCE31]/40 z-50 backdrop-blur-lg m-auto flex flex-col">
        <h1 className="w-full text-center text-2xl">
          Save changes?
        </h1>
        <div className="mx-auto mt-[10px] flex flex-row gap-3 text-white">
          <button
            className="w-25 font-Opensans h-10 rounded-lg bg-up text-black px-7 py-2 font-semibold transition-all hover:scale-105"
            onClick={e=>{onConfirm();}}
          >
            Confirm
          </button>
          <button
            className="w-25 font-Opensans h-10 rounded-lg bg-[#DF2040] px-7 py-2 font-semibold transition-all hover:scale-105"
            onClick={e=>{onCancel();}}
          >
            Cancel
          </button>
        </div>
      </div>
      </ModalContainer>
    );
  } else {
    return <div className="invisible"></div>;
  }
};

export default UpdateModal;
