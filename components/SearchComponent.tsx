import React from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";

interface Search {
    setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchComponent: React.FC<Search> = ({setSearchOpen}) => {
  return (
    <div className="flex relative items-center mt-12 gap-2">
      <div className="text-gray-800 absolute left-4 text-xl">
        <IoSearch />
      </div>
      <button
        onClick={() => setSearchOpen(true)}
        className="text-sm md:text-base px-12 py-4 text-left w-auto md:w-[32rem] focus:outline-none text-gray-400 rounded-full border-gray-400 border bg-white"
      >
        Pronadjite uslugu koja vam je potrebna
      </button>
      <button className="text-gray-800 flex items-center justify-center h-8 w-8 absolute right-4">
        <FaArrowRight />
      </button>
    </div>
  );
};

export default SearchComponent;
