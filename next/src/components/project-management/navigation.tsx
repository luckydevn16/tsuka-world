import { RiFoldersLine } from "react-icons/ri";
import { BiDockLeft } from 'react-icons/bi';
import {TbNotebook} from 'react-icons/tb'
interface Props {
  active: boolean;
  icon: string;
}
export const Navigation: React.FC<Props> = ({ active, icon }: Props) => {
  return (
    <div
      className="h-[36px] text-normal mb-10 cursor-pointer"
      style={
        active
          ? {
              borderStyle: "none",
              borderLeftStyle: "solid",
              borderColor: "#B58529",
              borderWidth: 4,
            }
          : {}
      }
    >
      {icon==='folder'?<RiFoldersLine className="mx-auto w-[30px] h-[30px] py-[3px]" />:<TbNotebook className="mx-auto w-[30px] h-[30px] py-[3px]"/>}
    </div>
  );
};
