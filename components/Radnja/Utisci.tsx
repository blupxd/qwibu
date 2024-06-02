import React, { useState } from "react";
import user from "../../public/images/radnik.jpg";
import Image from "next/image";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { format } from "date-fns";

interface Review {
  user: string;
  date: string;
  text: string;
  rating: number;
}

const Utisci: React.FC = () => {
  const reviews: Review[] = [
    {
      user: "Korisnik1",
      date: "12.5.2024.",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel elit eget nulla hendrerit vestibulum vitae eget sem. Nulla at blandit massa, eget placerat mi.",
      rating: 5,
    },
    {
      user: "Korisnik2",
      date: "12.5.2024.",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      rating: 4,
    },
    {
      user: "Korisnik3",
      date: "12.5.2024.",
      text: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      rating: 3,
    },
  ];

  const [expanded, setExpanded] = useState<boolean[]>(
    Array(reviews.length).fill(false)
  );
  const [prikaz, setPrikaz] = useState<number>(2);
  const toggleExpanded = (index: number) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };
  // 3
  const getRating = (rating: number) => {
    const razlika = 5 - rating;
    return (
      <>
        {Array(rating)
          .fill(null)
          .map((x, y) => (
            <FaStar key={y} className="text-gray-900" />
          ))}
        {Array(razlika)
          .fill(null)
          .map((x, y) => (
            <FaRegStar key={y} className="text-gray-900" />
          ))}
      </>
    );
  };

  return (
    <div className="flex flex-col mt-2">
      <div className="flex flex-col">
        <h1 className="text-gray-800 text-2xl mb-4 md:mb-2 lg:mb-4">Recenzije</h1>
        <div className="flex gap-1 mb-1 text-3xl md:text-2xl lg:text-lg text-gray-800 items-center">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div className="flex items-center md:mb-12 lg:mb-6 text-lg lg:text-sm">
          <h1 className="font-semibold">5.0</h1>
          <p className="text-blue-500 ml-1">(23)</p>
        </div>
      </div>

      {reviews.slice(0, prikaz).map((review, index) => (
        <div key={index} className="mb-4 md:mb-12 px-4 py-6 rounded-xl bg-white shadow-lg shadow-black/20 lg:shadow-black/10">
          <div className="flex mb-2">
            <div className="mt-1 overflow-hidden relative lg:w-12 lg:h-12 md:w-16 md:h-16 w-16 h-16 rounded-full mr-2">
              <Image src={user} alt="User" objectFit="cover" fill />
            </div>

            <div className="flex flex-col">
              <h2 className="text-gray-900 -mb-1 font-medium text-base lg:text-sm">
                {review.user}
              </h2>
              <h3 className="text-gray-600 text-sm lg:text-xs">
                {format(new Date(review.date), "MMM d, yyyy")}
              </h3>
              <div className="flex items-center text-sm md:text-base lg:text-xs">
                {getRating(review.rating)}
              </div>
            </div>
          </div>
          <p
            className={`text-gray-600 mb-2 text-base md:text-base lg:text-xs ${
              expanded[index] ? "" : "text-ellipsis overflow-hidden"
            }`}
          >
            {expanded[index]
              ? review.text
              : `${review.text.substring(0, 80)}...`}
            <button
              className="text-blue-500 text-sm md:text-base lg:text-xs font-semibold hover:text-blue-400 focus:outline-none"
              onClick={() => toggleExpanded(index)}
            >
              {expanded[index] ? "Vidi manje" : "Vidi vise"}
            </button>
          </p>
        </div>
      ))}
      <button
        className="text-blue-500"
        onClick={() => {
          if (prikaz >= 2 && prikaz <= reviews.length) {
            setPrikaz(prikaz + 2);
          } else setPrikaz(2);
        }}
      >
        {prikaz === 2 ? "Prikaži više" : "Prikaži manje"}
      </button>
    </div>
  );
};

export default Utisci;
