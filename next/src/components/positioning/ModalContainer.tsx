import { createPortal } from "react-dom";
interface Props {
    children: React.ReactNode
}
const modalRoot = document.getElementById('modal-root');
/**
 * This component wraps the modal component, and allows for it to be centered on screen. The modal component should be a child of this component
 * @param param0 
 * @returns 
 */
const ModalContainer: React.FC<Props> = ({children}) => {
    if(modalRoot)
        return createPortal(
            <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex bg-[#00000055]">
                {children}
            </div>, 
            modalRoot
        );
    
    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex bg-[#00000055]">
            {children}
        </div>
    )
}

export default ModalContainer