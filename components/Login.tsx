"use client";
import { FcGoogle } from "react-icons/fc";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [showError, setShowError] = useState<boolean>(false);

  const handleFormSubmit = async () => {
    const signInData = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: `${window.location.origin}/`,
    });
    if (signInData?.error) {
      console.log(signInData.error);
      setShowError(true);
    }
  };
  const handleGoogleSignIn = async () => {
    const signInData = await signIn("google", {
      redirect: true,
      callbackUrl: `${window.location.origin}/`,
    });
    if (signInData?.error) {
      console.log(signInData);
    }
  };
  const [showPassword, setShowPassword] = useState<boolean>(true);

  return (
    <div className="p-8 mt-12 mx-auto w-96 flex flex-col" onClick={() => setShowError(false)}>
      <Link
        className="absolute top-8 left-8 text-xl font-bold text-gray-800"
        href="/"
      >
        Qwibu
      </Link>
      <h1 className="text-3xl text-gray-700 font-bold mb-12">
        Prijavite se
      </h1>
      <div className="flex flex-col text-sm">
        <label htmlFor="email" className="text-gray-500 mb-1">
          E-mail
        </label>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="px-6 text-gray-800 mb-8 font-semibold py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-400"
          placeholder="Unesite vaš e-mail"
        />
        <label htmlFor="password" className="text-gray-500 mb-1">
          Lozinka
        </label>
        <div className="flex flex-col relative">
          <input
            type={`${showPassword ? "password" : "text"}`}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className={`pl-6 pr-12 text-gray-800 font-semibold py-2 border border-gray-300 rounded-xl focus:outline-none ${
              showError ? "border-red-400" : "focus:border-gray-500"
            } `}
            placeholder="Unesite šifru"
          />

          {showError ? (
            <p className="text-red-400 absolute top-0 bottom-0 right-4 my-auto max-h-max text-xl">
              <IoMdCloseCircleOutline />
            </p>
          ) : (
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-400 top-0 bottom-0 right-4 my-auto max-h-max text-xl"
            >
              {showPassword ? <LuEyeOff /> : <LuEye />}
            </button>
          )}
        </div>
        {showError && (
          <p className=" text-red-400 text-xs">Pogresna lozinka ili e-mail</p>
        )}

        <button
          onClick={handleFormSubmit}
          className="bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none mt-12"
        >
          Prijavi se
        </button>
      </div>

      <div className="flex flex-col text-sm">
        <h1 className="my-4 text-gray-400 text-center">ili</h1>
        <button
          onClick={handleGoogleSignIn}
          className="w-full p-2 flex items-center justify-center gap-2 border-gray-300 rounded-xl text-gray-700 border hover:text-gray-800 hover:bg-gray-300"
        >
          <FcGoogle className="text-xl" /> Prijavi se pomoću Google naloga
        </button>
      </div>
      <p className="text-center text-sm text-gray-500 mt-6 mb-1">
        Nemate nalog?{" "}
        <Link className="text-gray-900" href="/register">
          Registruj se
        </Link>
      </p>
      <hr className="w-32 mx-auto my-2 border border-gray-300" />

      <Link href="/" className="text-center text-sm mt-1 text-gray-500">
        Zaboraviliste vaš mejl ili lozinku?
      </Link>
    </div>
  );
};

export default Login;
