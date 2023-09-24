import Image from "next/image"

interface Props {
    iconPath: string,
    iconAlt: string,
    text: string
}

/**
 * A header for a modal. Displays an icon and text
 * @param iconPath The path to the icon
 * @param iconAlt The alt text for the icon
 * @param text The text to display next to the icon
 * @returns 
 */
const ModalHeader: React.FC<Props> = ({iconPath, iconAlt, text}) => {
    return (
        <div className="flex flex-row gap-3 pb-1 mx-5 border-b border-b-[#3e3522]/50">
            <Image src={iconPath} alt={iconAlt} width={40} height={40}/>
            <p className="font-Opensans font-semibold text-xl my-auto">{text}</p>
        </div>
    )
}

export default ModalHeader