"use client";
import React, { useState } from "react";
import Image from "next/image";
import slika from "../../public/images/radnik.jpg";
import { PiUsersThree } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import Kalendar from "./Kalendar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropagateLoader } from "react-spinners";
import { format } from "date-fns";
import { FaCircleCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
import { IoCloseCircleSharp } from "react-icons/io5";

interface ZakazivanjeProps {
  setZakazi: React.Dispatch<React.SetStateAction<boolean>>;
  radnja: any;
  usluga: string;
}

interface RadniciArr {
  ime: string;
  prezime: string;
  role: string;
}

const Radnici: React.FC<ZakazivanjeProps> = ({ setZakazi, radnja, usluga }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [vreme, setVreme] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sendStatus, setSendStatus] = useState<boolean | null>(null);
  const [steps, setSteps] = useState<number>(0);

  const radnici: RadniciArr[] = [
    {
      ime: "Any",
      prezime: "Any",
      role: "Any"
    },
    {
      ime: "Marko",
      prezime: "Petrović",
      role: "Master Barber",
    },
    {
      ime: "Jovana",
      prezime: "Nikolić",
      role: "Master Barber",
    },
    {
      ime: "Stefan",
      prezime: "Đorđević",
      role: "Master Barber",
    },
  ];

  const handleFormSubmit = async (
    workerId: string,
    radnjaId: string,
    time: Date | null
  ) => {
    console.log("Submitting form with data:", { workerId, radnjaId, time });
    setLoading(true);
    try {
      const body = { workerId, radnjaId, time };

      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Uspešno poslano:", result);
        setSendStatus(true);
        setTimeout(() => location.reload(), 2000);
      } else {
        const errorResponse = await response.json();
        console.error("Greška prilikom zakazivanja:", errorResponse);
        setSendStatus(false);
        setTimeout(() => location.reload(), 2000);
      }
    } catch (error) {
      console.error("Greška prilikom slanja forme:", error);
      setSendStatus(false);
    }
  };

  return (
    <div className="bg-white px-4 pt-12 md:p-12 md:max-h-max rounded-t-3xl md:rounded-xl flex flex-col gap-4 mx-0 lg:mx-64 mt-6 absolute left-0 right-0 bottom-0 h-[90%] lg:my-12">
      {loading && (
        <div className="absolute flex items-center justify-center bg-white z-40 w-full h-full top-0 left-0">
          {sendStatus === null ? (
            <div className="flex flex-col gap-6 items-center  md:px-6 px-0">
              <h1 className="font-bold text-xl">
                We are booking your schedule
              </h1>
              <PropagateLoader color="#222229" size={16} />
            </div>
          ) : sendStatus ? (
            <div className="flex flex-col gap-6 items-center md:px-6 px-0">
              <h1 className="text-xl w-72 text-center md:w-auto">
                You've successfully made an appointment for{" "}
                <strong>
                  {format(new Date(vreme!), "d MMMM yyyy. - hh:mm a")}
                </strong>
              </h1>
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.5 }}
              >
                <FaCircleCheck className="w-24 h-24 text-gray-700" />
              </motion.div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 items-center">
              <h1 className="text-xl text-center w-72 md:w-auto">
                An error has occurred while making your appointment!
              </h1>
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.5 }}
              >
                <IoCloseCircleSharp className="w-24 h-24 text-red-400" />
              </motion.div>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center justify-between text-gray-900">
        <h1 className="text-left text-2xl font-semibold">
          {steps === 0 ? "Izaberite radnika" : "Izaberite termin"}
        </h1>
        {!steps ? (
          <button
            onClick={() => setSteps(steps + 1)}
            className="text-xl flex items-center"
          >
            Nastavi
          </button>
        ) : (
          <button
            onClick={() => setSteps(steps - 1)}
            className="text-xl flex items-center"
          >
            Nazad
          </button>
        )}
      </div>

      {!steps && radnja ? (
        <div className="grid grid-cols-1 overflow-y-scroll no-scrollbar md:grid-cols-3 items-center gap-6">
          <div
            onClick={() => setSelected(0)}
            className={`flex flex-col justify-center items-center h-48 rounded-xl ${
              selected === 0
                ? "border-gray-500 border-2"
                : "border-gray-300 border"
            } cursor-pointer`}
          >
            <PiUsersThree className="w-10 h-16" />
            <div className="flex flex-col items-center">
              <h1 className="text-gray-900 text-normal">Prvi slobodni</h1>
              <h2 className="text-gray-500 text-sm">Sto pre do usluge</h2>
            </div>
          </div>
          {radnici.slice(1,4).map((radnik: RadniciArr, key: number) => (
            <div
              key={key}
              onClick={() => setSelected(key+1)}
              className={`flex flex-col justify-center items-center h-48 rounded-xl ${
                selected === key+1
                  ? "border-gray-500 border-2"
                  : "border-gray-300 border"
              } cursor-pointer`}
            >
              <div className="h-16 w-16 rounded-full overflow-hidden relative">
                <Image src={slika} alt="radnik" fill objectFit="cover" />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-gray-900 text-normal">{radnik.ime}</h1>
                <h2 className="text-gray-500 text-sm">{radnik.role}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          <Kalendar setVreme={setVreme} radnja={radnja} radnik={radnici[selected!].ime}/>
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-gray-600">
              <h1>
                <strong>Radnik </strong>
                {radnici[selected!].ime}
              </h1>
              <h1>
                <strong>Usluga </strong>
                {usluga}
              </h1>
            </div>
            <button
              onClick={() => {
                if (status === "authenticated" && session?.user?.id) {
                  handleFormSubmit(radnici[selected!].ime, radnja.id, vreme);
                } else {
                  router.push("/login");
                }
              }}
              disabled={!vreme}
              className={`${
                vreme ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-800"
              } px-6 py-2`}
            >
              Zakazi
            </button>
          </div>
        </div>
      )}
      <button
        className="absolute top-2 right-2 text-3xl md:text-xl text-gray-800"
        onClick={() => {
          setZakazi(false);
        }}
      >
        <IoMdClose className="w-full h-full" />
      </button>
    </div>
  );
};

export default Radnici;
