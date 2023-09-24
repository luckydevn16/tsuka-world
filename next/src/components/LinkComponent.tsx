"use client";

interface Props {
  url: string; // link url
}
import { AiOutlineLink } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
const LinkTo: React.FC<Props> = ({ url }) => {
  return (
    <div className="bg-gold bg-opacity-10 rounded-[5px] mb-[15px] h-[45px]">
      <div className="flex flex-row">
        {/* link and open in new window */}
        <a href={`${url}`} className="w-[90%]" target="_blank">
          <div className="py-[10px] my-auto font-open-sans font-bold text-gold text-[14px] hover:opacity-50 flex flex-row gap-[15px]">
            <div></div>
            <FiExternalLink className="my-auto px-20px text-[20px]" />
            {url}
          </div>
        </a>
        {/* link and open in this browser */}
        <a href={`${url}`}>
          <div className="py-[10px] my-auto font-bold text-[20px] text-gold hover:opacity-50">
            <AiOutlineLink />
          </div>
        </a>
      </div>
    </div>
  );
};

export default LinkTo;
