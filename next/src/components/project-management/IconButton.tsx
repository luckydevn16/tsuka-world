import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BiBell } from "react-icons/bi";

interface props {
  type: string;
  badge: boolean;
}

export const IconButton: React.FC<props> = ({ type, badge }: props) => {
  return (
    <div className="relative h-full w-full rounded-[10px] border-[1px] border-[#9B8355] py-3 text-[#9B8355] hover:bg-[#232323]">
      {type === "favorite" ? (
        <MdOutlineFavoriteBorder className="mx-auto h-[25px] w-[25px]" />
      ) : (
        <BiBell className="mx-auto h-[25px] w-[25px]" />
      )}
      {badge?<div className="absolute bg-[#FF646D] right-4 top-3 w-2 h-2 rounded-full"></div>:''}
    </div>
  );
};
