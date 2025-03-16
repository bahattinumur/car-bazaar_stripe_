import Link from "next/link";
import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

const Cancel = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="border shadow-white p-5 text-lg flex flex-col gap-5 items-center rounded-md">
        <div className="flex items-center gap-5">
          <IoIosCloseCircle className="text-3xl text-red-500" />

          <p className="font-semibold">Payment Unsuccessful</p>
        </div>

        <div className="flex gap-5">
          <Link
            className="bg-blue-500 px-4 py-1 rounded-md hover:bg-blue-600"
            href="/"
          >
            Explore the Cars
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
