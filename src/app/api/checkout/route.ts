import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_KEY);

const getActiveProducts = async () => {
  // Get all products in the catalog
  let stripeProducts = await stripe.products.list();

  // Filter active products
  return stripeProducts.data.filter((i) => i.active);
};

export const POST = async (req) => {
  try {
    // 1) Access the vehicle data to be purchased from the request body
    const product = await req.json();

    // 2) Retrieve products stored in Stripe's catalog
    const stripeProducts = await getActiveProducts();

    // 3) Check if the product to be purchased exists in the catalog
    let foundProduct = stripeProducts.find(
      (i) => i.metadata.product_id === product._id
    );

    // 4) If it is not in the catalog, add the product to the catalog
    if (!foundProduct) {
      foundProduct = await stripe.products.create({
        name: product.make + " " + product.model,
        images: [product.imageUrl],
        default_price_data: {
          unit_amount: product.price * 100,
          currency: "USD",
        },
        metadata: {
          product_id: product._id,
        },
      });
    }

    // 5) Store the Stripe-generated product ID and purchase quantity in an object
    const product_info = {
      price: foundProduct.default_price,
      quantity: 1,
    };

    // 6) Create a payment session (URL)
    const session = await stripe.checkout.sessions.create({
      line_items: [product_info],
      mode: "payment",
      success_url: "http://localhost:3000" + "/success",
      cancel_url: "http://localhost:3000" + "/cancel",
    });

    // 7) Return the purchase URL to the client
    return NextResponse.json({
      url: session.url,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "An error occurred while creating the payment session",
      },
      { status: 500 }
    );
  }
};
