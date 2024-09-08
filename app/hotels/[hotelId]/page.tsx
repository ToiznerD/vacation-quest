'use client'

import HotelHead from "@/app/components/hotels/HotelHead";
import { hotelInfo, hotelPrice } from "@/app/types";
import { hotelInTelAviv } from '@/app/libs/hotelsDetails';
import { TelAvivHotelPrices } from "@/app/libs/hotelsPrices";
import HotelPrice from "@/app/components/hotels/HotelPrice";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const HotelPage = () => {
    const [hotelInfo, setHotelInfo] = useState<hotelInfo>();
    const [hotelPrices, setHotelPrices] = useState<hotelPrice[]>([]);
    const params = useSearchParams();
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const hotelId = params?.get('hotelId');
    const entityId = params?.get('entityId');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getHotelInfo = async () => {
            setIsLoading(true);
            const response = await axios.get('/api/hotel', {
                params: {
                    startDate,
                    endDate,
                    hotelId,
                    entityId,
                }
            });
            const hotelInfo = response.data.hotelDetails;
            const hotelPrices = response.data.hotelPrices;
            setHotelInfo(hotelInfo);
            setHotelPrices(hotelPrices);
            setIsLoading(false);
        }
        getHotelInfo();
    }, []);

    if (isLoading) {
        // change to loader
        return null;
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4 text-5xl mt-32">
            <HotelHead
                hotelInfo={hotelInfo}
                name={hotelInfo?.general.name}
                stars={hotelInfo?.general.stars}
            />

            {/* hotel prices */}
            <div className="flex flex-col gap-2 justify-center items-center">
                {
                    hotelPrices.map((hotelPrice, index) => (
                        hotelPrice.deeplink &&
                        <HotelPrice key={index} hotelPrice={hotelPrice} />
                    ))
                }
            </div>
        </div>
    );
};

export default HotelPage;