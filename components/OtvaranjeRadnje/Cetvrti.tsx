"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineAddBox, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import TimePicker from "./TimePicker";

interface CetvrtiProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: {
    usluge: any[];
  };
  setFormData: (data: any) => void;
}

const Cetvrti: React.FC<CetvrtiProps> = ({ nextStep, prevStep, setFormData, formData }) => {
  const vremena = [
    { value: 0.5, label: "30min" },
    { value: 1, label: "1h" },
    { value: 1.5, label: "1h 30min" },
    { value: 2, label: "2h" },
    { value: 2.5, label: "2h 30min" },
    { value: 3, label: "3h" },
  ];

  const initialUsluga = { naziv: "", trajanje: "", slika: null };
  const [usluga, setUsluga] = useState<any>(initialUsluga);
  const [edit, setEdit] = useState<{ open: boolean; index: number | null }>({ open: false, index: null });
  const [showError, setShowError] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUsluga({ ...usluga, slika: event.target.files[0] });
      // Reset the input value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsluga({ ...usluga, [e.target.name]: e.target.value });
    setShowError(false);
  };

  const deleteUsluga = (key: number) => {
    setFormData({ ...formData, usluge: formData.usluge.filter((_, index) => index !== key) });
  };

  const startEdit = (key: number) => {
    setEdit({ open: true, index: key });
    setUsluga(formData.usluge[key]);
  };

  const vremeSelected = (param: number) => vremena.find((x) => x.value === param)?.label;

  const handleEditService = () => {
    if (!usluga.naziv || !usluga.trajanje) {
      setShowError(true);
      return;
    }
    const updatedUsluge = formData.usluge.map((item, index) => (index === edit.index ? usluga : item));
    setFormData({ ...formData, usluge: updatedUsluge });
    setUsluga(initialUsluga);
    console.log(formData);
    setEdit({ open: false, index: null });
  };

  const handleAddService = () => {
    if (!usluga.naziv || !usluga.trajanje) {
      setShowError(true);
      return;
    }
    setFormData({ ...formData, usluge: [...formData.usluge, usluga] });
    setUsluga(initialUsluga);
    setReset(true);
    setTimeout(() => setReset(false), 100);
  };

  const handleChangeInterval = (interval: number) => setUsluga({ ...usluga, trajanje: interval });

  return (
    <div className="flex flex-col">
      <h1 className="text-sm text-gray-400 mb-4">
        Dodajte Vaše usluge koje pružate, nazovite ih, postavite trajanje i stavite jednu sliku koja stoji uz tu uslugu
      </h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="naziv" className="text-gray-700 text-sm">Naziv usluge</label>
          <input
            type="text"
            id="naziv"
            value={usluga.naziv}
            onChange={handleInputChange}
            name="naziv"
            className="border text-sm border-gray-300 rounded-md pl-4 pr-12 py-1 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col relative w-48">
          <label htmlFor="trajanje" className="text-gray-700 text-sm">Trajanje</label>
          <TimePicker vremePick={usluga.trajanje} reset={reset} intervals={vremena} setIntervalTime={handleChangeInterval} />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="images" className="rounded-xl h-full relative flex items-center overflow-hidden cursor-pointer justify-center p-4 border-gray-300 hover:border-blue-400 border">
            <IoImageOutline className="text-xl text-gray-400 cursor-pointer absolute hover:text-blue-400" />
            {usluga.slika && (
              <Image alt="slika" src={URL.createObjectURL(usluga.slika)} layout="fill" objectFit="cover" className="opacity-50" />
            )}
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            onChange={handleImagesChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        {showError && <span className="text-red-500 text-sm">Niste popunili sva polja</span>}
      </div>
      {!edit.open ? (
        <button onClick={handleAddService} className="text-sm p-2 rounded-lg flex items-center gap-2 max-w-max text-white bg-blue-500">
          Dodaj uslugu <MdOutlineAddBox className="text-xl" />
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button onClick={handleEditService} className="text-sm p-2 rounded-lg flex items-center gap-2 max-w-max text-white bg-gray-800">
            Izmeni uslugu <FaEdit className="text-xl" />
          </button>
          <button onClick={() => { setEdit({ open: false, index: null }); setUsluga(initialUsluga); }} className="rounded-lg flex items-center text-sm gap-1 max-w-max max-h-max p-2 text-white bg-red-500">
            Odustani <TiCancel className="w-5 h-full" />
          </button>
        </div>
      )}
      <div className="flex items-center overflow-x-scroll my-6">
        {formData.usluge.map((usluga, key) => (
          <div key={key} className="flex flex-col mr-4">
            <div className="relative overflow-hidden rounded-xl h-24 w-24 bg-black">
              {usluga.slika && (
                <Image alt="slika" src={URL.createObjectURL(usluga.slika)} layout="fill" objectFit="cover" className="opacity-50" />
              )}
              <div className="flex items-center justify-around absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 hover:opacity-100">
                <button onClick={() => deleteUsluga(key)} className="text-sm bg-red-500 w-8 h-8 flex items-center justify-center px-2 rounded-full py-1 text-white">
                  <AiOutlineDelete />
                </button>
                <button onClick={() => startEdit(key)} className="text-sm bg-blue-500 w-8 h-8 flex items-center justify-center rounded-full px-2 py-1 text-white">
                  <FaEdit />
                </button>
              </div>
            </div>
            <div className="flex flex-col text-center">
              <h1 className="text-gray-700 text-sm">{usluga.naziv}</h1>
              <h2 className="text-gray-400 text-xs">{vremeSelected(usluga.trajanje)}</h2>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-400">* Napomena: Molimo Vas da popunite sva obavezna polja kako biste uspešno nastavili sa procesom.</p>
      <div className="flex items-center justify-between mt-6">
        <button onClick={prevStep} className="text-sm text-gray-700 flex items-center gap-2 px-4 py-2 rounded-lg">
          <MdOutlineKeyboardArrowLeft className="w-6 h-6" /> Nazad
        </button>
        <button disabled={formData.usluge.length === 0} onClick={nextStep} className={`text-sm text-white ${formData.usluge.length > 0 ? "bg-blue-500" : "bg-gray-400"} px-4 py-2 rounded-full`}>
          Nastavi
        </button>
      </div>
    </div>
  );
};

export default Cetvrti;
