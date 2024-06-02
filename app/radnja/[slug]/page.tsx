"use client";
import Display from "@/components/Radnja/Display";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaArrowLeft, FaRegHeart } from "react-icons/fa";

const fetchRadnja = async (slug: string) => {
  try {
    const response = await fetch(`/api/radnja?id=${slug}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result.radnja;
    } else {
      console.error(
        "Greška prilikom registracije radnje:",
        await response.json()
      );
    }
  } catch (error) {
    console.error("Greška prilikom slanja forme:", error);
  }
  return null;
};

const Page = () => {
  const [radnja, setRadnja] = useState<Object | null>(null);
  const params = useParams();
  const { slug } = params;


  useEffect(() => {
    const loadRadnja = async () => {
      const data = await fetchRadnja(slug as string);
      setRadnja(data);
    };

    loadRadnja();
  }, [slug]);


  return (
    <div>
      
      {radnja ? <Display radnja={radnja} /> : "Učitavanje..."}
    </div>
  );
};

export default Page;
