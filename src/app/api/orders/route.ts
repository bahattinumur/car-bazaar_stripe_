import { NextResponse } from "next/server";
import Order from "../(models)/Order";

export const GET = async () => {
  try {
    const orders = await Order.find().populate("product");

    return NextResponse.json({ orders });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
