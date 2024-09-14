
import { useEffect } from "react";
import Card from "./card";

interface PopularHotel {
    label: string;
    src: string;
    location: string;
    price: number;
    rating: number;
    hotelId: string;
  }

interface Props {
    popularHotels: PopularHotel[]
}

const PopularSearches = ({popularHotels}: Props) => {


    return ( 
        <div className="flex flex-col gap-3">
            <div className="text-3xl font-bold">
            Popular searches
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {popularHotels.map((item, index) => (
            <Card key={index} label={item.label} src={item.src} hotelId={item.hotelId} location={item.location} price={item.price} rating={item.rating}/>
            ))}
        </div>
      </div>
     );
}
 
export default PopularSearches;