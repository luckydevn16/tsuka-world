"use client";

import { useState } from "react";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";

interface Props {
  title: string;
  items: string[];
  state: boolean[];
  setState: (id: number) => void;
}

const Dropdown: React.FC<Props> = ({ title, items, state, setState }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full">
      {/* Dropdown button */}
      <button
        className="block pl-3 pr-1 py-1 w-full text-base text-hover bg-normal rounded-md"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between">
          <span>{title}</span>
          <span className="text-2xl">
            <BiChevronDown />
          </span>
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute gold-table right-0 z-10 mt-2 w-full bg-normal rounded-md shadow-lg min-h-40 overflow-y-auto">
          {items.map((item, i) => (
            <button
              key={`dropdown-${i}`}
              className={`block w-full px-4 py-1 text-hover border-b border-hover hover:border-b hover:border-hover hover:bg-hover hover:text-normal ${
                state[i]
                  ? "bg-hover text-normal border-b border-normal"
                  : "text-hover"
              }`}
              onClick={() => {
                setState(i);
                toggleDropdown();
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
