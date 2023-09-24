"use client";

import ModalContainer from "../positioning/ModalContainer";

interface Props {
  showEmailConfirmationModal: boolean;
  setShowEmailConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  // onConfirm: ()=>void,
  // onCancel: ()=>void,
}

/**
 * A modal that allows the user to report a project
 * @param showEmailConfirmationModal When true the modal is visible
 * @param setShowEmailConfirmationModal A function to set the visibility of the modal
 */
const EmailConfirmationModal: React.FC<Props> = ({
  showEmailConfirmationModal,
  setShowEmailConfirmationModal,
  // onConfirm,
  // onCancel,
}) => {

  if (showEmailConfirmationModal) {
    return (
      <ModalContainer>
        <div className="xtraLarge:w-[30vw] medium:w-[40vw] w-[90vw] py-5 medium:max-h-[80vh] rounded-xl bg-[#FFCE31]/40 z-50 backdrop-blur-lg m-auto flex flex-col">
          <h1 className="w-full text-center text-2xl">
            Email confirmation sent
          </h1>
          <p className="w-full text-center text-xs">We have sent a confirmation link to your email. Please confirm your email to continue.</p>
          <div className="mx-auto mt-[10px] flex flex-row gap-3 text-white">
            <button
              className="w-25 font-Opensans h-10 rounded-lg bg-[#DF2040] px-7 py-2 font-semibold transition-all hover:scale-105"
              onClick={e=>{setShowEmailConfirmationModal(false)}}
            >
              Ok
            </button>
          </div>
        </div>
      </ModalContainer>
    );
  } else {
    return <div className="invisible"></div>;
  }
};

export default EmailConfirmationModal;
