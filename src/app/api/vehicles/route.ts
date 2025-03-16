import { NextResponse } from "next/server";
import Vehicle from "../(models)/Vehicle";

export async function GET() {
  try {
    // Get all the vehicles
    const vehicles = await Vehicle.find();

    // Sent to the client
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
