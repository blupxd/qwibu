"use client";
import React, { useRef, useState } from "react";
import gradoviSrbije from "../public/gradoviSrbije.json";
import { IoIosClose } from "react-icons/io";
import { FiFlag } from "react-icons/fi";
import { TbLocation } from "react-icons/tb";
interface SearchSectionProps {
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchSection: React.FC<SearchSectionProps> = ({ setSearchOpen }) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFormClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setOpenForm(true);
  };

  const handleBackdropClick = () => {
      setOpenForm(false);
  };

  // Funkcija za normalizaciju teksta (uklanjanje dijakritičkih znakova)
  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const gradovi = gradoviSrbije.filter((grad) =>
    normalizeText(grad.city.toLowerCase()).includes(
      normalizeText(searchTerm.toLocaleLowerCase())
    )
  );

  return (
    <div className="fixed z-40 top-0 flex flex-col items-center justify-center left-0 right-0 bottom-0 w-full h-full bg-black/30">
      <div
        className="w-full h-full md:w-[50rem] md:h-[30rem] bg-white relative p-6 rounded-lg shadow-lg shadow-black/30"
        onClick={handleBackdropClick}
      >
        <h1 className="text-2xl text-center font-bold text-gray-900">
          Izaberite vas grad
        </h1>
        <button
          onClick={() => setSearchOpen(false)}
          className="bg-gray-800 absolute h-8 w-8 flex items-center justify-center text-white rounded-full top-6 right-6"
        >
          <IoIosClose className="text-3xl" />
        </button>
        <div className="flex flex-col mt-12">
          <div className="flex gap-4 items-center relative" onClick={handleFormClick}>
            <FiFlag className="text-xl text-gray-800" />
            <div className="w-96 relative">
              <input
                value={searchTerm}
                ref={inputRef}
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${
                  openForm || searchTerm != '' ? "opacity-100" : "opacity-0"
                } px-4 py-1 rounded-lg w-full focus:outline-none`}
              />

              <p
                className={`absolute text-gray-400 transition-all duration-300 ease-in-out ${
                  openForm || searchTerm != ''
                    ? "-top-5 text-xs"
                    : "top-0 left-0 px-4 py-1 rounded-lg w-full"
                }`}
              >
                Pretražite salon, grad, uslugu
              </p>
            </div>
            {searchTerm.length >= 3 && openForm && (
            <div className="mt-2 text-base text-gray-700 max-w-max top-12 shadow-lg shadow-black/20 absolute bg-white">
              {gradovi.slice(0, 3).map((grad, index) => (
                <h1
                  onMouseEnter={() => {
                    if (inputRef.current) {
                      inputRef.current.value = grad.city;
                      setSearchTerm(grad.city);
                    }
                  }}
                  key={index}
                  className="py-2 px-4"
                >
                  {grad.city}, Srbija{" "}
                </h1>
              ))}
            </div>
          )}
          </div>
          <button className="text-gray-600 max-w-max mx-auto text-lg font-bold mt-6 rounded-xl flex items-center gap-4">
            <TbLocation className="p-2 text-4xl bg-gray-300 rounded-full"/> Koristi trenutnu lokaciju
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
