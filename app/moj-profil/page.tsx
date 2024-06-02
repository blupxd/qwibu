import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBank, faCalendar, faCopy, faInfo } from "@fortawesome/free-solid-svg-icons";
import Zakazani from "@/components/Profil/Zakazani";
import Settings from "@/components/Profil/Settings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import userImage from '@/public/images/userImage.png'
const Page = async () => {

  const session = await getServerSession(authOptions)
  console.log(session)
  const podaciProfil = {
    name: session?.user.name || 'Podesite profil',
    mail: session?.user.email,
  };
  return (
    <div className="p-16 flex flex-col">
      <div className="flex items-center justify-center gap-6 ">
        <div className="relative rounded-full border-gray-300 border-[3px] w-20 h-20 overflow-hidden">
          <Image src={session?.user.image! ? session?.user.image! : userImage} quality={100} alt="profile-picture" fill objectFit="cover" />
        </div>
        <div className="flex flex-col w-64 border-r border-indigo-400">
          <h1 className="text-gray-900 text-lg font-semibold">
            {podaciProfil.name}
          </h1>
          <h4 className="text-gray-400 text-sm">{podaciProfil.mail}</h4>
          <h5 className="text-indigo-600 text-sm mt-2">Radnicki profil</h5>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-end">
            <h1 className="text-gray-900 font-semibold text-base">
              Nivo:
            </h1>
            <h1 className="text-indigo-500 font-bold bg-indigo-300 border-[2px] border-indigo-500 h-8 w-8 flex items-center justify-center rounded-full">
              5
            </h1>
            <p className="text-xs text-gray-400">2,312 XP</p>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-red-400 text-2xl"
            />
            <div className="block ml-4">
              <h3 className="text-sm text-gray-900 font-semibold">
                Mesečni izveštaj
              </h3>
              <button className="text-xs text-gray-500">Vidi detalje</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end h-8">
            <button className="px-2 py-1 bg-white text-indigo-500 text-sm"><FontAwesomeIcon icon={faCopy} /> Link profila</button>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faBank}
              className="text-indigo-500 text-2xl"
            />
            <div className="block ml-4">
              <h3 className="text-sm text-gray-900 font-semibold">
                Izveštaj o prihodima
              </h3>
              <button className="text-xs text-gray-500">Vidi detalje</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-12 mt-20">
        <Zakazani />
        <Settings />
      </div>
    </div>
  );
};

export default Page;
