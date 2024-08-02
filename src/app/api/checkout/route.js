import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_KEY);

const getActiveProducts = async () => {
  // Katalogdaki bütün ürünleri al
  let stripeProducts = await stripe.products.list();

  // Aktif ürünleri filtrele
  return stripeProducts.data.filter((i) => i.active);
};

export const POST = async (req) => {
  try {
    //1) İsteğin body kısmında gelen satın alınacak araç verisine eriş
    const product = await req.json();

    //2) Stript'nın catalog'una kaydedilmiş ürünleri al
    const stripeProducts = await getActiveProducts();

    //3) Satın alıncak ürün catalog'da var mı kontrol et
    let foundProduct = stripeProducts.find(
      (i) => i.metadata.product_id === product._id
    );

    //4) Catolog'da yok ise satın alınacak ürünü catalog'a ekle
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

    //5) ürünün stripe tarafından oluşturulan ID'sini ve satım, alım miktarını bir nesneye koy
    const product_info = {
      price: foundProduct.default_price,
      quantity: 1,
    };

    //6) Ödeme oturumu (URL) oluştur
    const session = await stripe.checkout.sessions.create({
      line_items: [product_info],
      mode: "payment",
      success_url: "http://localhost:3000" + "/success",
      cancel_url: "http://localhost:3000" + "/cancel",
    });

    //7) Satın alma URL'ini client'a döndür
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
