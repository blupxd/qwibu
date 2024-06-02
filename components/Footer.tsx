import React from "react";
import {
  faTiktok,
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "../public/dummyData.json";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-gray-950 px-12 pt-24 pb-12 grid grid-cols-3 gap-12">
      <div className="text-white">
        <h2 className="text-lg font-semibold mb-4">Najčešće usluge</h2>
        <ul className="list-none text-sm">
          {data.slice(0, 6).map((service, index) => (
            <li key={index} className="mb-4">
              <Link href="/">{service.naziv}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-white">
        <h2 className="text-lg font-semibold mb-4">Korisni linkovi</h2>
        <ul className="list-none text-sm">
          <li className="mb-2">Postani partner</li>
          <li className="mb-2">Informacije</li>
          <li className="mb-2">Pomoć</li>
          <li className="mb-2">FAQ</li>
        </ul>
      </div>

      <div className="text-white">
        <h2 className="text-lg font-semibold mb-4">Pratite nas</h2>
        <div className="flex gap-4">
          <FontAwesomeIcon icon={faTiktok} size="2x" />
          <FontAwesomeIcon icon={faInstagram} size="2x" />
          <FontAwesomeIcon icon={faFacebook} size="2x" />
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
