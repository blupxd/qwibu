import Image from "next/image";
import React from "react";
import slika from "../../public/images/radnik.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

const Licni = () => {
  const {data: session} = useSession()

  return (
    <div className="p-4 flex flex-col border-gray-300 border mt-2 rounded-lg">
      <div className="flex flex-col justify-center">
        <div className="w-24 h-24 rounded-full my-2 relative overflow-hidden border-gray-400 border">
          <button className="w-full opacity-0 hover:opacity-100 h-full text-white text-xl bg-gray-800/50 absolute z-10">
            <FontAwesomeIcon icon={faEdit} />
            <br />
            <p className="text-xs">Izmena slike</p>
          </button>
          
          <Image src={session?.user.image!} quality={100} alt="profileImage" fill objectFit="cover" />
        </div>
        <h3 className="text-gray-600 font-bold">Profilna slika</h3>
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-6 ">
          <div className="flex flex-col">
            <label htmlFor="ime" className="text-gray-600">
              Ime
            </label>
            <div className="flex items-center gap-2">
              <p className="px-4 py-2 text-gray-500 border-gray-300 border rounded-md w-64">
                Matija
              </p>
              <button className="text-indigo-400">
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="prezime" className="text-gray-600">
              Prezime
            </label>
            <div className="flex items-center gap-2">
              <p className="px-4 py-2 text-gray-500 border-gray-300 border rounded-md w-64">
                Stefanovic
              </p>
              <button className="text-indigo-400">
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <label htmlFor="lokacija" className="text-gray-600">
                Lokacija
              </label>
              <div className="flex items-center gap-2">
                <p className="px-4 py-2 text-gray-500 border-gray-300 border rounded-md w-48">
                  Beograd
                </p>
                <button className="text-indigo-400">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4 justify-end">
        <button className="text-red-400 font-semibold px-4 py-2">
          Otakzi
        </button>
        <button className="text-white bg-indigo-500 px-4 py-2">
          Sacuvaj izmene
        </button>
      </div>
    </div>
  );
};

export default Licni;
