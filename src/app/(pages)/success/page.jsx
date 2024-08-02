import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Success = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="border shadow-white p-5 text-lg flex flex-col gap-5 items-center rounded-md">
        <div className="flex items-center gap-5">
          <IoIosCheckmarkCircle className="text-3xl" />

          <p className="font-semibold">Payment Successful
</p>
        </div>

        <div className="flex gap-5">
          <Link
            className="bg-blue-500 px-4 py-1 rounded-md hover:bg-blue-600"
            href="/"
          >
            Other Cars
          </Link>
          <Link
            className="bg-green-500 px-4 py-1 rounded-md hover:bg-green-600"
            href="/orders"
          >
            My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
