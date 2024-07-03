import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getServerSession(authOptions);
    const clientId = session?.user?.id;
    if (!session) {
      return NextResponse.json(
        { message: "Niste autorizovani" },
        { status: 401 }
      );
    }

    const { radnjaId, time, workerId } = body;

    const existingSchedule = await db.schedule.findFirst({
      where: { time: time, clientId: clientId, workerId: workerId },
    });
    if(existingSchedule){
        return NextResponse.json(
            { user: null, message: "Zauzet termin!" },
            { status: 409 }
          );
    }
    const newSchedule = await db.schedule.create({
      data: {
        time,
        workerId,
        radnja: {
          connect: {
            id: radnjaId,
          },
        },
        client: {
          connect: {
            id: clientId,
          },
        },
      },
    });
    return NextResponse.json({
      schedule: newSchedule,
      message: "Uspesno zakazivanje",
    });
  } catch (error) {
    console.error("Greška prilikom Zakazivanja:", error);
    return NextResponse.json(
      { message: "Došlo je do greške prilikom zakazivanja." },
      { status: 500 }
    );
  }
}
