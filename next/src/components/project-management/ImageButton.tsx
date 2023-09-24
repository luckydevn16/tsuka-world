import Image from "next/image";
import { IoMdClose } from "react-icons/io";
interface Props {
  id: number|undefined;
  url: string;
  text: string;
  onDeleteClick: ()=>void;
}
export const ImageButton: React.FC<Props> = ({
  id,
  url,
  text,
  onDeleteClick,
}: Props) => {
  return (
    <div className="relative p-[8px]">
      <button
        className="absolute right-0 top-0 h-[18px] w-[18px] rounded-full bg-[#DF2040] text-white"
        onClick={(e) => {onDeleteClick();}}
      >
        <IoMdClose className="m-auto" />
      </button>
      <div className="flex flex-row rounded-[10px] border-[1px] border-[#414141] p-1 pr-4">
        <div className="w-12 grow">
          <Image
            src={url}
            width={44}
            height={40}
            alt="project-image"
            className="rounded-[5px]"
            style={{width:'44px', height:'40px'}}
          />
        </div>

        <p className="my-auto overflow-hidden">{text}</p>
      </div>
    </div>
  );
};
