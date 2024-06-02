"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import TimePicker from "./TimePicker";
import Time from "./Time";

interface PetiProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: {
    prvaSmena: {
      pocetak: string;
      kraj: string;
    };
    drugaSmena: {
      pocetak: string;
      kraj: string;
    };
    interval: number;
  };
  setFormData: (data: any) => void;
}

interface Smene {
  prva: boolean;
  druga: boolean;
}

const intervals = [
  { value: 1, label: "1h" },
  { value: 1.5, label: "1h 30min" },
  { value: 2, label: "2h" },
  { value: 3, label: "3h" },
];

const Peti: React.FC<PetiProps> = ({ nextStep, prevStep, formData, setFormData }) => {
  const [smene, setSmene] = useState<Smene>({ prva: true, druga: false });
  const [vreme, setVreme] = useState(formData);
  const [error, setError] = useState<boolean>(false);

  const handleNextStep = () => {
    const { prvaSmena, drugaSmena, interval } = vreme;
    if (
      (smene.prva && (!prvaSmena.pocetak || !prvaSmena.kraj)) ||
      (smene.druga && (!drugaSmena.pocetak || !drugaSmena.kraj)) ||
      interval === 0
    ) {
      setError(true);
    } else {
      setFormData(vreme);
      nextStep();
    }
  };

  useEffect(() => {
    setFormData(vreme);
  }, [vreme, smene, setFormData]);

  const handleTimeSelect = (smena: 'prvaSmena' | 'drugaSmena', field: 'pocetak' | 'kraj', time: string) => {
    setVreme((prev) => ({
      ...prev,
      [smena]: { ...prev[smena], [field]: time },
    }));
  };

  const renderTimePicker = (label: string, smena: 'prvaSmena' | 'drugaSmena', field: 'pocetak' | 'kraj') => (
    <div className="flex flex-col">
      <label className="text-gray-400 mb-1">{label}</label>
      <Time
        vreme={vreme[smena][field]}
        onSelectTime={(params: Date | null) =>
          handleTimeSelect(smena, field, params ? params+"" : "")
        }
      />
    </div>
  );

  return (
    <div className="flex flex-col">
      <h1 className="text-sm text-gray-400 mb-4">
        Popunite polja za radno vreme pojedine smene, kao i raspon vremena izmedju termina
      </h1>
      <div className="flex flex-col mb-4 space-y-6">
        {["prva", "druga"].map((smena) => (
          <label key={smena} className="inline-flex items-center cursor-pointer gap-2">
            <input
              type="checkbox"
              checked={smene[smena as keyof Smene]}
              onChange={() => setSmene({ ...smene, [smena]: !smene[smena as keyof Smene] })}
              disabled={smena === "prva" ? !smene.druga : !smene.prva}
              className="hidden peer"
            />
            <div className="relative w-8 h-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-[2px] after:start-[4px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
            {`${smena.charAt(0).toUpperCase()}${smena.slice(1)} smena`}
          </label>
        ))}
        {smene.prva && (
          <div className="flex flex-col">
            <h2 className="text-lg text-blue-500 font-semibold mb-2">Prva smena</h2>
            <div className="flex gap-10">
              {renderTimePicker("Početak prve smene", "prvaSmena", "pocetak")}
              {renderTimePicker("Kraj prve smene", "prvaSmena", "kraj")}
            </div>
          </div>
        )}
        {smene.druga && (
          <div className="flex flex-col">
            <h2 className="text-lg text-blue-500 font-semibold mb-2">Druga smena</h2>
            <div className="flex gap-10">
              {renderTimePicker("Početak druge smene", "drugaSmena", "pocetak")}
              {renderTimePicker("Kraj druge smene", "drugaSmena", "kraj")}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-blue-500 text-lg font-semibold text-left" id="appointmentIntervalLabel">
          Interval termina
          <span className="text-xs text-gray-400 font-normal"> (raspon izmedju svakog termina)</span>
        </label>
        <TimePicker
          reset={false}
          vremePick={formData.interval}
          intervals={intervals}
          setIntervalTime={(interval: number) => setVreme((prev) => ({ ...prev, interval }))}
        />
      </div>
      {error && <span className="text-red-400 mt-6 text-sm">Molimo popunite sva polja za vreme.</span>}
      <p className="mt-4 text-sm text-gray-400">* Napomena: Molimo Vas da popunite sva obavezna polja kako biste uspešno nastavili sa procesom.</p>
      <div className="flex items-center justify-between mt-6">
        <button onClick={prevStep} className="text-sm text-gray-700 flex items-center gap-2 px-4 py-2 rounded-lg">
          <MdOutlineKeyboardArrowLeft className="w-6 h-6" />
          Nazad
        </button>
        <button onClick={handleNextStep} className="text-sm text-white bg-blue-500 px-4 py-2 rounded-full">
          Nastavi
        </button>
      </div>
    </div>
  );
};

export default Peti;
