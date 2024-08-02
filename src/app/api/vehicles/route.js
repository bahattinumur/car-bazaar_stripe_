import { NextResponse } from "next/server";
import Vehicle from "../(models)/Vehicle";

export async function GET() {
  try {
    // veritabnından bütün araçları al
    const vehicles = await Vehicle.find();

    // clienta gönder
    return NextResponse.json({
      message: "Cars Founded",
      data: vehicles,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "An issue occurred while retrieving car data",
      },
      { status: 500 }
    );
  }
}
