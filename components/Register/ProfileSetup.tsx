"use client";

import Image from "next/image";
import React, { useState } from "react";
import image from "@/public/images/userImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileSetup = () => {
  const { data: session, update } = useSession();
  const userId = session?.user.id;
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleSaveProfile = async () => {
    const fullName = `${firstName} ${lastName}`;
    if (firstName && lastName && userId) {
      try {
        const response = await fetch(`/api/user`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId, name: fullName }),
        });
        if (response.ok) {
          update({ name: fullName });
          router.refresh();
        } else {
          console.error("Došlo je do greške prilikom ažuriranja imena.");
        }
      } catch (error) {
        console.error("Došlo je do greške prilikom ažuriranja imena:", error);
      }
    }
  };

  return (
    <div className="p-8 mt-4 mx-auto w-96 flex flex-col" onClick={() => {}}>
      <Link
        className="absolute top-8 left-8 text-xl font-bold text-gray-800"
        href="/"
      >
        Qwibu
      </Link>
      <h1 className="text-3xl text-gray-700 font-bold mb-6 text-center">
        Podesite Vas profil
      </h1>
      <div className="flex flex-col items-center">
        <h1 className="text-sm mb-4 font-bold text-gray-500">
          Postavite vašu sliku
        </h1>
        <div className="w-24 rounded-full border-[5px] border-gray-300 h-24 relative overflow-hidden">
          <Image src={image} alt="profileImage" fill objectFit="cover" />
          <button className="absolute opacity-0 hover:opacity-100 transition-all duration-200 ease-in-out flex flex-col items-center justify-center z-10 w-full h-full text-2xl bg-gray-500/40 text-white">
            <FontAwesomeIcon icon={faImage} />
            <span className="text-xs">Izaberi sliku</span>
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <label htmlFor="firstName" className="mb-1 text-gray-500">
          Ime:
        </label>
        <input
          type="text"
          id="firstName"
          className="px-6 text-gray-800 mb-2 font-semibold py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-400"
          placeholder="Unesite ime"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <label htmlFor="lastName" className="mb-1 text-gray-500">
          Prezime:
        </label>
        <input
          type="text"
          id="lastName"
          className="px-6 text-gray-800 font-semibold py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-400"
          placeholder="Unesite prezime"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <button
          onClick={handleSaveProfile}
          className="bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none mt-4"
        >
          Sačuvaj
        </button>
        <p className="text-center text-xs text-gray-500 italic mt-4">
          Vaši lični podaci i slika pomažu da Vas lakše prepoznamo prilikom
          zakazivanja.
        </p>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm">
          Želite da pružate usluge?{" "}
          <Link
            className="text-gray-900 hover:underline"
            href="/pruzanje-usluga"
          >
            Kliknite ovdje
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ProfileSetup;
