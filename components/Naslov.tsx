"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Naslov: React.FC = () => {
  const naslovi: string[] = [
    "Zakaži šminku za proslavu",
    "Pruži svom telu zaslužen tretman",
    "Kosa ti nije u najboljem stanju?",
    "Pronađi uslugu koja ti treba",
    "Nokte moraš da središ?",
  ];
  const [trenutniNaslov, setTrenutniNaslov] = useState<string>(naslovi[0]);
  const [animationKey, setAnimationKey] = useState<number>(0); // Dodajemo ključnu promenljivu za ponovno montiranje animacije
  const [key, setKey] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (key === naslovi.length-1) {
        setKey(0);
      } else setKey(key + 1);
      const noviNaslov = naslovi[key];
      setTrenutniNaslov(noviNaslov);
      setAnimationKey((prevKey) => prevKey + 1); // Povećavamo ključ za ponovno montiranje animacije
    }, 5000);
    return () => clearInterval(interval);
  }, [naslovi]);

  return (
    <motion.h1
      key={animationKey} // Dodajemo ključnu properti za ponovno montiranje animacije
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="text-gray-900 font-bold title text-6xl md:text-7xl mb-12 h-32 flex items-end text-center"
    >
      {trenutniNaslov}
    </motion.h1>
  );
};

export default Naslov;
