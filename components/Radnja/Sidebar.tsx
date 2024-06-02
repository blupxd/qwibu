"use client";
import { AiTwotoneAlert } from "react-icons/ai";
import dummy from "@/public/images/dummy.jpg";
import Image from "next/image";
import map from "@/public/images/mapa.png";
import { MdOutlineLocationOn } from "react-icons/md";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Radnja {
  radnja: any;
}

const Sidebar: React.FC<Radnja> = ({ radnja }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { dani, adresa, images } = radnja;
  const [isRadnjaOpen, setIsRadnjaOpen] = useState<boolean>(false);

  const danas = () => {
    const dan = new Date().getDay();
    return dan === 0 ? 7 : dan;
  };

  useEffect(() => {
    const danRadnje = dani.find((item: any, index: number) => index + 1 === danas());

    if (danRadnje && danRadnje.pocetak !== "" && danRadnje.kraj !== "") {
      const datum = {
        pocetak: new Date(`1970-01-01T${danRadnje.pocetak}:00Z`).toLocaleTimeString("sr-RS", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        kraj: new Date(`1970-01-01T${danRadnje.kraj}:00Z`).toLocaleTimeString("sr-RS", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      const [startHour, startMinute] = datum.pocetak.split(":");
      const [endHour, endMinute] = datum.kraj.split(":");

      const currentTime = new Date();
      const currentHour = Number(currentTime.getHours());
      const currentMinutes = Number(currentTime.getMinutes());

      if (Number(startHour) <= currentHour && currentHour <= Number(endHour)) {
        if (currentMinutes > Number(endMinute) && currentHour === Number(endHour)) {
          setIsRadnjaOpen(false);
        } else {
          setIsRadnjaOpen(true);
        }
      } else {
        setIsRadnjaOpen(false);
      }
    }
  }, [dani, new Date().getMinutes]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const adresaSliced = () => {
    return adresa ? adresa.split(",") : ["", ""];
  };

  const capitalizeFirstLetter = (string: string) => {
    return (string.charAt(0).toUpperCase() + string.slice(1)).slice(0, 3);
  };

  return (
    <div className="flex flex-col md:sticky top-12 mb-12 md:px-4 lg:px-0 p-0">
      <div className="flex flex-col relative px-4 md:px-0">
        <div className="relative overflow-hidden rounded-xl w-full h-48">
          <Image src={map} alt="mapa" fill objectFit="cover" />
        </div>
        <div className="flex text-gray-800 items-center mt-2">
          <MdOutlineLocationOn className="p-3 md:w-12 md:h-12 w-16 h-16 flex items-center justify-center" />
          <div className="flex flex-col w-full md:w-48 overflow-clip">
            <h1 className="text-lg md:text-sm font-semibold">{adresaSliced()[1]}</h1>
            <h3 className="text-base md:text-xs">{adresaSliced()[0]}</h3>
          </div>
          <Link href="/" className="text-2xl">
            <FiArrowUpRight />
          </Link>
        </div>
        <div className="flex text-gray-800 items-center mt-2">
          <IoTimeOutline className="p-3 md:w-12 md:h-12 w-16 h-16 flex items-center justify-center" />
          <div className="flex flex-col w-full md:w-48 overflow-clip">
            <h1 className={`text-lg md:text-sm font-semibold ${isRadnjaOpen ? "text-green-600" : "text-red-600"}`}>
              {isRadnjaOpen ? "Otvoreno" : "Zatvoreno"}
            </h1>
            <h3 className="text-base md:text-xs">Pregled radnog vremena</h3>
          </div>
          <button onClick={handleToggle} className="text-2xl">
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-full h-full left-0 top-0 bg-white flex flex-col px-4 md:px-0 z-20"
            >
              <div className="flex text-gray-800 items-center mt-2">
                <IoTimeOutline className="p-3 md:w-12 md:h-12 w-16 h-16 flex items-center justify-center" />
                <div className="flex flex-col w-full md:w-48 overflow-clip">
                  <h1 className={`text-lg md:text-sm font-semibold ${isRadnjaOpen ? "text-green-600" : "text-red-600"}`}>
                    {isRadnjaOpen ? "Otvoreno" : "Zatvoreno"}
                  </h1>
                  <h3 className="text-base md:text-xs">Pregled radnog vremena</h3>
                </div>
                <button onClick={handleToggle} className="text-2xl">
                  <IoIosArrowUp />
                </button>
              </div>
              <div className="flex flex-col p-6">
                {dani.map((vreme: any, key: number) => (
                  <div key={vreme.dan} className="text-lg md:text-sm flex items-center justify-between">
                    <h1 className={`${key + 1 === danas() && "font-bold"} text-gray-900`}>
                      {capitalizeFirstLetter(vreme.dan)}{key + 1 === danas() && " (Danas)"}
                    </h1>
                    <h2 className={`${key + 1 === danas() ? "font-bold text-blue-500" : "text-gray-600"}`}>
                      {vreme.pocetak !== "" && vreme.kraj !== ""
                        ? `${new Date(`1970-01-01T${vreme.pocetak}:00Z`).toLocaleTimeString("sr-RS", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}h - ${new Date(`1970-01-01T${vreme.kraj}:00Z`).toLocaleTimeString("sr-RS", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}h`
                        : "Neradan dan"}
                    </h2>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="md:flex hidden flex-col">
        <div className="flex items-center justify-between mt-10 mb-2">
          <h1 className="text-xl text-gray-800 font-semibold">Galerija</h1>
          <button className="text-blue-400 text-sm">Vidi sve</button>
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
          {images.slice(0, 4).map((x: string, y: number) => (
            <button key={y} className={`${y === 1 || y === 2 ? "col-span-1" : "col-span-2"} relative w-full h-16 overflow-hidden rounded-xl bg-black`}>
              <Image src={x ? x : dummy} alt={`${y}`} fill objectFit="cover" className="opacity-65" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
