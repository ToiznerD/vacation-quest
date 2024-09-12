'use client'

import Image from 'next/image';
import { similarHotel } from "@/app/types";
import { FaStar } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

interface Props {
    similarHotel: similarHotel;
}

const SimilarHotelCard = ({similarHotel}: Props) => {

    return (
        <div className="border-black rounded-2xl overflow-hidden w-1/3 shadow-lg cursor-pointer">
            <div className="relative h-[15vh] md:h-[25vh]">
                <Image src={similarHotel.heroImage || ''} alt={`Hotel image 0`} layout="fill" objectFit="cover"/>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-black bg-opacity-50 text-white p-4">
                    {/* hotel name and stars */}
                    <div className="flex flex-row font-bold text-sm md:text-xl">
                        <div>
                            {similarHotel.name}
                        </div>
                        <div className="flex flex-row">
                            {[...Array(Number(similarHotel.stars || 0))].map((_, i) => (<FaStar className="md:ml-2 ml-1 text-yellow-500 text-[10px] md:text-sm"/>))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative flex flex-col gap-2 p-4">

                {/* distance from hotel */}
                <div className="flex flex-row md:text-sm text-xs gap-0.5">    
                    <MdLocationPin className="text-blue-500"/>
                    {similarHotel.distance} from the hotel
                </div>

                {/* trip adviser review */}
                <div className="flex md:flex-row items-center md:items-center">
                    <div className="font-bold text-lg">
                        {similarHotel.rating.value}
                    </div>
                    <Image src={similarHotel.rating.taImage || ''} width={130} height={100} alt="taImage"/>

                    <div className="text-slate-600 font-thin text-xs md:text-base">
                        {similarHotel.rating.count} reviews
                    </div>
                </div>

                <div className="static md:absolute bottom-4 right-4 flex flex-col items-end pt-2 md:pt-0 border-t-2 md:border-t-0">
                    {/* hotel.price */}
                    <div className="text-base md:text-xl font-bold">
                        {similarHotel.price}
                    </div>
                    <div className="text-xs">
                        per night
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimilarHotelCard;