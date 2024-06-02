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
  const { data: session, update  } = useSession()
  const userId = session?.user.id
  const router = useRouter()
  const [firstName, setFirstName] = useState(""); // Stanje za ime
  const [lastName, setLastName] = useState(""); // Stanje za prezime

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
        const response = await fetch(`/api/user`, { // Dodajemo ID korisnika u URL
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userId, name: fullName }),
        });
        if (response.ok) {
          update({name: fullName})
          router.refresh()
        } else {
          console.error('Došlo je do greške prilikom ažuriranja imena.');
        }
      } catch (error) {
        console.error('Došlo je do greške prilikom ažuriranja imena:', error);
      }
    }
  };

  return (
    <div className="p-6 flex flex-col shadow-md shadow-gray-500/70 w-96 h-full bg-white rounded-lg">
      <h1 className="text-gray-600 font-semibold text-3xl text-center my-4">
        Uskoro ste spremni! 🤙
      </h1>
      <div className="flex flex-col items-center">
        <h1 className="text-sm mb-4 font-bold text-blue-500">
          Postavite vašu sliku
        </h1>
        <div className="w-24 rounded-full border-[5px] border-gray-300 h-24 relative overflow-hidden">
          <Image src={image} alt="profileImage" fill objectFit="cover" />
          <button className="absolute opacity-0 hover:opacity-100 transition-all duration-200 ease-in-out flex flex-col items-center justify-center z-10 w-full h-full text-2xl bg-blue-500/40 text-white">
            <FontAwesomeIcon icon={faImage} />
            <span className="text-xs">Izaberi sliku</span>
          </button>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        {/* Labela i input polje za ime */}
        <label htmlFor="firstName" className="mb-2 text-gray-600">
          Ime:
        </label>
        <input
          type="text"
          id="firstName"
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
          placeholder="Unesite ime"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        {/* Labela i input polje za prezime */}
        <label htmlFor="lastName" className="mb-2 text-gray-600">
          Prezime:
        </label>
        <input
          type="text"
          id="lastName"
          className="border border-gray-300 rounded-md px-2 py-1 mb-4 w-full"
          placeholder="Unesite prezime"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <button
          onClick={handleSaveProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
            className="text-blue-500 hover:underline"
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
