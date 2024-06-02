"use client";
import { useEffect, useState } from "react";
import { PiSignOutBold } from "react-icons/pi";
import { FiBell } from "react-icons/fi";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import userImage from "@/public/images/userImage.png";
interface UserNavProps {
  profilna: any;
  color: string;
}
const UserNav = ({ profilna, color }: UserNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    setIsOpen(false);
  }, [scrollY]);

  return (
    <div className="relative">
      <div className="flex items-center gap-16">
        <button className={`text-2xl text-${color} relative`}>
          <FiBell />
          <h1 className="text-xs absolute -top-4 -right-4 bg-red-500 rounded-full h-6 w-6 flex items-center justify-center text-white">
            2
          </h1>
        </button>
        <button
          className={`w-12 h-12 relative overflow-hidden border-2 ${
            isOpen ? "border-orange-400" : `border-${color}`
          } rounded-full`}
          onClick={handleToggle}
        >
          <Image
            fill
            objectFit="cover"
            quality={100}
            alt="slika"
            src={profilna?.user?.image ? profilna?.user?.image : userImage}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-64">
          <ul className="px-2 pt-2 text-base font-semibold">
            <li className="flex flex-col px-4 justify-start py-2">
              <h1 className="text-gray-900 font-bold">{profilna.user.name}</h1>
              <Link
                onClick={handleToggle}
                href="/moj-profil"
                className=" text-blue-500 text-sm"
              >
                Moj profil
              </Link>
            </li>
            <li className=" py-2">
              <Link
                onClick={handleToggle}
                href="/pregled-zakazanih"
                className="px-4 py-2 text-gray-800 "
              >
                Pomoć
              </Link>
            </li>
            <li className="py-2">
              <Link
                onClick={handleToggle}
                href="/radnja/123"
                className="px-4 py-2 text-gray-800 "
              >
                Podešavanja
              </Link>
            </li>

            <li>
              <button
                onClick={() =>
                  signOut({
                    redirect: true,
                    callbackUrl: `${window.location.origin}/`,
                  })
                }
                className="px-4 py-2 rounded-full my-2 text-red-500 flex items-center gap-2"
              >
                Odjavi se <PiSignOutBold />
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserNav;
