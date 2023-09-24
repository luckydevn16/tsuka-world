"use client";

import { ProjectContentType } from "@/types/return.types";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  text: string; //the text which show on the button
  color: string; //the color of button
  icon: string; //icon url of button
  setProjContent: Dispatch<SetStateAction<ProjectContentType | null>>
}

const InputLink: React.FC<Props> = ({ color, text, icon, setProjContent }) => {
  //return Icon Button and redirect when press this
  const content_key = `${icon}_link`;
  return (
    <div className="mb-[15px] w-full">
        <div
          className={` flex h-[46px] flex-row items-center rounded-r-[4.9px] text-base font-semibold leading-[21.79px] text-white`}
        >
          <span
            className={`grid h-[46px] w-[51px] place-items-center  rounded-l-[5px]  !border transition-colors `}
            style={color==='#2F271C'?{borderColor: '#9B8355', borderRightStyle:'none'}:{ borderColor: color }}
          >
            <Image
              src={`/icons/${icon}.svg`}
              alt={text}
              width={text === "www.facebook.com" ? 10 : 22.8}
              height={15}
            />
          </span>
          <input
            style={color === '#2F271C'?{borderColor: '#9B8355',borderWidth:'1px',borderLeftStyle:'none', color:'#9B8355'} :{ background: color }}
            className="h-full w-full overflow-clip rounded-r-[5px] pl-[15px] outline-none bg-[#2F271C]"
            value = {text}
            onChange={(event)=>{
              setProjContent(prevContent=>{
                return {
                  ...prevContent,
                  [content_key]:event.target.value
                }
              })
            }}
          />
        </div>
    </div>
  );
};

export default InputLink;
