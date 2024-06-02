import Hero from "@/components/Hero";
import Istakunti from "@/components/Istakunti";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main>
        <Hero session={session}/>
        <Istakunti />
    </main>
  );
}
