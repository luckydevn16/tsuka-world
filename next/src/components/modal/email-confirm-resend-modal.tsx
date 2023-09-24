"use client";

import ModalContainer from "../positioning/ModalContainer";

interface Props {
  isSending: boolean;
  showEmailConfirmationResendModal: boolean;
  setShowEmailConfirmationResendModal: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: ()=>void,
  // onCancel: ()=>void,
}

/**
 * A modal that allows the user to report a project
 * @param showEmailConfirmationResendModal When true the modal is visible
 * @param setShowEmailConfirmationResendModal A function to set the visibility of the modal
 */
const EmailConfirmationResendModal: React.FC<Props> = ({
  isSending,
  showEmailConfirmationResendModal,
  setShowEmailConfirmationResendModal,
  onConfirm,
  // onCancel,
}) => {

  if (showEmailConfirmationResendModal) {
    return (
      <ModalContainer>
        <div className="xtraLarge:w-[30vw] medium:w-[40vw] w-[90vw] py-5 medium:max-h-[80vh] rounded-xl bg-[#FFCE31]/40 z-50 backdrop-blur-lg m-auto flex flex-col">
          <h1 className="w-full text-center text-2xl">
            Email not confirmed
          </h1>
          <p className="w-full text-center text-xs">We have sent a confirmation link to your email. Please confirm to log in.</p>
          <div className="mx-auto mt-[10px] flex flex-row gap-3 text-white">
            <button
              className="w-25 font-Opensans h-10 rounded-lg bg-[#181818] px-7 py-2 font-semibold transition-all hover:scale-105"
              onClick={e=>{onConfirm()}}
              disabled = {isSending}
            >
              Resend
            </button>
            <button
              className="w-25 font-Opensans h-10 rounded-lg bg-[#DF2040] px-7 py-2 font-semibold transition-all hover:scale-105"
              onClick={e=>{setShowEmailConfirmationResendModal(false)}}
            >
              Close
            </button>
          </div>
        </div>
      </ModalContainer>
    );
  } else {
    return <div className="invisible"></div>;
  }
};

export default EmailConfirmationResendModal;
