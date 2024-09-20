"use client"

import { Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import usePopularHotelModal from "../hooks/usePopularHotelModal";
interface Props {
    label: string;
    src: string;
    location: string;
    price: number;
    rating: number;
    hotelId: string;
}

const Card = ({
    label,
    src,
    location,
    price,
    rating,
    hotelId
} : Props) => {
    const grayStars = 5 - rating;
    const popularHotelModal = usePopularHotelModal();

    const handleClick = useCallback(() => {
        popularHotelModal.setHotelId(hotelId)
        popularHotelModal.setDestination(location)
        popularHotelModal.onOpen();

    }, [popularHotelModal, hotelId, location])
    return ( 
        <div onClick={handleClick} className="flex flex-col cursor-pointer hover:bg-gray-50 rounded-md">
            <img src={src} alt={label} className="w-full h-[200px] rounded-xl"/> 
            <div className="flex flex-row gap-1">
                {[...Array(rating)].map((_, i) => (<Star key={i} size={15} className="text-yellow-400 fill-yellow-400" />))}
                {[...Array(grayStars)].map((_, i) => (<Star key={i} size={15} className="text-gray-400 fill-gray-400" />))}
            </div>
            <div>
              {label}
            </div>
            <div className="text-xs text-slate-400">
              {location}
            </div>
            <div>
                ${price} <span className="text-slate-400 text-xs">night</span>
            </div>
          </div>
     );
}
 
export default Card;