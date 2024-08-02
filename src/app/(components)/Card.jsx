import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import OrderButton from "./OrderButton";

const Card = ({ vehicle, baseUrl }) => {
  return (
    <div className="card-bg rounded-md p-2 z-4">
      <h2 className="font-bold">
        {vehicle.make} {vehicle.model}
      </h2>

      <div className="h-[3px] mt-3 w-3/4 bg-red-500 rounded-full" />
      <div className="h-[3px] mt-3 w-1/2 bg-red-500 rounded-full" />

      <div>
        <Image
          width={350}
          height={350}
          src={vehicle.imageUrl}
          alt={vehicle.model}
          unoptimized
        />
      </div>

      <div className="grid grid-cols-3 gap-4 my-4">
        <div className="flex flex-col items-center gap-4 border border-gray-600 p-2 rounded">
          <FaCalendarAlt />
          <span>{vehicle.year}</span>
        </div>

        <div className="flex flex-col items-center gap-4 border border-gray-600 p-2 rounded">
          <GiPathDistance />
          <span>{vehicle.mileage}</span>
        </div>

        <div className="flex flex-col items-center gap-4 border border-gray-600 p-2 rounded">
          <BsFillFuelPumpFill />
          <span>{vehicle.fuelType}</span>
        </div>
      </div>

      <OrderButton vehicle={vehicle} baseUrl={baseUrl} />
    </div>
  );
};

export default Card;
