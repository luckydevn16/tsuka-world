'use client';

import { useEffect, useState } from "react";
import RadioButton from "./radio-button"
import { RadioGroupAlign, RadioItem } from "@/types/radio.types";

export interface Props {
    radioItems: Array<RadioItem>
    align: RadioGroupAlign
    onChange: (selectedId: number) => void
}

/**
 * This component is a custom-styled radio button group. If the colors are changed, make sure to add the new colors to tailwind.config.js to ensure they aren't purged
 * @param radioItems The items to be displayed in the radio group
 * @param align The alignment of the radio group. Either RadioGroupAlign.HORIZONTAL or RadioGroupAlign.VERTICAL
 * @param onChange The function to be called when the selected radio button changes. This will be passed the selectedId (as a number)
 * @returns 
 */
const RadioGroup: React.FC<Props> = ({radioItems, align, onChange}) => {
    const [selected, setSelected] = useState<number>(radioItems[0].id)

    useEffect(() => {
        onChange(selected)
    }, [selected])

    return (
        <div className={`flex flex-col gap-2 ${align == RadioGroupAlign.HORIZONTAL && "mx-auto"} ${align == RadioGroupAlign.VERTICAL && "my-auto"}`}>
            {radioItems.map((radioItem, index) => {
                return (
                    <RadioButton 
                        label={radioItem.label} 
                        key={index} 
                        onClick={()=>{setSelected(radioItem.id)}} 
                        selected={radioItem.id == selected}
                        border={"[#FFCE31]"}
                        fill={"[#FFCE31]"}
                    />
                )
            })}
        </div>
    )
}

export default RadioGroup