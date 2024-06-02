import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getServerSession(authOptions);
    const ownerId = session?.user?.id;

    if (!ownerId || !session) {
      return NextResponse.json(
        { message: "Niste autorizovani" },
        { status: 401 }
      );
    }

    const {
      nazivRadnje,
      telefon,
      email,
      socials,
      lokacija,
      logo,
      slike,
      usluge,
      dani,
      prvaSmena,
      drugaSmena,
      interval,
    } = body;
    const smene = [prvaSmena, drugaSmena];
    const newRadnja = await db.radnja.create({
      data: {
        naziv: nazivRadnje,
        telephone: telefon,
        email,
        logo,
        interval,
        images: slike,
        adresa: `${lokacija.grad}, ${lokacija.ulica} ${lokacija.broj}`,
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    });

    await db.socials.create({
      data: {
        instagram: socials.instagram || "",
        linkedin: socials.linkedin || "",
        tiktok: socials.tiktok || "",
        facebook: socials.facebook || "",
        radnja: {
          connect: {
            id: newRadnja.id,
          },
        },
      },
    });
    for (const dan of dani) {
      await db.dan.create({
        data: {
          dan: dan.dan,
          pocetak: dan.pocetak,
          kraj: dan.kraj,
          radnja: {
            connect: {
              id: newRadnja.id,
            },
          },
        },
      });
    }
    for (const smena of smene) {
      await db.smena.create({
        data: {
          pocetak: smena.pocetak,
          kraj: smena.kraj,
          radnja: {
            connect: {
              id: newRadnja.id,
            },
          },
        },
      });
    }
    for (const usluga of usluge) {
      await db.usluga.create({
        data: {
          naziv: usluga.naziv || "",
          trajanje: usluga.trajanje || "",
          slika: usluga.slika || "",
          radnja: {
            connect: {
              id: newRadnja.id,
            },
          },
        },
      });
    }

    return NextResponse.json({
      radnja: newRadnja,
      message: "Radnja je uspešno registrovana",
    });
  } catch (error) {
    console.error("Greška prilikom registracije radnje:", error);
    return NextResponse.json(
      { message: "Došlo je do greške prilikom registracije radnje." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (id) {
      const radnja = await db.radnja.findUnique({
        where: { id: id + "" },
        include: {
          socials: true,
          usluge: true,
          smene: true,
          dani: true // Ovo dohvaća povezane proizvode
        }
      });

      if (!radnja) {
        return NextResponse.json(
          { message: "Radnja nije pronađena!" },
          { status: 404 }
        );
      }
      return NextResponse.json({ radnja }, { status: 200 });
    } else {
      // Fetch all radnje
      const radnje = await db.radnja.findMany({
        include: {
          socials: true,
          usluge: true,
          smene: true,
          dani: true
        }
      });

      return NextResponse.json({ radnje }, { status: 200 });
    }
  } catch (error) {
    console.error("Greška prilikom pronalska radnje:", error);
    return NextResponse.json(
      { message: "Došlo je do greške prilikom pronalska radnje." },
      { status: 500 }
    );
  }
}
