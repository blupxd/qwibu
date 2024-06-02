"use client";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfToday,
  parse,
  add,
  isBefore,
  differenceInHours,
  addMinutes,
  set,
} from "date-fns";

// Constants
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Radnja {
  radnja: any;
}

const Kalendar: React.FC<Radnja> = ({ radnja }) => {
  const { dani, interval } = radnja;
  let today = startOfToday();
  const [selectedTermin, setSelectedTermin] = useState<Date | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(today, "MMM-yyyy")
  );
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const prevMonth = () => {
    const firstDayPrevMonth = add(firstDayCurrentMonth, { months: -1 });
    if (!isBefore(firstDayPrevMonth, format(today, "MMM-yyyy")))
      setCurrentMonth(format(firstDayPrevMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const days = eachDayOfInterval({
    start: startOfMonth(firstDayCurrentMonth),
    end: endOfMonth(firstDayCurrentMonth),
  });

  const isWorkDay = (day: Date) => {
    return dani.some(
      (interval: any, key: number) =>
        interval.pocetak !== "" && getDay(day) === key
    );
  };

  let colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];
  const termini = () => {
    const radni = dani.filter(
      (interval: any, key: number) =>
        getDay(selectedDay) === key && interval.pocetak !== ""
    );
    const radnoVreme = differenceInHours(
      new Date(radni[0].kraj),
      new Date(radni[0].pocetak)
    );
    const termini = [];
    const pocetno = new Date(radni[0].pocetak);
    const pocetniDatum = set(selectedDay, {
      hours: pocetno.getHours(),
      minutes: pocetno.getMinutes(),
      seconds: pocetno.getSeconds(),
    });
    for (let i = 0; i < radnoVreme; i = i + interval) {
      const termin = addMinutes(pocetniDatum, i * 60);
      termini.push(termin);
    }

    return termini.map((x, y) => (
      <button
        onClick={() => setSelectedTermin(x)}
        className={`text-base font-semibold w-14 h-14 rounded-full flex items-center justify-center p-2 ${
          isEqual(x,selectedTermin!)
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
        } hover:bg-blue-500 hover:text-white shadow-lg shadow-black/20`}
        key={y}
      >
        {format(x, "kk:mm")}
      </button>
    ));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mx-auto max-w-max">
        {isWorkDay(selectedDay) ? (
          <div className="flex items-center gap-6 overflow-x-scroll p-2">
            {termini()}
          </div>
        ) : (
          <div>Izabrali ste neradan dan!</div>
        )}

        <div className="flex items-center">
          <h1 className="flex-auto font-semibold text-gray-900">
            {format(firstDayCurrentMonth, "MMM yyyy.")}
          </h1>
          <button
            onClick={() => prevMonth()}
            className="flex flex-none items-center justify-center p-1.5 text-blue-400 hover:text-blue-500"
          >
            <FaChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => nextMonth()}
            className="ml-2 flex flex-none items-center justify-center p-1.5 text-blue-400 hover:text-blue-500"
          >
            <FaChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-x-4 md:gap-x-8 mt-2 text-xs leading-6 text-center text-gray-500">
          {daysOfWeek.map((day, idx) => (
            <div key={idx}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-x-4 md:gap-x-8 text-sm">
          {dani &&
            days.map((day, idx) => (
              <div
                key={idx}
                className={classNames(
                  idx === 0 && colStartClasses[getDay(day)],
                  "py-1.5"
                )}
              >
                <button
                  onClick={() => {
                    setSelectedDay(day);
                    setSelectedTermin(null);
                  }}
                  className={classNames(
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-blue-500",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-900",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-400",
                    isEqual(day, selectedDay) && isToday(day) && "bg-blue-500",
                    isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                    !isEqual(day, selectedDay) &&
                      !isBefore(day, today) &&
                      "hover:border-blue-600 hover:border-2",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    "mx-auto flex h-10 w-10 items-center justify-center rounded-full shadow-lg shadow-black/20",
                    isBefore(day, today) && "bg-gray-300 ",
                    !isWorkDay(day) &&
                      !isBefore(day, today) &&
                      "bg-blue-400 text-white"
                  )}
                  disabled={isBefore(day, today)}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Kalendar;
