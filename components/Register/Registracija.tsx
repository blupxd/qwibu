"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Registracija = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if (password === passwordConfirmation) {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "",
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        await signIn("credentials", {
          email: email,
          password: password,
          redirect: true,
          callbackUrl: `${window.location.origin}/podesavanje-profila`,
        });
      } else {
        console.error("Greska pri registraciji!");
        setShowError(true);
      }
    } else {
      alert("Lozinke se ne podudaraju!");
      setShowError(true);
    }
  };

  return (
    <div className="p-8 mt-12 mx-auto w-96 flex flex-col" onClick={() => setShowError(false)}>
      <Link
        className="absolute top-8 left-8 text-xl font-bold text-gray-800"
        href="/"
      >
        Qwibu
      </Link>
      <h1 className="text-3xl text-gray-700 font-bold mb-12">
        Napravite svoj nalog
      </h1>
      <form className="flex flex-col text-sm" onSubmit={handleFormSubmit}>
        <label htmlFor="email" className="text-gray-500 mb-1">
          Vaš email
        </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-6 text-gray-800 mb-8 font-semibold py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-400"
          placeholder="Unesite vaš e-mail"
        />
        <label htmlFor="password" className="text-gray-500 mb-1">
          Unesite šifru
        </label>
        <div className="flex flex-col relative mb-4">
          <input
            type={`${showPassword ? "password" : "text"}`}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`pl-6 pr-12 text-gray-800 font-semibold py-2 border border-gray-300 rounded-xl focus:outline-none ${
              showError ? "border-red-400" : "focus:border-gray-500"
            } `}
            placeholder="Unesite šifru"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute text-gray-400 top-0 bottom-0 right-4 my-auto max-h-max text-xl"
          >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </button>
        </div>
        <label htmlFor="ponovi" className="text-gray-500 mb-1">
          Ponovite šifru
        </label>
        <div className="flex flex-col relative">
          <input
            type={`${showPassword ? "password" : "text"}`}
            name="ponovi"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className={`pl-6 pr-12 text-gray-800 font-semibold py-2 border border-gray-300 rounded-xl focus:outline-none ${
              showError ? "border-red-400" : "focus:border-gray-500"
            } `}
            placeholder="Ponovite šifru"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute text-gray-400 top-0 bottom-0 right-4 my-auto max-h-max text-xl"
          >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </button>
        </div>
        {showError && (
          <p className=" text-red-400 text-xs mt-2">Lozinke se ne podudaraju ili je došlo do greške pri registraciji!</p>
        )}
        <button
          type="submit"
          className="bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none mt-12"
        >
          Registruj se
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-6 mb-1">
        Već imate svoj nalog?{" "}
        <Link className="text-gray-900" href="/login">
          Prijavite se
        </Link>
      </p>
      <hr className="w-32 mx-auto my-2 border border-gray-300" />
    </div>
  );
};

export default Registracija;
