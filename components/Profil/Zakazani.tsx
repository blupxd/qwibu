import React from "react";
import slika from "../../public/images/radnik.jpg";
import zakazani from "../../public/dummyZakazani.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignRight,
  faClose,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Zakazani = () => {
  const show = false;

  const proveraDatuma = (param: String) => {
    const datum = new Date();
    const danasnjiDan = datum.getDate();
    const danasnjiMesec = datum.getMonth() + 1;
    const datumZaProveru = param.split("-");
    const convert = datumZaProveru.map((broj) => parseInt(broj));

    if (danasnjiMesec === convert[1]) {
      switch (convert[2]) {
        case danasnjiDan:
          return "Danas";
        case danasnjiDan + 1:
          return "Sutra";
        case danasnjiDan + 2:
          return "Prekosutra";
        default:
          return convert[2] + "." + convert[1];
      }
    } else return "Sledeci mesec";
  };

  return (
    <div className="block gap-2">
      <h1 className="text-xl text-gray-900 font-semibold">
        <FontAwesomeIcon icon={faAlignRight} /> Zakazani kod vas
      </h1>
      <form className="relative mt-4">
        <input
          type="text"
          className="focus:outline-none px-2 py-1 w-full border-b border-indigo-400 focus:border-indigo-500"
          placeholder="Pretrazi kupca"
        />
        <button className="absolute right-2 top-1 text-indigo-400">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button
          className={`absolute right-8 text-red-400 text-xs top-2 ${
            show ? "" : "hidden"
          }`}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </form>
      <div className="flex flex-col mt-12 gap-6 w-full">
        {zakazani.map((zakazan, key) => (
          <div
            key={key}
            className="w-full flex gap-4 items-center"
          >
            <div className="h-12 w-12 border-[2px] border-indigo-500 overflow-hidden relative rounded-full">
              <Image src={slika} alt="profilna" fill objectFit="cover" />
            </div>
            <div className="block w-40">
              <h1 className="text-base text-gray-800 ">
                {zakazan.ime} {zakazan.prezime}
              </h1>
              <p className="text-sm font-semibold text-indigo-500">
                {proveraDatuma(zakazan.datumZakazan)} u {zakazan.vreme}h
              </p>
              <h3 className="text-xs text-gray-500">{zakazan.korisnickoIme}</h3>
            </div>

            <button className="text-white bg-gray-800 px-2 py-2 text-xs rounded-md">
              Pregled
            </button>
          </div>
        ))}
        <button className="text-indigo-500 text-center text-sm">
          Vidi više
        </button>
      </div>
    </div>
  );
};

export default Zakazani;
