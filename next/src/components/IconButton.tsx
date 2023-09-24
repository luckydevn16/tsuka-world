"use client";

import Image from "next/image";
import Link from "next/link";

interface Props {
  text: string; //the text which show on the button
  color: string; //the color of button
  icon: string; //icon url of button
}

const IconButton: React.FC<Props> = ({ color, text, icon }) => {
  //return Icon Button and redirect when press this
  return (
    <div className="mb-[15px] w-full">
      <Link href={`${text}`} style={{ borderColor: color }}>
        <div
          className={` flex h-[46px] flex-row items-center rounded-r-[4.9px] text-base font-semibold leading-[21.79px] text-white`}
        >
          <span
            className={`grid h-[46px] w-[51px] place-items-center  rounded-l-[5px]  !border transition-colors `}
            style={{ borderColor: color }}
          >
            <Image
              src={`/icons/${icon}.svg`}
              alt={text}
              width={text === "www.facebook.com" ? 10 : 22.8}
              height={15}
            />
          </span>
          <div
            style={{ background: color }}
            className="h-full w-full overflow-clip rounded-r-[5px] pl-[15px] pt-[10px]"
            placeholder={`www.${icon}.com`}
          >
            {text}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default IconButton;
