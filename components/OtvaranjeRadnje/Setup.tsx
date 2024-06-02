"use client";
import React, { useState, useMemo, useEffect } from "react";
import { FaImages, FaUserTag } from "react-icons/fa";
import { FaCircleCheck, FaShop, FaUserGear } from "react-icons/fa6";
import { MdMoreTime } from "react-icons/md";
import { GiFallingStar } from "react-icons/gi";
import dynamic from "next/dynamic";
import { IoCloseCircleSharp, IoShareSocial } from "react-icons/io5";
import { uploadImage } from "@/lib/uploadImage";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PropagateLoader } from "react-spinners";
import { Z_FINISH } from "zlib";
const Prvi = dynamic(() => import("./Prvi"));
const Drugi = dynamic(() => import("./Drugi"));
const Treci = dynamic(() => import("./Treci"));
const Cetvrti = dynamic(() => import("./Cetvrti"));
const Peti = dynamic(() => import("./Peti"));
const Sesti = dynamic(() => import("./Sesti"));
const Sedmi = dynamic(() => import("./Sedmi"));

interface SessionProp {
  session: any;
}

const Setup: React.FC<SessionProp> = ({ session }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    nazivRadnje: "",
    telefon: "",
    lokacija: {
      zemja: "Srbja",
      grad: "",
      ulica: "",
      broj: "",
    },
    email: "",
    logo: null,
    slike: [],
    usluge: [],
    prvaSmena: {
      pocetak: "",
      kraj: "",
    },
    drugaSmena: {
      pocetak: "",
      kraj: "",
    },
    dani: [
      { dan: "ponedeljak", pocetak: "", kraj: "" },
      { dan: "utorak", pocetak: "", kraj: "" },
      { dan: "sreda", pocetak: "", kraj: "" },
      { dan: "cetvrtak", pocetak: "", kraj: "" },
      { dan: "petak", pocetak: "", kraj: "" },
      { dan: "subota", pocetak: "", kraj: "" },
      { dan: "nedelja", pocetak: "", kraj: "" },
    ],
    interval: 0,
    workers: [],
    socials: {
      instagram: "",
      tiktok: "",
      facebook: "",
      linkedin: "",
    },
  });

  const [step, setStep] = useState<number>(0);
  const koraci = useMemo(
    () => [
      {
        title: "Kreiranje radnje",
        optional: false,
        description: "Početak i proširivanje Vašeg biznisa",
        icon: GiFallingStar,
      },
      {
        title: "Podaci o radnji",
        optional: false,
        description: "Ime radnje, Kontakt, Mesto i Radno vreme",
        icon: FaShop,
      },
      {
        title: "Slike radnje",
        optional: false,
        description: "Logo i slike radnje",
        icon: FaImages,
      },
      {
        title: "Dodavanje usluga",
        optional: false,
        description: "Kreiranje usluga, postavljanje cena i trajanje usluga",
        icon: FaUserGear,
      },
      {
        title: "Postavljanje termina",
        optional: false,
        description: "Postavljanje termina za usluge",
        icon: MdMoreTime,
      },
      {
        title: "Dodavanje radnika",
        optional: true,
        description: "Dodavanje zaposlenih radnika",
        icon: FaUserTag,
      },
      {
        title: "Drustvene mreze",
        optional: true,
        description: "Linkovi drustvenih mrezi",
        icon: IoShareSocial,
      },
    ],
    []
  );

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const [finish, setFinish] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleFormSubmit = async () => {
    console.log('Submitting form with data:', formData); // Dodajte ovaj log
    try {
      setFinish(true);
      // Upload logo and images first
      const uploadedLogoUrl = formData.logo ? await uploadImage(formData.logo) : null;
      const uploadedImagesUrls = await Promise.all(
        formData.slike.map((slika: any) => uploadImage(slika))
      );

      // Upload usluge images and update usluge data
      const uslugeWithImages = await Promise.all(
        formData.usluge.map(async (usluga: any) => {
          const uploadedUslugaImageUrl = usluga.slika ? await uploadImage(usluga.slika) : null;
          return { ...usluga, slika: uploadedUslugaImageUrl };
        })
      );

      const body = {
        ...formData,
        logo: uploadedLogoUrl,
        slike: uploadedImagesUrls,
        usluge: uslugeWithImages,
      };

      const response = await fetch("/api/radnja", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        setShowSuccess(true);
        setTimeout(() => router.push("/radnja/" + result.radnja.id), 2000);
      } else {
        setError(true);
        console.error(
          "Greška prilikom registracije radnje:",
          await response.json()
        );
      }
    } catch (error) {
      setError(true);
      console.error("Greška prilikom slanja forme:", error);
    }
  };

  const steps = useMemo(
    () => [
      { content: <Prvi session={session} nextStep={nextStep} /> },
      {
        content: (
          <Drugi
            setFormData={setFormData}
            formData={formData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        ),
      },
      {
        content: (
          <Treci
            setFormData={setFormData}
            formData={formData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        ),
      },
      {
        content: (
          <Cetvrti
            setFormData={setFormData}
            formData={formData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        ),
      },
      {
        content: (
          <Peti
            setFormData={setFormData}
            formData={formData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        ),
      },
      { content: <Sesti nextStep={nextStep} prevStep={prevStep} /> },
      {
        content: (
          <Sedmi
            setFormData={setFormData}
            formData={formData}
            prevStep={prevStep}
            submitData={handleFormSubmit}
          />
        ),
      },
    ],
    [session, formData]
  );

  return (
    <div className="flex flex-col items-center bg-white my-12 p-8 md:p-10 lg:p-12">
      {finish && (
        <div className="absolute z-30 flex flex-col items-center justify-center w-full h-full bg-white">
          <motion.div
            animate={{ scale: showSuccess ? [1, 1.5, 1] : 1 }}
            transition={{ duration: 0.5 }}
          >
            {showSuccess ? (
              <FaCircleCheck className="w-24 h-24 text-green-500" />
            ) : error ? (
              <IoCloseCircleSharp className="w-24 h-24 text-red-500" />
            ) : (
              <PropagateLoader color="#3B82F6" size={24} />
            )}
          </motion.div>
          <p className="mt-4 text-lg">
            {showSuccess
              ? "Radnja je uspešno registrovana!"
              : error
              ? "Došlo je do greške prilikom registracije."
              : "Registracija u toku..."}
          </p>
        </div>
      )}
      {!finish && (
        <div className="grid grid-cols-2 gap-2">
          <div className="hidden lg:grid grid-cols-2 h-96">
            <h1 className="col-span-2 text-gray-400 mb-4">
              Ispunite sledeće korake da biste otvorili profil radnje
            </h1>
            {koraci.map((korak, index) => (
              <div className="flex items-center gap-2 mb-4" key={index}>
                {step > index ? (
                  <FaCircleCheck className="w-8 h-8 text-green-600" />
                ) : (
                  <korak.icon
                    className={`${
                      step === index ? "text-blue-500" : "text-gray-400"
                    } w-8 h-8`}
                  />
                )}
                <div className="flex flex-col">
                  <h1 className="text-base font-semibold text-gray-800">
                    {korak.title}{" "}
                    {korak.optional && (
                      <span className="font-normal text-gray-400 text-xs">
                        (opciono)
                      </span>
                    )}
                  </h1>
                  <h2 className="text-xs text-gray-400 w-full">
                    {korak.description}
                  </h2>
                </div>
              </div>
            ))}
            
          </div>
          <div className="col-span-2 lg:col-span-1 flex flex-col">
            <div className="rounded-xl p-1 w-full lg:w-96 bg-gray-300 relative mb-2">
              <span
                style={{ width: `${(100 * step) / koraci.length}%` }}
                className="rounded-xl p-1 transition-all duration-500 ease-in-out bg-blue-500 absolute left-0 top-0"
              ></span>
            </div>
            <h1 className="text-sm text-blue-400 font-semibold mb-4">
              Korak {step + 1} od {koraci.length}
            </h1>
            <h1 className="text-3xl mb-4 font-semibold text-gray-800">
              {koraci[step].title}{" "}
              {koraci[step].optional && (
                <span className="font-normal text-gray-400 text-base">
                  (opciono)
                </span>
              )}
            </h1>
            <div className="h-full lg:h-96 lg:overflow-y-scroll">{steps[step].content}</div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Setup;
