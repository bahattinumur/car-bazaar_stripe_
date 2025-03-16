import millify from "millify";

const Card = ({ order }) => {
  return (
    <div className="card-bg border p-4 rounded-md gap-5 items-center justify-between grid grid-cols-3 xl:grid-cols-6 hover:bg-zinc-100 hover:bg-opacity-10 transition cursor-pointer">
      <img src={order.product.imageUrl} width={100} height={100} />

      <h2>
        <span>{order.product.make}</span>
        <span className="font-bold mx-2">{order.product.model}</span>
      </h2>

      <p className="flex max-md:flex-col gap-2">
        <span className="whitespace-nowrap">Total Paid: </span>
        <span className="font-bold text-green-400">
          {millify(order.money_spend / 100)}
        </span>
      </p>

      <p className="flex max-md:flex-col gap-2">
        <span className="whitespace-nowrap">Purchase Date:</span>
        <span className="font-bold text-green-400">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </p>

      <p className="flex max-md:flex-col gap-2">
        <span className="whitespace-nowrap">Paid Type</span>
        <span className="font-bold text-green-400">{order.type}</span>
      </p>
    </div>
  );
};

export default Card;
