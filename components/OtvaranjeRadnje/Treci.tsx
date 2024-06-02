"use client";
import React, { useState, useCallback } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import { z } from "zod";

interface TreciProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: {
    logo: File | null;
    slike: File[];
  };
  setFormData: (data: any) => void;
}

const Treci: React.FC<TreciProps> = ({ nextStep, prevStep, setFormData, formData }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleLogoChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
      setErrors({});
    }
  }, []);

  const handleImagesChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(formData)
      const selectedImages = Array.from(event.target.files);
      setFormData((prevData: any) => ({
        ...prevData,
        slike: [...prevData.slike, ...selectedImages],
      }));
    }
    
  }, [setFormData]);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(imageSrc!, croppedAreaPixels);
      const file = new File([croppedImage], "croppedLogo.png", { type: "image/png" });
      setFormData((prevData: any) => ({ ...prevData, logo: file }));
      setImageSrc(null); // Close the cropping UI
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, setFormData]);

  const deleteImage = useCallback((key: number) => {
    setFormData((prevData: any) => ({
      ...prevData,
      slike: prevData.slike.filter((_:any, index:number) => index !== key),
    }));
  }, [setFormData]);

  const renderLogoPreview = useCallback(() => {
    if (formData.logo) {
      const logoUrl = URL.createObjectURL(formData.logo);
      return (
        <div className="relative overflow-hidden rounded-full h-24 w-24">
          <Image src={logoUrl} alt="Logo Preview" fill objectFit="cover" />
        </div>
      );
    }
    return null;
  }, [formData.logo]);

  const renderImagePreviews = useCallback(() => {
    return formData.slike.map((slika, index) => {
      const imageUrl = URL.createObjectURL(slika);
      return (
        <div className="relative overflow-hidden h-24 w-24 rounded-lg" key={index}>
          <Image src={imageUrl} alt={`Preview ${index}`} fill objectFit="cover" />
          <div className="bg-black/20 opacity-0 flex items-center justify-center w-full h-full top-0 right-0 left-0 bottom-0 hover:opacity-100 ">
            <button
              onClick={() => deleteImage(index)}
              className="h-10 w-10 p-2 bg-red-500 text-white flex items-center justify-center z-10 rounded-lg"
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      );
    });
  }, [formData.slike, deleteImage]);

  const formSchema = z.object({
    logo: z.instanceof(File),
    slike: z.array(z.instanceof(File)).optional(),
  });

  const validateForm = useCallback(() => {
    try {
      formSchema.parse(formData);
      setErrors({});
      nextStep();
    } catch (e: any) {
      const fieldErrors: { [key: string]: string } = {};
      e.errors.forEach((error: any) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    }
  }, [formData, nextStep]);

  return (
    <div className="flex flex-col">
      <h1 className="text-sm text-gray-400 mb-4">
        Ubacite logotip i slike Vaše radnje da bi je ljudi lakše prepoznali.
      </h1>
      <div className="flex flex-col mb-4">
        <div className="flex flex-col mb-12 relative">
          <h1 className="text-xl font-semibold mb-2 text-gray-600">
            Dodajte logo
          </h1>
          <label
            htmlFor="logo"
            className="w-24 h-24 rounded-full relative flex items-center justify-center  hover:border-blue-400 cursor-pointer  border-gray-300 border-4"
          >
            {renderLogoPreview() || (
              <FaRegImage className="text-3xl text-gray-400 cursor-pointer absolute hover:text-blue-500" />
            )}
          </label>
          <input
            type="file"
            id="logo"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />
          {errors.logo && (
            <span className="text-red-500 text-sm mt-2">Logo je obavezan!</span>
          )}
        </div>
        {imageSrc && (
          <div className="relative w-full h-64">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <button
              onClick={showCroppedImage}
              className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Izaberi
            </button>
          </div>
        )}
        <div className="flex flex-col mb-2 relative">
          <h1 className="text-xl font-semibold mb-2 text-gray-600">
            Dodajte slike <span className="text-sm text-gray-400">(opciono)</span>
          </h1>
          <label
            htmlFor="images"
            className="rounded-xl p-12 relative flex items-center justify-center border-gray-300 hover:border-blue-400 cursor-pointer border-2"
          >
            <BsPlusCircle className="text-3xl text-gray-400 cursor-pointer absolute hover:text-blue-500" />
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="hidden"
          />
        </div>
        <div className="flex flex-wrap">{renderImagePreviews()}</div>
      </div>
      <p className="mt-4 text-sm text-gray-400">
        * Napomena: Molimo Vas da popunite sva obavezna polja kako biste uspešno
        nastavili sa procesom.
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

export default Treci;
