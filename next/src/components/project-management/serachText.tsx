
import {FiSearch} from 'react-icons/fi'
export const SearchText = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-[400px] navMobile:w-full !rounded-md !bg-[#2F271C] py-1 pl-7 text-[#9B8355] outline-none placeholder:text-[#9B8355]"
      ></input>
      <span className="absolute left-2 top-[7px] h-full align-middle text-[#9B8355]">
        <FiSearch />
      </span>
    </div>
  );
};
