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
            <div className="relative h-[25vh]">
                <Image src={similarHotel.heroImage || ''} alt={`Hotel image 0`} layout="fill" objectFit="cover"/>
                <div className="absolute bottom-0 left-0 w-full md:h-20 bg-black bg-opacity-50 text-white p-4">
                    {/* hotel name and stars */}
                    <div className="flex flex-row font-bold text-sm md:text-xl">
                        {similarHotel.name}
                        {[...Array(Number(similarHotel.stars || 0))].map((_, i) => (<FaStar className="md:ml-2 ml-1 text-yellow-500"/>))}
                    </div>
                </div>
            </div>
            <div className="relative flex flex-col gap-4 p-4">
                <div className="flex flex-row">
                    {/* distance from hotel */}
                    <MdLocationPin className="text-blue-500 text-xl"/>
                    {similarHotel.distance} from the hotel
                </div>
                <div className="flex flex-row items-center">
                    {/* trip adviser review */}
                    <div className="font-bold text-lg">
                        {similarHotel.rating.value}
                    </div>
                    <Image src={similarHotel.rating.taImage || ''} width={130} height={100} alt="taImage"/>

                    <div className="text-slate-600 font-thin">
                        {similarHotel.rating.count} reviews
                    </div>
                    
                </div>
                <div className="absolute bottom-4 right-4 flex flex-col">
                    <div className="text-xl font-bold">
                        {/* hotel.price */}
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