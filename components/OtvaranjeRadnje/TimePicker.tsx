import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { MdMoreTime } from 'react-icons/md';
import { motion } from 'framer-motion';

interface Interval {
  value: number;
  label: string;
}

interface Intervals {
  intervals: Interval[];
  setIntervalTime: (param: number) => void;
  vremePick: number;
  reset: boolean; // New prop to trigger reset
}

const TimePicker: React.FC<Intervals> = ({intervals, setIntervalTime, reset, vremePick }) => {
  const [options, setOptions] = useState<boolean>(false);
  const [vreme, setVreme] = useState<number>(0 || vremePick);

  const vremeSelected = (param: number) => {
    const arr = intervals.filter((x) => x.value === param);
    return arr[0].label;
  };

  useEffect(() => {
    if (reset) {
      setVreme(0);
    }
  }, [reset]);

  return (
    <div className="relative w-48">
      <button
        onClick={() => setOptions(!options)}
        className="border relative text-sm text-left pl-4 pr-12 w-full border-gray-300 rounded-md text-gray-600 py-1 focus:outline-none focus:border-blue-400"
      >
        {vreme ? `${vremeSelected(vreme)}` : 'Vreme trajanja'}
        <MdMoreTime className="absolute right-0 h-full top-0 bg-gray-300 hover:bg-blue-400 hover:text-white w-8 rounded-md border py-1 px-2" />
      </button>
      <AnimatePresence>
        {options && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="bg-white p-1 flex flex-col absolute top-0 w-full"
          >
            {intervals.map((x, y) => (
              <button
                key={y}
                className={`w-full px-2 py-1 text-sm hover:bg-blue-400 hover:text-white text-gray-700 text-left`}
                onClick={() => {
                  setVreme(x.value);
                  setIntervalTime(x.value);
                  setOptions(false);
                }}
              >
                {x.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimePicker;