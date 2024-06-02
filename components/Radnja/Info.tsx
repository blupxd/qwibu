import React, { useRef, useState } from "react";
import dummy from "../../public/images/radnik.jpg";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Utisci from "./Utisci";

interface Radnik {
  ime: string;
  prezime: string;
  iskustvo: number;
  cena: number;
}

const Info: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const about =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus hic repellendus alias quia at cumque soluta officia, consequuntur voluptas ab dignissimos tenetur necessitatibus explicabo consectetur quidem tempora deserunt dolore deleniti.";
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
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
  const radnici: Radnik[] = [
    {
      ime: "Marko",
      prezime: "Petrović",
      iskustvo: 5,
      cena: 1000,
    },
    {
      ime: "Jovana",
      prezime: "Nikolić",
      iskustvo: 8,
      cena: 1200,
    },
    {
      ime: "Stefan",
      prezime: "Đorđević",
      iskustvo: 3,
      cena: 600,
    },
  ];

  return (
    <div className="flex flex-col mt-10 md:mt-16">
      <div className="flex items-center text-2xl text-gray-800 justify-between gap-4 mb-2">
        <h1 className="font-semibold">Radnici</h1>
        <div className="hidden md:flex items-center gap-4">
          <button onClick={scrollLeft}>
            <FaAngleLeft />
          </button>
          <button onClick={scrollRight}>
            <FaAngleRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="-mx-4 pl-4 lg:mx-0 mb-24 scroll-px-4 scroller auto-cols-[33%] md:auto-cols-[30%] snaps-inline no-scrollbar gap-12"
      >
        {radnici.map((radnik: Radnik, index: number) => (
          <div key={index} className="flex flex-col max-w-max">
            <div className="relative shadow-lg shadow-black/20 overflow-hidden h-20 w-20 rounded-full">
              <Image src={dummy} alt="slika" fill objectFit="cover" />
            </div>
            <h1 className="text-gray-900 font-semibold text-center text-lg mt-2">
              {radnik.ime}
            </h1>
            <h2 className="text-gray-500 text-center text-base">Frizer</h2>
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-2">O nama</h1>
      <p
        className={`text-gray-600 mb-6 text-base lg:text-base md:text-lg ${
          expanded ? "" : "text-ellipsis overflow-hidden"
        }`}
      >
        {expanded ? about : `${about.substring(0, 200)}...`}
        {about.length >= 200 && (
          <button
            className="text-blue-500 text-base md:text-lg lg:text-base font-semibold hover:text-blue-600 focus:outline-none"
            onClick={() => toggleExpanded()}
          >
            {expanded ? "Vidi manje" : "Vidi vise"}
          </button>
        )}
      </p>
      <div className="lg:hidden block">
        <Utisci />
      </div>
    </div>
  );
};

export default Info;
