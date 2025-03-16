import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Order from "../(models)/Order";

const stripe = require("stripe")(process.env.STRIPE_KEY);

// Disable Next.js body processing
export const config = {
  api: {
    bodyParser: false,
  },
};

// If the payment is successful, Stripe will send a POST request here, allowing us to detect the successful payment and make necessary updates
export async function POST(req) {
  // 1) Convert the request body to text
  const body = await req.text();

  // 2) Access the required header
  const signature = headers().get("stripe-signature");

  let event;

  // 3) Access the data related to the completed payment
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.WEBHOOK_KEY
    );
  } catch (err) {
    return NextResponse.json({ message: "Webhook Unsuccessful" }, { status: 500 });
  }

  // 4) If the payment was successful, access the purchased product data
  if (event.type === "checkout.session.completed") {
    // Payment data
    const session = event.data.object;

    // Access the products purchased in this payment session
    const line_items = await stripe.checkout.sessions.listLineItems(session.id);

    // Retrieve the product's catalog data
    const item = await stripe.products.retrieve(
      line_items.data[0].price.product
    );

    // Create order data to be added to our database
    const orderItem = {
      product: item.metadata.product_id,
      money_spend: line_items.data[0].amount_total,
      currency: line_items.data[0].price.currency,
      type: line_items.data[0].price.type,
    };

    // Add the purchased product to the orders collection
    await Order.create(orderItem);

    // Send a positive response to the client
    return NextResponse.json(
      {
        status: "success",
      },
      { status: 200 }
    );
  }

  // Send a negative response to the client
  return NextResponse.json(
    {
      status: "fail",
    },
    { status: 500 }
  );
}
