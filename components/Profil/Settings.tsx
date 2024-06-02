"use client";
import {
  faAngleDown,
  faAngleUp,
  faEnvelope,
  faShield,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Licni from "./Licni";
import Email from "./Email";
import Security from "./Security";

const Settings = () => {
  const [clickedOption, setClickedOption] = useState(4);
  const settings = [
    {
      ikonica: faUser,
      title: "Moji podaci",
      description: "Podaci o profilnoj slici, imenu, prezimenu i ostalo",
    },
    {
      ikonica: faEnvelope,
      title: "E-mail i nalog",
      description: "Izmena email adrese naloga i verifikacija",
    },
    {
      ikonica: faShield,
      title: "Privatnost i kartice",
      description: "Zaštita vaših podataka, promena lozinke i plaćanja",
    },
  ];
  const handleSetting = (setting: Number) => {
    switch (setting) {
      case 0:
        return <Licni />;
        break;
      case 1:
        return <Email />;
        break;
      case 2:
        return <Security />;
        break;
      default:
        return;
    }
  };

  return (
    <div className="flex flex-col mx-12 w-full">
      <h1 className="text-gray-900 text-xl font-semibold">Podaci o nalogu</h1>
      <div className="flex flex-col gap-12 mt-12">
        {settings.map((stavka, key) => (
          <div className="flex flex-col" key={key}>
            <div
              className={`${
                clickedOption === key && " border-indigo-400"
              } border p-3 rounded-lg flex items-center gap-4`}
            >
              <FontAwesomeIcon
                icon={stavka.ikonica}
                className={`${
                  clickedOption === key ? "text-indigo-600" : "text-gray-900"
                } text-2xl w-8`}
              />
              <div className="block w-full text-sm">
                <h1 className="text-gray-900 text-base font-semibold">
                  {stavka.title}
                </h1>
                <p className="text-gray-400">{stavka.description}</p>
              </div>
              <button
                onClick={() =>
                  setClickedOption(clickedOption === key ? 4 : key)
                }
                className="text-gray-500"
              >
                {clickedOption === key ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </button>
            </div>
            {clickedOption === key && handleSetting(clickedOption)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
