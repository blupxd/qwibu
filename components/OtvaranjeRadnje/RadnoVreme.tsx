"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Time from "./Time";

interface Dan {
  dan: string;
  label: string;
  pocetak: string;
  kraj: string;
  on: boolean;
}

interface RadnoVremeProps {
  formData: {
    dani: any;
  };
  updateDani: (dani: Partial<Dan>[]) => void;
}

const initialDani: Dan[] = [
  { dan: "ponedeljak", label: "Ponedeljak", pocetak: "", kraj: "", on: false },
  { dan: "utorak", label: "Utorak", pocetak: "", kraj: "", on: false },
  { dan: "sreda", label: "Sreda", pocetak: "", kraj: "", on: false },
  { dan: "cetvrtak", label: "Četvrtak", pocetak: "", kraj: "", on: false },
  { dan: "petak", label: "Petak", pocetak: "", kraj: "", on: false },
  { dan: "subota", label: "Subota", pocetak: "", kraj: "", on: false },
  { dan: "nedelja", label: "Nedelja", pocetak: "", kraj: "", on: false },
];

const RadnoVreme: React.FC<RadnoVremeProps> = ({ updateDani, formData }) => {
  const [dani, setDani] = useState<Dan[]>(initialDani);

  useEffect(() => {
    setDani(
      initialDani.map((dan, index) => ({
        ...dan,
        pocetak: formData.dani[index]?.pocetak || "",
        kraj: formData.dani[index]?.kraj || "",
        on: formData.dani[index]?.pocetak ? true : false,
      }))
    );
  }, []);

  const handleToggle = (index: number) => {
    const newDani = [...dani];
    newDani[index].on = !newDani[index].on;
    setDani(newDani);
    updateDani(newDani);
  };

  const handleSelectTime = (
    index: number,
    timeType: "pocetak" | "kraj",
    time: Date | null
  ) => {
    const newDani = [...dani];
    newDani[index][timeType] = time ? time+"" : "";
    setDani(newDani);
    updateDani(newDani);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {dani.map((dan, index) => (
        <div key={dan.dan} className="flex flex-col p-2 bg-white rounded-xl">
          <label className="inline-flex items-center cursor-pointer gap-2">
            <input
              type="checkbox"
              onChange={() => handleToggle(index)}
              checked={dan.on}
              className="hidden peer"
            />
            <div className="relative w-8 h-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-[2px] after:start-[4px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
            {dan.label}
          </label>
          <AnimatePresence>
            {dan.on && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="bg-white p-1 flex items-center gap-4 w-full"
              >
                <Time
                  vreme={dan.pocetak}
                  onSelectTime={(time: Date | null) =>
                    handleSelectTime(index, "pocetak", time)
                  }
                />
                <label className="text-sm text-gray-700">do</label>
                <Time
                  vreme={dan.kraj}
                  onSelectTime={(time: Date | null) =>
                    handleSelectTime(index, "kraj", time)
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default RadnoVreme;
