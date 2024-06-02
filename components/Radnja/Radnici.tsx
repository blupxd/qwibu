"use client";
import React, { useState } from "react";
import Image from "next/image";
import slika from "../../public/images/radnik.jpg";
import { PiUsersThree } from "react-icons/pi";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import Kalendar from "./Kalendar";

interface ZakazivanjeProps {
  setZakazi: React.Dispatch<React.SetStateAction<boolean>>;
  radnja: any;
}
interface RadniciArr {
  ime: string;
  prezime: string;
  role: string;
} 
const Radnici: React.FC<ZakazivanjeProps> = ({ setZakazi,radnja }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const radnici: RadniciArr[] = [
    {
      ime: "Marko",
      prezime: "Petrović",
      role: "Master Barber",
    },
    {
      ime: "Jovana",
      prezime: "Nikolić",
      role: "Master Barber",
    },
    {
      ime: "Stefan",
      prezime: "Đorđević",
      role: "Master Barber",
    },
  ];



  return (
    <div className="bg-white px-4 pt-12 md:p-12 md:max-h-max rounded-3xl md:rounded-xl flex flex-col gap-4 mx-0 lg:mx-64 mt-6 absolute left-0 right-0 bottom-0 h-2/3 md:h-auto">
      <div className="flex items-center justify-between text-gray-900">
        <h1 className="text-left text-2xl font-semibold">{steps === 0 ? 'Izaberite radnika' : 'Izaberite termin'}</h1>
        {!steps ? <button
          onClick={() => setSteps(steps + 1)}
          className="text-xl flex items-center"
        >
          Nastavi <TiArrowRight className="w-10 h-10" />
        </button> :
        <button
          onClick={() => setSteps(steps - 1)}
          className="text-xl flex items-center"
        >
          <TiArrowLeft className="w-10 h-10" /> Nazad 
        </button>}
      </div>

      {!steps ? (
        <div className="grid grid-cols-1 overflow-y-scroll no-scrollbar md:grid-cols-3 items-center gap-6">
          <div
            onClick={() => setSelected(null)}
            className={`flex flex-col justify-center items-center h-48  rounded-xl ${
              selected === null
                ? "border-blue-500 border-2"
                : "border-gray-300 border"
            } cursor-pointer`}
          >
            <PiUsersThree className="w-10 h-16" />
            <div className="flex flex-col items-center">
              <h1 className="text-gray-900 text-normal">Prvi slobodni</h1>
              <h2 className="text-gray-500 text-sm">Sto pre do usluge</h2>
            </div>
          </div>
          {radnici.map((radnik: RadniciArr, key: number) => (
            <div
              key={key}
              onClick={() => setSelected(key)}
              className={`flex flex-col justify-center items-center h-48 rounded-xl ${
                selected === key
                  ? "border-blue-500 border-2"
                  : "border-gray-300 border"
              } cursor-pointer`}
            >
              <div className="h-16 w-16 rounded-full overflow-hidden relative">
                <Image src={slika} alt="radnik" fill objectFit="cover" />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-gray-900 text-normal">{radnik.ime}</h1>
                <h2 className="text-gray-500 text-sm">{radnik.role}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Kalendar radnja={radnja}/>
      )}
      <button
        className="absolute top-2 right-2 text-3xl md:text-xl text-gray-800"
        onClick={() => {
          setZakazi(false);
        }}
      >
        <IoMdClose className="w-full h-full" />
      </button>
    </div>
  );
};

export default Radnici;
