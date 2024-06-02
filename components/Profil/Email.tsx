import {
  faEdit,
  faExclamation,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Email = () => {
  return (
    <div className="p-4 flex flex-col gap-6 border-gray-300 border mt-2 rounded-lg">
      <div className="flex flex-col">
        <label htmlFor="lokacija" className="text-gray-600">
          Username
        </label>
        <div className="flex items-center gap-2">
          <p className="px-4 py-2 text-gray-500 border-gray-300 border rounded-md w-48">
            @matijastefanovic5
          </p>
          <button className="text-indigo-400">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="ime" className="text-gray-600">
          Email adresa
        </label>
        <div className="flex items-center gap-2">
          <p className="px-4 py-2 text-gray-500 border-gray-300 border rounded-md w-64">
            mailadresa@mail.com
          </p>
          <button className="text-indigo-400">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <p className="italic text-sm text-indigo-300">
          *Napomena: email adresu mozete da promenite na svake 2 nedelje
        </p>
      </div>
      <div className="flex items-center">
        <p className="text-sm text-red-400">
          <FontAwesomeIcon icon={faWarning} /> Vasa email adresa nije verifikovan!
        </p>
        <button className="text-white bg-red-400 ml-2 px-2 py-1 rounded-sm">
          Verifikuj
        </button>
      </div>
      <div className="flex flex-col">
        <label htmlFor="prezime" className="text-gray-600">
          Telefon
        </label>
        <div className="flex items-center gap-2">
          <p className="px-4 py-2 text-gray-500 border-gray-300 border rounded-md w-48">
            +381 60 1234 567
          </p>
          <button className="text-indigo-400">
            <FontAwesomeIcon icon={faEdit} />
          </button>
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

export default Email;
