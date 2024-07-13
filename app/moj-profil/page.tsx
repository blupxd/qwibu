import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBank,
  faCalendar,
  faCopy,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import Zakazani from "@/components/Profil/Zakazani";
import Settings from "@/components/Profil/Settings";
import { IoIosArrowBack } from "react-icons/io";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import userImage from "@/public/images/userImage.png";
import { FaArrowLeft, FaCoins } from "react-icons/fa";
import Link from "next/link";
const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user)
  const podaciProfil = {
    name: session?.user.name || "Podesite profil",
    mail: session?.user.email,
  };

  return (
    <div className="mt-16 md:mt-12 px-4 md:px-10 flex flex-col">
      <Link href="/" className="fixed z-20  top-6 md:top-8 left-6 md:left-12 text-2xl"><FaArrowLeft /></Link>
      <div className="md:flex-row flex-col flex md:items-center md:mx-auto">
        <div className="relative shadow-md shadow-black/30 rounded-full w-24 h-24 overflow-hidden">
          <Image
            src={session?.user.image! ? session?.user.image! : userImage}
            quality={100}
            alt="profile-picture"
            fill
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col px-4 md:px-12 border-b pb-6 md:pb-0 md:border-r border-gray-400">
          <h1 className="text-gray-900 text-3xl md:mt-0 mt-6 font-semibold">
            {podaciProfil.name}
          </h1>
          <div className="flex flex-col mt-4">
            <h1 className="font-semibold text-lg text-gray-800">Email</h1>
            <h4 className="text-gray-700 text-lg">{podaciProfil.mail}</h4>
          </div>
        </div>
        <div className="flex flex-col px-4 md:mt-0 mt-6 md:px-12 gap-6 md:gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-gray-900 font-semibold text-xl">Level</h1>
            <h1 className="text-gray-700 font-bold bg-gray-300 border-[2px] border-gray-700 h-8 w-8 flex items-center justify-center rounded-full">
              5
            </h1>
            <p className="text-xs text-gray-800">2,312 XP</p>
          </div>
          <div className="flex items-start">
            <FaCoins className="h-12 w-12 md:w-8 md:h-8 mt-1 text-yellow-500" />
            <div className="block ml-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-gray-900 font-semibold">
                  Qwibu coins
                </h3>
                <h1 className="text-base font-bold text-gray-700">85 Coins</h1>
              </div>

              <h2 className="w-full md:w-52 text-sm md:text-xs">
                You can use coins to pay for your appointments
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-20">
        <Zakazani />
        {/* <Settings /> */}
      </div>
    </div>
  );
};

export default Page;
