import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdAccessTime } from "react-icons/md";

interface TimeSelectProps {
  onSelectTime: (time: Date | null) => void;
  vreme: string;
}

const Time: React.FC<TimeSelectProps> = ({ onSelectTime, vreme }) => {
  const parseTime = (timeString: string) => {
    const match = timeString.match(/(\d{2}):(\d{2}) (\w{2})/);
    if (match) {
      return {
        hour: match[1],
        minute: match[2],
        period: match[3] as "AM" | "PM",
      };
    }
    return { hour: null, minute: null, period: null };
  };

  const { hour, minute, period } = parseTime(vreme);

  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(hour);
  const [selectedMinute, setSelectedMinute] = useState<string | null>(minute);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM" | null>(
    period
  );

  const handleSelectTime = () => {
    if (
      selectedHour !== null &&
      selectedMinute !== null &&
      selectedPeriod !== null
    ) {
      const formattedHour = selectedHour.padStart(2, "0");
      const formattedMinute = selectedMinute.padStart(2, "0");

      const timeString = `${formattedHour}:${formattedMinute} ${selectedPeriod}`;
      const selectedTime = new Date(`01/01/2000 ${timeString}`);
      onSelectTime(selectedTime);
      setOptionsVisible(false);
    }
  };

  const renderHours = () => {
    const hours: string[] = [];
    for (let i = 1; i <= 12; i++) {
      const hour = i.toString().padStart(2, "0");
      hours.push(hour);
    }
    return hours.map((hour) => (
      <button
        key={hour}
        className={`py-1 px-2 ${
          selectedHour === hour ? "bg-blue-400 text-white" : ""
        }`}
        onClick={() => setSelectedHour(hour)}
      >
        {hour}
      </button>
    ));
  };

  const renderMinutes = () => {
    const minutes: string[] = [];
    for (let i = 0; i <= 55; i += 5) {
      const minute = i.toString().padStart(2, "0");
      minutes.push(minute);
    }
    return minutes.map((minute) => (
      <button
        key={minute}
        className={`py-1 px-2 ${
          selectedMinute === minute ? "bg-blue-400 text-white" : ""
        }`}
        onClick={() => setSelectedMinute(minute)}
      >
        {minute}
      </button>
    ));
  };

  return (
    <div className="relative w-48 bg-white">
      <button
        onClick={() => setOptionsVisible(!optionsVisible)}
        className="border relative text-sm text-left pl-4 pr-12 w-full border-gray-300 rounded-md text-gray-600 py-1 focus:outline-none focus:border-blue-400"
      >
        {selectedHour !== null &&
        selectedMinute !== null &&
        selectedPeriod !== null
          ? `${selectedHour}:${selectedMinute} ${selectedPeriod}`
          : "Izaberi vreme"}
        <MdAccessTime className="absolute right-0 h-full top-0 bg-gray-300 hover:bg-blue-400 hover:text-white w-8 rounded-md border py-1 px-2" />
      </button>
      <AnimatePresence>
        {optionsVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="bg-white p-1 flex flex-col absolute top-0 w-full z-40"
          >
            <div className="grid grid-cols-3 h-48">
              <div className="flex flex-col overflow-y-scroll relative">
                <h1 className="text-sm p-1 bg-white text-center text-gray-500 sticky top-0">
                  Sati
                </h1>
                {renderHours()}
              </div>
              <div className="flex flex-col overflow-y-scroll relative">
                <h1 className="text-sm p-1 bg-white text-center text-gray-500 sticky top-0">
                  Minuti
                </h1>
                {renderMinutes()}
              </div>
              <div className="flex flex-col">
                <button
                  className={`py-1 px-2 ${
                    selectedPeriod === "AM" ? "bg-blue-400 text-white" : ""
                  }`}
                  onClick={() => setSelectedPeriod("AM")}
                >
                  AM
                </button>
                <button
                  className={`py-1 px-2 ${
                    selectedPeriod === "PM" ? "bg-blue-400 text-white" : ""
                  }`}
                  onClick={() => setSelectedPeriod("PM")}
                >
                  PM
                </button>
              </div>
            </div>
            <button
              onClick={handleSelectTime}
              className="w-full mt-2 px-2 py-1 bg-blue-500 text-white col-span-3 text-sm hover:bg-blue-600"
            >
              Izaberi
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Time;
