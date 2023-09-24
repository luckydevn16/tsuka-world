'use client';

import { useState } from "react";

interface Props {
    label: string
    onClick: () => void
    selected: boolean
    border: string
    fill: string
}

/**
 * This is a single radio button. You probably shouldn't be using this, as radio-group provides an API and supports any number of buttons
 * @param label The label to be displayed next to the radio button
 * @param onClick The function to be called when the radio button is clicked
 * @param selected Whether or not this radio button is selected
 * @param border The border color of the radio button. Make sure this color is in tailwind.config.js, otherwise it will be purged
 * @param fill The fill color of the radio button. Make sure this color is in tailwind.config.js, otherwise it will be purged
 * @returns 
 */
const RadioButton: React.FC<Props> = ({label, onClick, selected, border, fill}) => {
    return (
        <div className="flex flex-row gap-2">
            <div onClick={onClick} className={`rounded-full my-auto p-[1px] border border-${border} w-4 h-4 flex cursor-pointer hover:scale-125 transition-all`}>
                <div className={`rounded-full w-full h-full m-auto transition-all bg-${fill} duration-200 ${selected ? "scale-100" : "scale-0"}`}></div>
            </div>
            <p className={`my-auto text-${border}`}>{label}</p>
        </div>
    )
}

export default RadioButton