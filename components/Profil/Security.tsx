import {
  faCreditCard,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import mastercard from "../../public/images/mastercard.png";

const Security = () => {
  return (
    <div className="p-4 flex flex-col gap-6 border-gray-300 border mt-2 rounded-lg">
      <div className="flex flex-col">
        <p className="text-red-400 text-sm">
          Sigurnost i bezbednost je na prvom mestu. Vaš nalog nema aktiviran Two
          Factor Autentifikaciju(2FA).
        </p>
        <button className="bg-red-400 max-w-max text-white rounded-lg text-sm mt-2 px-2 py-1">
          Aktiviraj 2FA
        </button>
      </div>

      <div className="flex flex-col">
        <label htmlFor="prezime" className="text-gray-600">
          Racun za isplatu
        </label>
        <div className="flex items-center gap-2">
          <p className="px-4 py-2 text-gray-500 border-gray-300 border rounded-md w-64">
            845-57712713-3000
          </p>
          <button className="text-indigo-400">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="prezime" className="text-gray-600">
          Lozinka
        </label>
        <div className="flex items-center gap-2">
          <input
            className="px-4 py-2 text-gray-500 border-gray-300 border rounded-md w-48"
            type="password"
            value="xdddddada"
          />
          <button className="text-indigo-400">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-gray-700 ">
          <FontAwesomeIcon icon={faCreditCard} />
          <h1 className="text-xl">Vase kreditne kartice</h1>
        </div>
        <p className="text-gray-500">Upravljajte vasim kreditnim karticama</p>
        <button className="px-4 py-2 bg-gray-800 mt-6 max-w-max text-white rounded-lg">
          Dodaj karticu
        </button>
        <div className="block mt-2">
          <div className="flex items-center gap-2 p-4 border-gray-300 border max-w-max">
            <Image src={mastercard} alt="ikonica" width={45} />
            <div className="flex flex-col items-start">
              <h1 className="text-gray-600 font-bold text-sm">
                Mastercard, 4214
              </h1>
              <p className="text-sm">Exp. date 07/26</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-white bg-indigo-600 px-4 py-1">Izabrana</p>
              <div className="flex flex-col">
                <button className="text-indigo-400">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="text-red-400">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4 justify-end">
        <button className="text-red-400 font-semibold px-4 py-2">Otakzi</button>
        <button className="text-white bg-indigo-500 px-4 py-2">
          Sacuvaj izmene
        </button>
      </div>
    </div>
  );
};

export default Security;
