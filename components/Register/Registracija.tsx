"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Registracija = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if (password === passwordConfirmation) {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Contet-Type": "application/json",
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
      } else console.error("Greska pri registraciji!");
    } else alert("Lozinke se ne podudaraju!");
  };

  return (
    <div className="p-6 flex flex-col shadow-md shadow-gray-500/70 w-96 h-full bg-white rounded-lg">
      <h1 className="text-3xl text-gray-700 font-light text-center mb-12">
        Napravite svoj nalog
      </h1>
      <form className="flex flex-col text-sm" onSubmit={handleFormSubmit}>
        <label htmlFor="email" className="text-gray-900 font-semibold mb-1">
          Vaš email
        </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
          placeholder="vasmejl@mejl.com"
        />
        <label htmlFor="password" className="text-gray-900 font-semibold mb-1">
          Unesite šifru
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
          placeholder="Unesite šifru"
        />
        <label htmlFor="ponovi" className="text-gray-900 font-semibold mb-1">
          Ponovite šifru
        </label>
        <input
          type="password"
          name="ponovi"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
          placeholder="Ponovite šifru"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-indigo-400 focus:outline-none mt-4"
        >
          Registruj se
        </button>
      </form>
      <p className="text-center text-sm mt-16 text-gray-500">
        Već imate svoj nalog?{" "}
        <Link href="/login" className="text-indigo-500">
          Prijavite se
        </Link>
      </p>
    </div>
  );
};

export default Registracija;
