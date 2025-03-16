"use client";

import { useState } from "react";
import Loader from "./Loader";

const OrderButton = ({ vehicle, baseUrl }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    // 1) Send a request to the backend to generate the payment page link
    fetch(`${baseUrl}/api/checkout`, {
      method: "POST",
      body: JSON.stringify(vehicle),
    })
      // 2) The backend will send the purchase page link here
      .then((res) => res.json())
      // 3) Redirect the user to the purchase page
      .then((data) => {
        window.location.href = data.url;
      })
      // 4) Set the loading state back to false
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
