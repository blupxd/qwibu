import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Session {
  session: any;
}

const PrijavaRadnje: React.FC<Session> = ({ session }) => {
  return (
    <AnimatePresence>
      <div
        style={{
          zIndex: 30,
        }}
        className="fixed top-0 bottom-0 right-0 left-0 w-full h-full bg-black/40 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="p-12 flex flex-col bg-white rounded-xl shadow-lg"
        >
          <h1 className="text-xl mb-4 text-center text-gray-700 font-bold">
            Popunite formu
          </h1>
          <p className="text-wrap w-96 text-center mb-4 text-gray-600 text-sm">
            Pružate usluge i želite da unapredite Vaš biznis? Ispunite ovaj
            obrazac i mi ćemo vas kontaktirati u roku od nedelju dana.
          </p>
          <div className="flex gap-2 mb-4">
            <div className="relative overflow-hidden w-16 h-16 rounded-full">
              <Image
                src={session.user.image}
                alt="Profilna"
                fill
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-gray-700">{session.user.name}</h1>
              <h3 className="text-sm text-gray-500">{session.user.email}</h3>
              <h4 className="font-bold text-gray-700 text-xs">
                Podnosilac zahteva
              </h4>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ime-firme"
              >
                Ime firme
              </label>
              <input
                type="text"
                id="ime-firme"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Unesite ime firme"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lokacija"
              >
                Lokacija (Grad/Ulica/Broj)
              </label>
              <input
                type="text"
                id="lokacija"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Unesite lokaciju"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="broj-telefona"
              >
                Broj telefona
              </label>
              <input
                type="text"
                id="broj-telefona"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Unesite broj telefona"
              />
            </div>
            <button className="text-white font-semibold bg-blue-500 rounded-xl py-2 mt-6 w-full">
              Pošalji
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PrijavaRadnje;
