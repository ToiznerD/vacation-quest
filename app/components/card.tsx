"use client"

import { Star } from "lucide-react";
import Image from "next/image";
interface Props {
    label: string;
    src: string;
    location: string;
    price: number;
    rating: number;
}

const Card = ({
    label,
    src,
    location,
    price,
    rating
} : Props) => {
    const grayStars = 5 - rating;

    return ( 
        <div className="flex flex-col cursor-pointer hover:bg-gray-50 rounded-md">
            <Image src={src+label} alt={label} width={300} height={300} className="rounded-xl" />
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