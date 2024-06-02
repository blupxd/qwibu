"use client";
import React, { useEffect, useState } from "react";
import usluge from "../public/dummyServices.json";
import slika from "../public/images/dummy.jpg";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaStar } from "react-icons/fa";
import Loader from "./Loader";

const fetchRadnja = async () => {
  try {
    const response = await fetch(`/api/radnja`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result.radnje;
    } else {
      console.error(
        "Greška prilikom registracije radnje:",
        await response.json()
      );
    }
  } catch (error) {
    console.error("Greška prilikom slanja forme:", error);
  }
  return null;
};

const Istakunti = () => {
  const [radnje, setRadnje] = useState<any>([]);
  useEffect(() => {
    const loadRadnja = async () => {
      const data = await fetchRadnja();
      setRadnje(data);
      console.log(data);
    };

    loadRadnja();
  }, []);
  return (
    <div className="px-4 py-12 md:p-12 flex flex-col bg-white text-white">
      <h1 className="text-3xl mb-6 text-gray-900">
        Izdvojene radnje u gradu{" "}
        <span className="text-gray-800 font-semibold">Beogradu</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {radnje.length > 0 ? (
          radnje.slice(0, 4).map((radnja: any, key: number) => (
            <div className="flex flex-col" key={key}>
              <Link
                href={`/radnja/${radnja.id}`}
                className="relative h-44 rounded-md overflow-hidden transition duration-300 ease-in-out"
              >
                <Image
                  src={radnja?.images[0] || slika}
                  alt="slika"
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-110 transition-all duration-500 ease-in-out"
                />
                <button className="bg-white p-2 rounded-full text-gray-900 absolute top-4 left-4">
                  <FaRegHeart />
                </button>
              </Link>
              <div className="text-gray-900 mt-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{radnja.naziv}</h2>
                  <Link
                    href="/"
                    className="text-xs text-gray-600 border border-gray-400 rounded-full px-2 py-1 hover:bg-gray-400 hover:text-white transition-all duration-200 ease-in-out"
                  >
                    Sisanje
                  </Link>
                </div>
                <p className="text-sm text-gray-400">{radnja.adresa}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <h1 className="text-sm mt-1 font-bold">(123 Recenzija)</h1>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
      {radnje.length > 4 && (
        <button className="text-white mt-12 rounded-full bg-gray-800 max-w-max mx-auto px-4 py-2">
          Vidi jos
        </button>
      )}
    </div>
  );
};

export default Istakunti;
