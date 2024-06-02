"use client"
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import dummy from "@/public/images/dummy.jpg";
import dynamic from "next/dynamic";
import { CiGrid41 } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import {
  FaArrowLeft,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaRegClock,
  FaRegHeart,
  FaStar,
  FaTiktok,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiTwotoneAlert } from "react-icons/ai";

// Lazy load components
const Services = dynamic(() => import("./Services"), { suspense: true });
const Utisci = dynamic(() => import("./Utisci"), { suspense: true });
const Sidebar = dynamic(() => import("./Sidebar"), { suspense: true });

interface SideMenuItem {
  ikonica: any;
  tekst: string;
  label: string;
}

interface Radnja {
  radnja: any;
}

const Display: React.FC<Radnja> = ({ radnja }) => {
  const { naziv, email, adresa, logo, telephone, images, socials, dani } =
    radnja;
  const [scrollY, setScrollY] = useState<number>(0);
  const linkovi: SideMenuItem[] = [
    {
      ikonica: IoCallOutline,
      tekst: telephone ? "tel:" + telephone : "",
      label: "Telefon",
    },
    {
      ikonica: IoMailOutline,
      tekst: email ? "mailto:" + email : "",
      label: "E-mail",
    },
    {
      ikonica: FaInstagram,
      tekst: socials[0].instagram ? "https://" + socials[0].instagram : "",
      label: "Instagram",
    },
    {
      ikonica: FaFacebook,
      tekst: socials[0].facebook ? "https://" + socials[0].facebook : "",
      label: "Facebook",
    },
    {
      ikonica: FaLinkedin,
      tekst: socials[0].linkedin ? "https://" + socials[0].linkedin : "",
      label: "LinkedIn",
    },
    {
      ikonica: FaTiktok,
      tekst: socials[0].tiktok ? "https://" + socials[0].tiktok : "",
      label: "Tiktok",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    console.log(scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {scrollY >= 800 && (
        <div className="md:hidden flex items-center text-gray-800 z-30 bg-white top-0 justify-between sticky w-full p-4">
          <Link href="/" className="flex text-lg p-2 rounded-full">
            <FaArrowLeft className="hover:text-blue-500" />
          </Link>
          <div className="max-w-max flex items-center">
            <h1 className="text-ellipsis font-medium flex overflow-hidden">
              {naziv}
            </h1>
          </div>
          <button className="flex text-lg p-2 rounded-full">
            <FaRegHeart className="hover:text-blue-500" />
          </button>
        </div>
      )}
      <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-5">
        <div className="col-span-1 hidden lg:flex flex-col gap-4 md:p-6 lg:p-4 bg-gray-200">
          <Link
            href="/"
            className="flex items-center w-full justify-between text-xl text-gray-800 font-bold"
          >
            Usluge <IoIosArrowBack />
          </Link>
          <h1 className="flex items-center w-full justify-between text-lg text-gray-800 py-4 border-b border-gray-300">
            Pregled radnje <CiGrid41 />
          </h1>

          <div className="flex gap-4">
            <Image
              src={logo || dummy}
              alt="Logo"
              width={100}
              height={100}
              className="rounded-full w-14 h-14 shadow-lg shadow-black/10"
            />
            <div className="flex flex-col">
              <h1 className="text-base text-gray-800 font-bold">{naziv}</h1>
              <div className="flex gap-1 text-xs text-gray-900 items-center">
                <FaStar />
                <h1 className="text-sm">
                  5.0 <span className="text-gray-400 text-xs">(23)</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center mb-2">
            <AiTwotoneAlert className="w-8 h-8 text-gray-800" />
            <div className="flex flex-col ml-2">
              <h1 className="font-semibold text-base text-gray-800">
                Obaveštenja za kupce
              </h1>
              <h3 className="text-xs text-gray-600">
                Trenutno nemamo obaveštenja
              </h3>
            </div>
          </div>
          {/* <div className="flex flex-wrap gap-12 p-4 border-y border-gray-300 w-full items-center text-gray-900 font-semibold">
            {linkovi
              .filter((x) => x.tekst)
              .map((link: SideMenuItem, key: number) => (
                <Link href={link.tekst} key={key}>
                  <link.ikonica className="text-xl" />
                </Link>
              ))}
          </div> */}
          {/* <Suspense fallback={<div>Loading...</div>}>
            <Utisci />
          </Suspense> */}
        </div>
        <div className="flex flex-col col-span-5 md:col-span-4 lg:col-span-3 py-0 md:py-12 px-0 md:px-4 lg:px-12">
          <div className="flex rounded-b-xl md:rounded-xl mb-8 md:mb-10 lg:mb-16 flex-col h-64 md:h-44 lg:h-48 w-full items-center justify-center bg-black relative">
            <button className="flex bg-white text-lg z-10 p-2 rounded-full absolute top-8 left-8">
              <FaArrowLeft className="hover:text-blue-500" />
            </button>
            <div className="flex z-10 items-start absolute -bottom-6 left-4 gap-4">
              <Image
                src={logo ? logo : dummy}
                width={100}
                height={100}
                alt="Logo"
                className="rounded-full border-4 border-white h-32 w-32 md:w-28 md:h-28"
              />
              <div className="flex flex-col text-white">
                <h3 className="text-3xl sm:text-4xl md:text-3xl mt-6 md:mt-4 lg:mt-2 font-semibold">
                  {naziv}
                </h3>
                <h4 className="font-thin hidden md:flex text-lg md:text-base text-wrap">
                  {adresa}
                </h4>
              </div>
            </div>

            <button className="flex bg-white text-lg z-10 p-2 rounded-full absolute top-8 right-8">
              <FaRegHeart className="hover:text-blue-500" />
            </button>
            {/* <Image
              src={images[0] ? images[0] : dummy}
              alt="Slika"
              fill
              objectFit="cover"
              className="opacity-40 rounded-b-xl md:rounded-xl"
            /> */}
          </div>
          <div className="flex flex-col lg:hidden gap-2 mx-4 md:mx-0 mb-4">
            <div className="flex items-center">
              <AiTwotoneAlert className="w-10 h-10 text-gray-800" />
              <div className="flex flex-col ml-2">
                <h1 className="font-semibold text-lg text-gray-800">
                  Obaveštenja za kupce
                </h1>
                <h3 className="text-base italic text-gray-600">
                  Trenutno nemamo obaveštenja
                </h3>
              </div>
            </div>
            <h2 className="text-red-500 text-xl flex items-center gap-2">
              <FaRegClock /> Zatvoreno
            </h2>

            <div className="flex gap-2 text-xl text-gray-800 items-center">
              <h1 className="text-xl">5.0</h1>
              <div className="flex items-center">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-blue-500 text-base">(23)</p>
            </div>
            <h2 className="text-base text-gray-400 flex items-center gap-2 mb-2">
              <FaLocationDot /> {adresa}
            </h2>
            <div className="flex flex-col md:hidden w-full mb-6 gap-4 text-gray-500">
              {/* {linkovi
                .filter(
                  (x) =>
                    x.tekst !== "" &&
                    (x.label === "Telefon" || x.label === "E-mail")
                )
                .map((link: SideMenuItem, key: number) => (
                  <Link
                    className="flex items-center gap-2 text-lg"
                    href={link.tekst}
                    key={key}
                  >
                    <link.ikonica className="text-lg" /> {link.label}
                  </Link>
                ))} */}
            </div>
          </div>

          {/* <Suspense fallback={<div>Loading...</div>}>
            <Services radnja={radnja} />
          </Suspense> */}
        </div>

        <div className="col-span-5 md:col-span-2 lg:col-span-1 mt-12 mr-0 md:mr-4">
          {/* <Suspense fallback={<div>Loading...</div>}>
            <Sidebar radnja={radnja} />
          </Suspense> */}
        </div>
      </div>
    </div>
  );
};

export default Display;
