'use client'

import { hotelInfo, hotelPrice } from "@/app/types";
import { hotelInTelAviv } from '@/app/libs/hotelsDetails';


const SimilarHotelCard = () => {
    const hotelInfo = hotelInTelAviv.data;

    return (
        <div className="border-black rounded-2xl overflow-hidden w-1/3 shadow-lg">
            <div className="relative cursor-pointer h-[25vh]">
                <Image src={hotelInfo?.gallery.images[0].dynamic || ''} alt={`Hotel image 0`} layout="fill" objectFit="cover"/>
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                    <div className="flex flex-row font-bold text-sm md:text-xl">
                        {hotelInfo?.general.name}
                        {[...Array(Number(hotelInfo?.general.stars || 0))].map((_, i) => (<FaStar className="md:ml-2 ml-1 text-yellow-500"/>))}
                    </div>
                </div>
            </div>
            <div className="relative flex flex-col gap-4 p-4">
                <div>
                    {hotelInfo?.distance} 
                </div>
                <div className="flex flex-row gap-4">
                    {/* trip adviser review */}
                    <div className="font-bold">
                        {/* rating */}
                        4.0
                    </div>
                    <div>
                        {/* tripAdvisor image(of rating 4) */}
                        image
                    </div>
                    <div className="text-slate-400 font-thin">
                        (12000) reviews
                    </div>
                    
                </div>
                <div className="absolute bottom-4 right-4 flex flex-col">
                    <div className="text-xl font-bold">
                        {/* hotel.price */}
                        140 $
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