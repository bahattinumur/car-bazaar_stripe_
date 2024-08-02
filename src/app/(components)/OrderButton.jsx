"use client";

import { useState } from "react";
import Loader from "./Loader";

const OrderButton = ({ vehicle, baseUrl }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    //1) Backend'te ödeme sayfasının linkini oluşturması için istek atacağız
    fetch(`${baseUrl}/api/checkout`, {
      method: "POST",
      body: JSON.stringify(vehicle),
    })
      //2) Backend buraya satın alım sayfasınını linki gönderecek
      .then((res) => res.json())
      //3) Kullanıcyı satın alım sayfasına yönlendir
      .then((data) => {
        window.location.href = data.url;
      })
      //4) Yüklenme statini false'a çek
      .finally(() => setIsLoading(false));
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleClick}
      className="bg-blue-600 text-center border py-1 px-3 w-full rounded-md text-sm cursor-pointer transition hover:bg-blue-800"
    >
      {isLoading ? <Loader /> : "Buy"}
    </button>
  );
};

export default OrderButton;
