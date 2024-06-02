import Login from "@/components/Login";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <Login />;
  } else redirect("/");
};

export default Page;
