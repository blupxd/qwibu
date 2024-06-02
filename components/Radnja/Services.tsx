"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import dummy from "@/public/images/dummy.jpg"
import { LuBadgeInfo } from "react-icons/lu";
import { BsClipboardPlusFill } from "react-icons/bs";
import Radnici from "./Radnici";
import Info from "./Info";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCalendarCheck,
  FaRegClock,
} from "react-icons/fa";

interface Usluga {
  trajanje: string;
  naziv: string;
  slika: string;
}

interface Radnja {
  radnja: any;
}
const Services: React.FC<Radnja> = ({ radnja }) => {
  const [zakazi, setZakazi] = useState(false);
  const { usluge } = radnja;
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  const formatTrajanje = (trajanje: number): string => {
    const hours = Math.floor(trajanje);
    const minutes = Math.round((trajanje - hours) * 60);
    if (hours === 0) {
      return `${minutes}min`;
    } else if (hours === 1 && minutes === 0) {
      return `${hours}h`;
    } else if (hours === 1 && minutes > 0) {
      return `${hours}h ${minutes}min`;
    } else if (hours > 1 && minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}min`;
    }
  };

  return (
    <div className="flex flex-col mb-0 md:mb-12 px-4 md:px-0">
      <div className="flex items-center text-2xl text-gray-800 justify-between gap-4 mb-2">
        <h1 className="font-semibold">Usluge koje pruzamo</h1>
        <div className="hidden md:flex items-center gap-4">
          <button onClick={scrollLeft}>
            <FaAngleLeft />
          </button>
          <button onClick={scrollRight}>
            <FaAngleRight />
          </button>
        </div>
      </div>
      <div className="relative">
        <div
          ref={scrollerRef}
          className="-mx-4 lg:mx-0 pl-4 scroll-px-4 scroller auto-cols-[72%] md:auto-cols-[58%] xl:auto-cols-[52%] 2xl:auto-cols-[22%] snaps-inline no-scrollbar gap-x-12"
        >
          {usluge.length > 0 && usluge.map((usluga: Usluga, key: number) => (
            <div className="flex flex-col relative w-full h-44" key={key}>
              <div className="w-full h-32 rounded-2xl overflow-hidden relative">
                {/* <Image src={usluga?.slika ? usluga.slika : dummy} alt="slika" fill objectFit="cover" /> */}
                <div className="relative opacity-0 hover:opacity-100 transition-all duration-200 z-10 top-0 right-0 bottom-0 left-0 w-full h-full bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setZakazi(true)}
                    className="text-white p-4 bg-gray-900 text-3xl rounded-full"
                  >
                    <BsClipboardPlusFill />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 z-20 absolute left-0 right-0 mx-6 shadow-lg shadow-black/20 bottom-2 bg-white px-4 py-2 rounded-xl">
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-2 justify-between">
                    <h1 className="text-base w-20 md:w-24 overflow-hidden overflow-ellipsis font-semibold text-gray-800">
                      {usluga.naziv}
                    </h1>
                    <p className="font-bold text-gray-800 text-xs flex items-center gap-1">
                      <FaRegClock className="text-gray-500 text-sm" />
                      {formatTrajanje(Number(usluga.trajanje))}
                    </p>
                  </div>
                  <p className="text-sm xl:text-sm text-gray-500 flex items-center gap-2">
                    <LuBadgeInfo className="text-base text-gray-800" />
                    Moze da traje duze/krace
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Info />
      {zakazi && (
        <div className="fixed z-50 top-0 right-0 left-0 bottom-0 bg-black/20">
          <Radnici setZakazi={setZakazi} radnja={radnja} />
        </div>
      )}
    </div>
  );
};

export default Services;
