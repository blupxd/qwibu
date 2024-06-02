import React, { useState, useCallback, useMemo } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { z } from "zod";
import RadnoVreme from "./RadnoVreme";

interface DrugiProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: {
    nazivRadnje: string;
    telefon: string;
    lokacija: {
      grad: string;
      ulica: string;
      broj: string;
    };
    email: string;
    dani: string[];
  };
  setFormData: (data: any) => void;
}

const formSchema = z.object({
  nazivRadnje: z.string().nonempty("Naziv radnje je obavezan."),
  telefon: z.string().nonempty("Telefon je obavezan."),
  email: z.string().email("Unesite validan e-mail."),
  lokacija: z.object({
    grad: z.string().nonempty("Grad je obavezan."),
    ulica: z.string().nonempty("Ulica je obavezna."),
    broj: z.string().nonempty("Broj je obavezan."),
  }),
});

const InputField = React.memo(({ label, id, name, value, onChange, error }: any) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-gray-500 text-sm">{label}</label>
    <input
      type="text"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="border text-sm border-gray-300 rounded-md pl-4 pr-12 py-1 focus:outline-none focus:border-blue-400"
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
));

const Drugi: React.FC<DrugiProps> = ({ nextStep, prevStep, formData, setFormData }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");
    setFormData((prevData: any) => ({
      ...prevData,
      ...(child ? { [parent]: { ...prevData[parent], [child]: value } } : { [name]: value }),
    }));
    setErrors({});
  }, [setFormData]);

  const validateForm = useCallback(() => {
    try {
      formSchema.parse(formData);
      setErrors({});
      nextStep();
    } catch (e: any) {
      const fieldErrors: { [key: string]: string } = {};
      e.errors.forEach((error: any) => {
        fieldErrors[error.path.join(".")] = error.message;
      });
      setErrors(fieldErrors);
    }
  }, [formData, nextStep]);

  const inputFields = useMemo(() => [
    { label: "Naziv radnje", id: "nazivRadnje", name: "nazivRadnje", value: formData.nazivRadnje, error: errors.nazivRadnje },
    { label: "Telefon radnje", id: "telefon", name: "telefon", value: formData.telefon, error: errors.telefon },
    { label: "E-mail radnje", id: "email", name: "email", value: formData.email, error: errors.email },
    { label: "Grad", id: "grad", name: "lokacija.grad", value: formData.lokacija.grad, error: errors["lokacija.grad"] },
    { label: "Naziv ulice", id: "ulica", name: "lokacija.ulica", value: formData.lokacija.ulica, error: errors["lokacija.ulica"] },
    { label: "Broj ulice", id: "broj", name: "lokacija.broj", value: formData.lokacija.broj, error: errors["lokacija.broj"] },
  ], [formData, errors]);

  return (
    <div className="flex flex-col">
      <h1 className="text-sm text-gray-400 mb-4">
        Popunite sledeća polja koja su vezana za ime vaše radnje, kontakt telefon, mejl i mesto gde se nalazi radnja.
      </h1>
      <div className="grid grid-cols-2 mb-4 gap-4">
        <h1 className="text-xl text-blue-500 font-semibold col-span-2 mb-2">Podaci o radnji</h1>
        {inputFields.slice(0, 3).map((field, index) => (
          <InputField key={index} {...field} onChange={handleChange} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <h1 className="text-xl text-blue-500 font-semibold col-span-2 mb-2">Adresa radnje</h1>
        {inputFields.slice(3).map((field, index) => (
          <InputField key={index} {...field} onChange={handleChange} />
        ))}
        <div className="flex flex-col col-span-2">
          <h1 className="text-xl text-blue-500 font-semibold col-span-2 mb-2">Radno vreme</h1>
          <RadnoVreme formData={formData} updateDani={(dani) => setFormData({ ...formData, dani })} />
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-400">
        * Napomena: Molimo Vas da popunite sva obavezna polja kako biste uspešno nastavili sa procesom.
      </p>
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prevStep}
          className="text-sm text-gray-700 flex items-center gap-2 px-4 py-2 rounded-lg"
        >
          <MdOutlineKeyboardArrowLeft className="w-6 h-6" />
          Nazad
        </button>
        <button
          onClick={validateForm}
          className="text-sm text-white bg-blue-500 px-4 py-2 rounded-full"
        >
          Nastavi
        </button>
      </div>
    </div>
  );
};

export default Drugi;
