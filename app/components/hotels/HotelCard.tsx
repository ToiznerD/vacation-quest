'use client'

import { hotelCard } from "@/app/types";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaLongArrowAltRight, FaStar } from "react-icons/fa";

interface Props {
    hotelCard: hotelCard;
}

const HotelCard = ({ hotelCard }: Props) => {
    const [imgCount, setImgCount] = useState(0);
    const router = useRouter();
    
    const NextImg = () => {
        console
        if (imgCount === 2) {
            setImgCount(() => 0);
            return;
        }
        setImgCount((imgCount) => imgCount + 1);
    };

    return (
        <div className="flex flex-row md:w-[120vh] mb-4 border-2 border-blue-400 rounded-lg">
            <div className="relative h-[20vh]">
                <Image
                    src={hotelCard.images[imgCount]}
                    width={500}
                    height={100}
                    alt="Hotel image"
                    className="cursor-pointer h-full"
                    onClick={() => NextImg()}
                />
                <div className={`absolute bottom-3 left-[43%] rounded-full h-2 w-2 ${imgCount === 0 ? 'bg-rose-500' : 'bg-blue-500'}`} />
                <div className={`absolute bottom-3 left-[50%] rounded-full h-2 w-2 ${imgCount === 1 ? 'bg-rose-500' : 'bg-blue-500'}`} />
                <div className={`absolute bottom-3 left-[57%] rounded-full h-2 w-2 ${imgCount === 2 ? 'bg-rose-500' : 'bg-blue-500'}`} />
            </div>
            
            
            <div className="flex flex-col md:flex-row justify-between w-full">
                {/* decription */}
                <div className="p-4 py-2">
                    <div className="flex flex-col text-reg md:text-lg gap-6">
                        <div className="font-bold text-lg md:text-xl flex flex-row">
                            {hotelCard.name}
                            {[...Array(Number(hotelCard.stars))].map((_, i) => (<FaStar className="md:ml-2 ml-1 text-yellow-500"/>))}
                        </div>
                        <div>
                            {hotelCard.distance}
                        </div>
                        <div>
                            {hotelCard.relevantPoiDistance}
                        </div>
                        <div className="flex flex-row gap-[4px]">
                            <div className="font-bold">
                                {hotelCard.reviewSummary 
                                ?   `${hotelCard.reviewSummary?.value} - ${hotelCard.reviewSummary?.description}`
                                :   "No reviews available"}
                            </div>
                            <div className="text-gray-500">
                                {hotelCard.reviewSummary 
                                    ?   `(${hotelCard.reviewSummary?.formatCount} reviews)`
                                    :   ""}
                            </div>
                        </div>
                    </div>
                </div>
                {/* button and price */}
                <div className="flex flex-row md:flex-col justify-center items-center gap-4 md:gap-4 border-t md:border-t-0 md:border-l pt-4 md:pt-0 m-4 md:pr-4 md:pl-8">
                    <div className="font-bold text-base break-all">
                        {hotelCard.cheapestOfferPartnerName}
                    </div>
                    <span className="font-semibold text-xl">{hotelCard.priceDescription}</span>
                    <div className="flex flex-row rounded-lg text-white justify-center items-center p-2 md:p-4 font-bold bg-blue-500 hover:bg-blue-500/90 cursor-pointer"
                        onClick={() => router.push(`/hotels/${hotelCard.hotelId}`)}>
                        <div>
                            Select
                        </div>
                        <FaLongArrowAltRight className="ml-2"/>
                    </div>
                </div>
                
            </div>


        </div>
    );
};

export default HotelCard;