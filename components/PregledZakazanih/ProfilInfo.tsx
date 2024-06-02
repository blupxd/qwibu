"use client";
import Image from "next/image";
import React from "react";
import image from "../../public/images/radnik.jpg";
import Link from "next/link";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfilInfo = () => {
  const data = {
    labels: ["Uradjeno", "Ostalo"],
    datasets: [
      {
        borderRadius: 10,
        borderWidth: 5,
        rotation: 270,
        data: [3, 7],
        backgroundColor: ["#0352fc", "#6274fc"],
        hoverBackgroundColor: ["#0352fc", "#6274fc"],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    cutout: "60%",
  };

  return (
    <div className="flex items-center justify-between m-12">
      <div className="flex items-center">
        <div className="w-32 h-32 border-6 border-indigo-800 rounded-full overflow-hidden relative">
          <Image src={image} alt="slika" fill objectFit="cover" />
        </div>
        <div className="ml-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Zdravo, <span className="text-indigo-700 ">Matija Stefanovic</span>
          </h1>
          <h2 className="text-base text-gray-600 mb-4">Radnik</h2>
          <Link
            href="/moj-profil"
            className="text-white bg-indigo-700 px-4 py-2 rounded-lg inline-block"
          >
            Pregled profila
          </Link>
        </div>
      </div>
      <div className="ml-12 text-right block">
        <h1 className="text-2xl font-semibold text-indigo-700">
          Današnji termini
        </h1>
        <div className="flex gap-12">
          <div className="mt-6 block">
            <h3 className="text-xl text-gray-800">Urađeni poslovi:</h3>
            <h4 className="text-xl text-gray-500">3/10</h4>
          </div>
          <div className="w-24 relative">
            <h1 className="absolute inset-0 flex items-center justify-center text-gray-800 text-2xl font-bold">
              3/10
            </h1>
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilInfo;
