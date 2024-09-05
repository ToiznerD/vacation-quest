import { Hotel, HotelIcon, Plane, PlaneTakeoff, Receipt } from "lucide-react";
import Image from "next/image";
import Card from "./components/card";
import getCurrentUser from "./actions/getCurrentUser";
import CheckQuestionnaire from "./components/CheckQuestionnaire";

export default async function Home() {

  const user = await getCurrentUser();

  const placeholders = [
    {
      label : "Hotel+1",
      src : "https://fakeimg.pl/250x300?text=",
      location: "London, UK",
      price: 100,
      rating: 5,
    },
    {
      label : "Hotel+2",
      src : "https://fakeimg.pl/250x300?text=",
      location: "Rome, Italy",
      price: 200,
      rating: 4,
    },
    {
      label : "Hotel+3",
      src : "https://fakeimg.pl/250x300?text=",
      location: "Paris, France",
      price: 300,
      rating: 3,
    },
    {
      label : "Hotel+4",
      src : "https://fakeimg.pl/250x300?text=",
      location: "New York, USA",
      price: 400,
      rating: 2,
    },
  ]

  return (
    <div className="pt-24 px-20 flex flex-col gap-10">
      <CheckQuestionnaire user={user} />
      <div className="flex flex-row items-center justify-between gap-10">
        <Image src="/booking.png" alt="booking" width={100} height={70} />
        <Image src="/expedia.webp" alt="booking" width={100} height={70} />
        <Image src="/hotels.webp" alt="booking" width={100} height={70} />
        <Image src="/priceline.avif" alt="booking" width={100} height={70} />
        <Image src="/trip.avif" alt="booking" width={100} height={70} />
        <div>
          & Many more!
        </div>
      </div>
      <div className="flex flex-row justify-center gap-24">
        <div className="flex flex-col justify-center items-center max-w-[300px]">
          <PlaneTakeoff size={50} className="text-blue-500" />
          <div className="text-3xl font-bold border-b-[2px]">
            Flights
            </div>
          <div className="text-md font-semibold text-center">
            Search flights to your desired destination
          </div>
        </div>
        <div className="flex flex-col justify-center items-center max-w-[300px]">
          <HotelIcon size={50} className="text-blue-500" />
          <div className="text-3xl font-bold border-b-[2px]">
            Hotels
            </div>
          <div className="text-md font-semibold text-center">
            Search from various hotels to book the perfect accomodation for your vacation
          </div>
        </div>
        <div className="flex flex-col justify-center items-center max-w-[300px]">
          <Receipt size={50} className="text-blue-500" />
          <div className="text-3xl font-bold border-b-[2px]">
            Price Comparison
            </div>
          <div className="text-sm font-semibold text-center">
           Compare prices from different airlines and travel agents to find the best deal for your vacation
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-3xl font-bold">
          Popular searches
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {placeholders.map((item, index) => (
          <Card key={index} label={item.label} src={item.src} location={item.location} price={item.price} rating={item.rating}/>
        ))}
      </div>
      </div>
      
    </div>
  );
}
