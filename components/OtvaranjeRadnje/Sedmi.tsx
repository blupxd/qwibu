'use client'
import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
} from "react-icons/fa";
import {
  MdOutlineAddLink,
  MdOutlineKeyboardArrowLeft,
  MdOutlineLinkOff,
} from "react-icons/md";

interface SocialFormData {
  instagram: string;
  facebook: string;
  linkedin: string;
  tiktok: string;
}

interface SedmiProps {
  prevStep: () => void;
  formData: any;
  setFormData: (data: any) => void;
  submitData: () => void;
}

const Sedmi: React.FC<SedmiProps> = ({
  prevStep,
  formData,
  setFormData,
  submitData,
}) => {
  const { instagram, facebook, linkedin, tiktok } = formData.socials;
  const [selectedFields, setSelectedFields] = useState<Set<string>>(
    new Set()
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof SocialFormData
  ) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      socials: {
        ...formData.socials,
        [name]: value,
      },
    });
  };

  const handleSelect = (id: string) => {
    const newSelectedFields = new Set(selectedFields);
    if (newSelectedFields.has(id)) {
      newSelectedFields.delete(id);
    } else {
      newSelectedFields.add(id);
    }
    setSelectedFields(newSelectedFields);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-sm text-gray-400 mb-4">
        Popunite sledeća polja koja su vezana za društvene mreže vaše radnje.
      </h1>
      <div className="flex flex-col mb-4">
        <div className="grid grid-cols-2 gap-6 relative">
          {[
            { Icon: FaInstagram, id: "instagram", name: "instagram", value: instagram },
            { Icon: FaFacebook, id: "facebook", name: "facebook", value: facebook },
            { Icon: FaTiktok, id: "tiktok", name: "tiktok", value: tiktok },
            { Icon: FaLinkedin, id: "linkedin", name: "linkedin", value: linkedin },
          ].map((field, index) => (
            <div key={index} className="flex items-center gap-2">
              <label htmlFor={field.id} className="flex items-center gap-2">
                <field.Icon
                  className={`${
                    selectedFields.has(field.id) ? "text-blue-500" : "text-gray-700"
                  } text-3xl`}
                />
              </label>
              {selectedFields.has(field.id) && (
                <input
                  type="text"
                  id={field.id}
                  name={field.name}
                  value={field.value}
                  onChange={(e) => handleChange(e, field.name as keyof SocialFormData)}
                  className="border text-sm w-full border-gray-300 rounded-full pl-4 pr-12 py-1 focus:outline-none focus:border-blue-400"
                />
              )}
              <button
                className={`${
                  selectedFields.has(field.id) ? "text-red-400" : "text-blue-400"
                } text-2xl`}
                onClick={() => handleSelect(field.id)}
              >
                {selectedFields.has(field.id) ? <MdOutlineLinkOff /> : <MdOutlineAddLink />}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prevStep}
          className="text-sm text-gray-700 flex items-center gap-2 px-4 py-2 rounded-lg"
        >
          <MdOutlineKeyboardArrowLeft className="w-6 h-6" />
          Nazad
        </button>
        <button
          onClick={submitData}
          className="text-sm text-white bg-blue-500 px-4 py-2 rounded-full"
        >
          Završi
        </button>
      </div>
    </div>
  );
};

export default Sedmi;
