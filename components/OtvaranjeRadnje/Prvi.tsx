import React from "react";

interface PrviProps {
  session: any;
  nextStep: () => void;
}
const Prvi: React.FC<PrviProps> = ({ session, nextStep }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-gray-800 text-2xl mb-2">
        Zdravo,{" "}
        <span className="text-blue-500 font-bold">{session?.user.name}</span>
      </h1>
      <h2 className="text-gray-600 font-semibold text-lg mb-4">
        Spremni ste da unapredite Vaš biznis?
      </h2>
      <p className="text-wrap w-full text-sm text-gray-500 mb-16 max-w-lg">
        Pre nego što otvorite profil Vaše radnje, trebalo bi da znate da je ovaj
        sajt u <span className="font-bold text-blue-400">BETA</span> fazi, što
        znači da je u fazi testiranja. Molimo Vas da svaku grešku ili manu koju
        primetite prijavite na mejl
        <span className="font-medium text-blue-500"> example@mail.com</span>.
        Beta faza će trajati u periodu od 6 do 12 meseci i sve usluge će biti
        besplatne. Predviđeno je da za svaku Vašu uslugu bude naplaćeno na kraju
        meseca <span className="font-bold text-blue-500">4%</span> od svake Vaše prodate usluge u periodu od mesec dana. Hvala na
        razumevanju!
      </p>
      <button
        onClick={nextStep}
        className="text-white bg-blue-500 hover:bg-blue-600 max-w-max mx-auto transition-colors duration-300 rounded-xl px-6 py-3"
      >
        Započni
      </button>
    </div>
  );
};

export default Prvi;
