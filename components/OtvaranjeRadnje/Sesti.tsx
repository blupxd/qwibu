import React from "react";
import { MdOutlineAddBox, MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface SestiProps {
  nextStep: () => void;
  prevStep: () => void;
}
const Sesti: React.FC<SestiProps> = ({ nextStep, prevStep }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-sm text-gray-400 mb-4">
        Popunite sledeća polja koja su vezana za ime vaše radnje, kontakt
        telefon, mejl i mesto gde se nalazi radnja.
      </h1>
      <div className="flex flex-col mb-4">
        <div className="flex items-center gap-6">
          <label htmlFor="nazivradnje" className="text-blue-500 text-base">
            Email zaposlenog
          </label>
          <input
            type="text"
            id="nazivradnje"
            name="nazivradnje"
            className="border text-sm border-gray-300 rounded-md pl-4 pr-12 py-2 focus:outline-none focus:border-blue-400"
          />
          <button className="text-sm p-2 rounded-lg flex items-center gap-6 max-w-max text-white bg-blue-500">
            <MdOutlineAddBox className="text-xl" />
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-400">
        * Napomena: Molimo Vas da popunite sva obavezna polja kako biste uspešno
        nastavili sa procesom.
      </p>
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prevStep}
          className="text-sm text-gray-700 flex items-center gap-2 px-4 py-2 rounded-lg"
        >
          <MdOutlineKeyboardArrowLeft className="w-6 h-6" />
          Nazad
        </button>
        <div className="flex items-center justify-between">
          <button
            onClick={nextStep}
            className="text-sm text-blue-500 px-4 py-2"
          >
            Preskoci
          </button>
          <button
            onClick={nextStep}
            className="text-sm text-white bg-blue-500 px-4 py-2 rounded-full"
          >
            Nastavi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sesti;
