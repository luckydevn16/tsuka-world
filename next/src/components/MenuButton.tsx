import { HiBars3 } from "react-icons/hi2";
export interface HeaderMenuButtonProps {
    menuCollapsed: boolean;
    callback: () => void;
  }
  
  export const HeaderMenuButton: React.FC<HeaderMenuButtonProps> = ({
    menuCollapsed,
    callback,
  }) => {
    return (
      <button
        type="button"
        onClick={callback}
        className={` navPc:hidden ${menuCollapsed ? "" : "bg-hover"} rounded-full h-[40px] p-2 ${menuCollapsed ? "text-header" : "text-gold"} focus:outline-none text-[25px]`}
        
      >
        <HiBars3/>
      </button>
    );
  };
  