"use client";

import { FlightOption } from "@/app/types";
import { Star, StarHalf } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaLongArrowAltRight } from "react-icons/fa";

interface Props {
    option: FlightOption;
}
const FlightDeal = ({ option }: Props) => {

    const goldStars = Math.floor(option.agents[0].rating.value);
    const halfGoldStar = option.agents[0].rating.value - goldStars >= 0.5;
    const silverStars = 5 - goldStars - (halfGoldStar ? 1 : 0);
    const router = useRouter();

    return ( 
        <div className="w-full border-b flex flex-row justify-between p-4">
            <div className="flex flex-col gap-2">
                <div className="font-bold text-lg text-blue-900">
                    {option.agents[0].name}
                </div>
                <div className="flex flex-col md:flex-row gap-1">
                    <div className="border rounded-xl w-10 text-center p-1 text-xs bg-gray-200">
                        {option.agents[0].rating.count}
                    </div>
                    <div className="flex flex-row">
                        {[...Array(goldStars)].map((_, i) => (<Star color="gold" fill="gold" key={i} />))}
                        {halfGoldStar && <StarHalf color="gold" fill="gold" />}
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-row gap-4 my-auto">
                <div className="font-bold text-lg text-blue-900 my-auto">
                    ${option.totalPrice}
                </div>
                <a 
                    href={option.agents[0].url} 
                    target="_blank"
                    className="flex flex-row rounded-lg text-white justify-center items-center p-4 font-bold bg-blue-500 hover:bg-blue-500/90 cursor-pointer"
                    >
                    <div>
                        Select
                    </div>
                    <FaLongArrowAltRight className="ml-2"/>
                </a>
            </div>
        </div>
     );
}
 
export default FlightDeal;