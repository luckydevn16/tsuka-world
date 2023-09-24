'use client';

interface Props {
    text: string,
    backgroundColor: string,
    textColor: string,
    onClick: () => void,
    disabled: boolean
}

/**
 * A general-purpose button for use on modals
 * @param text The text to display on the button
 * @param backgroundColor The background color of the button. Make sure this is within tailwind.config.js
 * @param textColor The text color of the button. Make sure this is within tailwind.config.js
 * @param onClick The function to call when the button is clicked
 * @param disabled Whether the button is disabled or not 
 */
const Button: React.FC<Props> = ({text, backgroundColor, textColor, onClick, disabled}) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`bg-${backgroundColor} text-${textColor} px-7 py-2 font-Opensans font-semibold rounded-lg transition-all hover:scale-105`}>{text}</button>
    )
}

export default Button