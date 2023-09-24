import React from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';

export interface HeaderBellButtonProps {
  menuCollapsed: boolean;
  callback: () => void;
}

export const HeaderBellButton: React.FC<HeaderBellButtonProps> = ({
  menuCollapsed,
  callback,
}) => {
  return (
    <button
      type="button"
      onClick={callback}
      className={` ${menuCollapsed ? '' : 'bg-hover'} rounded-full h-[40px] p-2 ${
        menuCollapsed ? 'text-header' : 'text-gold'
      } focus:outline-none text-[25px]`}
    >
      <IoMdNotificationsOutline />
    </button>
  );
};
