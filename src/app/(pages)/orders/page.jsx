import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Card from "./Card";

const getOrders = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/orders", {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const Orders = async () => {
  const data = await getOrders();

  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="flex gap-4 items-center">
        <Link
          href="/"
          className="hover:bg-gray-200 rounded hover:bg-opacity-25"
        >
          <MdKeyboardArrowLeft className="text-3xl" />
        </Link>

        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      <div className="flex flex-col gap-10">
        {data.orders.map((order) => (
          <Card order={order} key={order._id} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
