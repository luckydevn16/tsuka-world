import ModalContainer from "../positioning/ModalContainer"

interface Props {
    children: React.ReactNode
}

/**
 * A general component for a modal
 */
const Modal: React.FC<Props> = ({children}) => {
    return (
        <ModalContainer>
            <div className="xtraLarge:w-[30vw] medium:w-[40vw] w-[90vw] py-5 rounded-xl bg-[#FFCE31]/40 z-50 backdrop-blur-lg m-auto flex flex-col">
                {children}
            </div>
        </ModalContainer>
    )
}

export default Modal