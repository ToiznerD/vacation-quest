import { Hotel, HotelIcon, Plane, PlaneTakeoff, Receipt } from "lucide-react";
import Image from "next/image";
import Card from "./components/card";
import getCurrentUser from "./actions/getCurrentUser";
import PopularSearches from "./components/PopularSearches";
import prisma from "./libs/prismadb";
import { hotelCard, hotelInfo } from "./types";

interface PopularItem {
  city: string;
  hotelInfo: hotelCard;
}

interface PopularHotel {
  label: string;
  src: string;
  location: string;
  price: number;
  rating: number;
  hotelId: string;
}


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

  // Type assertion for the result
  const popular = await prisma.recommendation.findMany({
    distinct: ['hotelInfo', 'city'],
    take: 4,
    select: {
      hotelInfo: true,
      city: true,
    }
  });

  const popularHotels: PopularHotel[] = (popular as PopularItem[]).map((item: PopularItem) => {
    return {
      label: item.hotelInfo.name,
      src: item.hotelInfo.images[0] || placeholders[0].src,
      location: item.city,
      price: item.hotelInfo.rawPrice,
      rating: item.hotelInfo.stars,
      hotelId: item.hotelInfo.hotelId
    } as PopularHotel;
  });

  return (
    <div className="pt-24 px-20 flex flex-col gap-10">
      
      <div className="flex flex-row items-center justify-between gap-10 px-2">
        <Image src="/booking.png" alt="booking" width={100} height={70} />
        <Image src="/expedia.webp" alt="booking" width={100} height={70} />
        <Image src="/hotels.webp" alt="booking" width={100} height={70} className="hidden md:block"/>
        <Image src="/priceline.avif" alt="booking" width={100} height={70}  className="hidden lg:block"/>
        <Image src="/trip.avif" alt="booking" width={100} height={70} className="hidden lg:block" />
        <div>
          & Many more!
        </div>
      </div>
      <PopularSearches popularHotels={popularHotels}/>
      <div className="flex flex-col md:flex-row justify-center gap-24">
        <div className="flex flex-row md:flex-col md:justify-center items-center gap-8 max-w-[300px]">
          <div className="flex flex-col">
            <PlaneTakeoff size={50} className="text-blue-500 mx-auto" />
            <div className="text-xl md:text-3xl font-bold md:border-b-[2px] text-center">
              Flights
              </div>
          </div>
          <div className="text-sm md:text-md font-semibold text-center">
            Search flights to your desired destination!
          </div>
        </div>
        <div className="flex flex-row md:flex-col justify-center items-center gap-8 max-w-[300px]">
          <div className="flex flex-col">
            <HotelIcon size={50} className="text-blue-500 mx-auto" />
            <div className="text-xl md:text-3xl font-bold md:border-b-[2px] text-center">
              Hotels
              </div>
          </div>
          <div className="text-md font-semibold text-center">
            Search from various hotels to book the perfect accomodation for your vacation
          </div>
        </div>
        <div className="flex flex-row md:flex-col justify-between md:justify-center items-center gap-8 w-full md:max-w-[300px]">
          <div className="flex flex-col">
            <Receipt size={50} className="text-blue-500 mx-auto" />
            <div className="text-xl md:text-3xl font-bold md:border-b-[2px] text-center">
              Price Comparison
              </div>
          </div>
          <div className="text-sm font-semibold text-center">
           Compare prices from different airlines and travel agents to find the best deal for your vacation
          </div>
        </div>
      </div>
      
      
    </div>
  );
}
