import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Image from "next/image";
import image from "../../public/images/radnik.jpg";

const Schedules: React.FC = () => {
  // Dummy podaci za demonstraciju
  const termini = [
    { ime: "Mika Mikic", pocetak: "12:00", kraj: "13:00" },
    { ime: "Pera Peric", pocetak: "11:00", kraj: "13:00" },
    { ime: "Jovan Jovanovic", pocetak: "14:00", kraj: "14:30" },
  ];
  const colorFunct = (param: number) => {
    switch (param) {
      case 2:
        return "bg-gray-800 text-white";
        break;
      case 3:
        return "bg-indigo-400 text-gray-700";
        break;
      default:
        return "bg-amber-400 text-gray-700";
    }
  };
  // Funkcija koja boji odgovarajuće ćelije u tabeli prema vremenskom rasponu termina
  const renderTabela = () => {
    const vremena = [
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "14:00",
      "14:30",
    ];

    return (
      <table className="table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2"></th>
            {vremena.map((vreme, index) => (
              <th
                key={index}
                className="px-4 text-gray-600 border-b border-gray-700 font-semibold py-6 text-center"
              >
                {vreme}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {termini.map((termin, index) => {
            let span = 1;
            vremena.forEach((vreme) => {
              const [pocetakSat, pocetakMin] = termin.pocetak.split(":");
              const [krajSat, krajMin] = termin.kraj.split(":");

              const [vremeSat, vremeMin] = vreme.split(":");

              if (
                (parseInt(vremeSat) > parseInt(pocetakSat) ||
                  (parseInt(vremeSat) === parseInt(pocetakSat) &&
                    parseInt(vremeMin) >= parseInt(pocetakMin))) &&
                (parseInt(vremeSat) < parseInt(krajSat) ||
                  (parseInt(vremeSat) === parseInt(krajSat) &&
                    parseInt(vremeMin) < parseInt(krajMin)))
              ) {
                span++;
              }
            });
            return (
              <tr key={index}>
                <td className="border bg-white rounded-lg px-4 py-2 flex">
                  <div className="rounded-full w-10 h-10 relative overflow-hidden">
                    <Image src={image} alt="profilna" fill objectFit="cover" />
                  </div>
                  <div className="block ml-2">
                    <p className="text-gray-800 font-semibold">{termin.ime}</p>
                    <button className="text-sm text-red-500">
                      Otkaži termin <FontAwesomeIcon icon={faClose} />
                    </button>
                  </div>
                </td>
                {vremena.map((vreme, key) => {
                  if (vreme === termin.pocetak) {
                    return (
                      <td
                        key={key}
                        className={`${colorFunct(
                          span
                        )} px-2 py-1 border-[2px] rounded-lg`}
                        colSpan={span}
                      >
                        {"Fade sisanje"}
                        <br />
                        <p className="text-xs font-semibold">
                          Trajanje: {termin.pocetak} - {termin.kraj}
                        </p>
                      </td>
                    );
                  } else {
                    return (
                      <td
                        key={key}
                        className="rounded-lg border-b border-gray-300"
                      ></td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg shadow-black/20">
      <div className="flex mx-24 items-center justify-between text-gray-800">
        <h1 className="text-xl font-semibold">Pregled termina</h1>
        <div className="flex items-center justify-center gap-2">
          <button>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <h1 className="text-xl font-semibold">Danas</h1>
          <button>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
        <button className="px-4 py-2 border-2 border-gray-600 rounded-lg flex items-center justify-center">
          Danas <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
        </button>
      </div>
      <div className="flex flex-col items-center">{renderTabela()}</div>
    </div>
  );
};

export default Schedules;
