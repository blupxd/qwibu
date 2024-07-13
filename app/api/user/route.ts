import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    //provera mejla da postoji

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Vec postoji nalog registrovan na ovo mejlu!" },
        { status: 409 }
      );
    }

    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);

    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "Uspesno registrovan!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Greska pri registraciji!" },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name } = body;

    // Pronalaženje korisnika sa datim ID-om
    const existingUser = await db.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Korisnik nije pronađen!" },
        { status: 404 }
      );
    }

    // Ažuriranje imena korisnika
    const updatedUser = await db.user.update({
      where: { id: id },
      data: { name: name },
    });

    return NextResponse.json(
      { user: updatedUser, message: "Ime korisnika uspješno ažurirano!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Greška pri ažuriranju imena korisnika!" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const user = await db.user.findUnique({
        where: { id: id+"" },
        include: {
          schedules: true
        }
      });

      if (!user) {
        return NextResponse.json(
          { message: "Korisnik nije pronađen!" },
          { status: 404 }
        );
      }
      return NextResponse.json({ user }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "ID nije naveden!" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Greška pri pronalaženju korisnika:", error);
    return NextResponse.json(
      { message: "Greška pri pronalaženju korisnika!" },
      { status: 500 }
    );
  }
}