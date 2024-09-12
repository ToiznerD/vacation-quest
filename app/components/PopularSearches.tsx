
import { useEffect } from "react";
import Card from "./card";

interface PopularHotel {
    label: string;
    src: string;
    location: string;
    price: number;
    rating: number;
  }

interface Props {
    popularHotels: PopularHotel[]
}

const PopularSearches = ({popularHotels}: Props) => {

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
        <div className="flex flex-col gap-3">
            <div className="text-3xl font-bold">
            Popular searches
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {popularHotels.map((item, index) => (
            <Card key={index} label={item.label} src={item.src} location={item.location} price={item.price} rating={item.rating}/>
            ))}
        </div>
      </div>
     );
}
 
export default PopularSearches;