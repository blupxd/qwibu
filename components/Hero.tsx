"use client";
import bg from "@/public/images/bg.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchSection from "./SearchSection";
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Naslov from "./Naslov";
import Image from "next/image";
import UserNav from "./UserNav";
import Navbar from "./Navbar";
import PrijavaRadnje from "./PrijavaRadnje";
import SearchComponent from "./SearchComponent";

interface SessionProp {
  session: any;
}

const Hero: React.FC<SessionProp> = ({ session }) => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="flex flex-col relative overflow-hidden">
      {scrollY >= 75 && <Navbar session={session} />}
      <nav className="flex items-center px-2 md:px-12 py-4 justify-between z-30">
        <div className="px-4 py-2 text-gray-800 text-lg font-bold">
          <Link href="/">Qwibu</Link>
        </div>
        {session?.user ? (
          <div className="flex gap-2 items-center text-sm">
            <UserNav profilna={session!} color="white" />
          </div>
        ) : (
          <div className="flex items-center text-sm gap-2 md:gap-4">
            <Link
              className="px-2 py-1 font-bold rounded-full text-gray-900"
              href="/login"
            >
              Prijavi se
            </Link>
            <Link
              className="px-2 py-1 rounded-full bg-gray-900 text-white"
              href="/register"
            >
              Registruj se
            </Link>
          </div>
        )}
      </nav>
      <div className="bg-gradient-to-br from-white to-gray-200 flex flex-col items-center justify-center h-[42rem] md:h-[36rem] z-10">
        <div className="flex flex-col items-center justify-center px-4 md:px-0">
          <Naslov />
          <SearchComponent setSearchOpen={setSearchOpen} />
          {!session?.user && (
            <Link
              href="/login"
              className="flex items-center font-semibold gap-2 text-xs px-4 py-2 rounded-full border bg-white border-gray-600 mt-6"
            >
              <FaRegUser className="text-base" /> Prijavite se za sačuvanu
              adresu
            </Link>
          )}
          {session?.user && (
            <>
              <button
                onClick={() => setFormOpen(true)}
                className="px-4 py-2 mt-12 text-sm text-white border-2 bg-gray-800"
              >
                Postani partner
              </button>
              {formOpen && <PrijavaRadnje session={session} />}
            </>
          )}
          <h1 className="text-2xl italic text-gray-600 font-medium mt-24">
            <strong>1,000+ </strong>registrovanih salona
          </h1>
        </div>
      </div>
      {searchOpen && <SearchSection setSearchOpen={setSearchOpen} />}
    </section>
  );
};

export default Hero;
