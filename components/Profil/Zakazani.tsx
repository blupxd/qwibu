"use client";
import React, { useEffect, useState } from "react";
import slika from "../../public/images/dummy.jpg";
import zakazani from "../../public/dummyZakazani.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignRight,
  faClose,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { LuCalendarClock } from "react-icons/lu";
import Link from "next/link";

const fetchRadnja = async (id: string) => {
  try {
    const response = await fetch(`/api/user?id=${id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result.user.schedules; // Change to result.user.schedules to access schedules
    } else {
      console.error(
        "Greška prilikom dobijanja schedula:",
        await response.json()
      );
    }
  } catch (error) {
    console.error("Greška prilikom slanja forme:", error);
  }
  return null;
};

const Zakazani = () => {
  const [schedules, setSchedules] = useState<Array<any>>([]);
  const show = false;
  const { data: session } = useSession();

  const proveraDatuma = (param: String) => {
    const datum = new Date();
    const danasnjiDan = datum.getDate();
    const danasnjiMesec = datum.getMonth() + 1;
    const datumZaProveru = param.split("-");
    const convert = datumZaProveru.map((broj) => parseInt(broj));

    if (danasnjiMesec === convert[1]) {
      switch (convert[2]) {
        case danasnjiDan:
          return "Danas";
        case danasnjiDan + 1:
          return "Sutra";
        case danasnjiDan + 2:
          return "Prekosutra";
        default:
          return convert[2] + "." + convert[1];
      }
    } else return "Sledeci mesec";
  };

  useEffect(() => {
    const loadSchedules = async () => {
      if (session?.user?.id) {
        const data = await fetchRadnja(session.user.id);
        if (data) {
          setSchedules(data);
        }
      }
    };

    loadSchedules();
  }, [session?.user?.id]);
  return (
    <div className="block gap-2 mt-0 md:mt-24 mx-4 md:mx-24">
      <h1 className="text-3xl font-semibold text-gray-800">
        Your appointments
      </h1>
      <div className="flex py-12 md:flex-row flex-col items-center mt-6">
        {schedules.map((schedule, key) => (
          <div
            key={key}
            className="w-full md:w-72 rounded-xl relative overflow-hidden shadow-md shadow-black/20 flex flex-col"
          >
            <Link
              href={`/radnja/${schedule.radnjaId}`}
              className=" w-full h-40 overflow-hidden relative"
            >
              <Image
                className="hover:scale-110 transition-all duration-500 ease-in-out"
                src={slika}
                alt="profilna"
                fill
                objectFit="cover"
              />
              <h3 className="absolute bottom-2 font-extralight z-10 left-2 text-lg text-white flex items-center gap-2">
                <LuCalendarClock className="-mt-1" />{" "}
                {format(new Date(schedule.time), "hh:mm aa dd.MMM")}
              </h3>
              <button className="absolute bottom-2 z-10 right-2 text-white px-2 text-sm py-1 bg-red-600 rounded-lg">
                Cancel
              </button>
              <span className="pointer-events-none bg-gradient-to-t from-black/50 to-transparent absolute top-0 left-0 right-0 bottom-0" />
            </Link>
            <div className="block p-4 bg-gray-200">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">
                  Sisanje na kratko
                </h1>
                <p className="text-base text-gray-500">900 RSD</p>
              </div>

              <h2 className="text-gray-600">with {schedule.workerId}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Zakazani;
