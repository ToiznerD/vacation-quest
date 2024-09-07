'use client'

import HotelHead from "@/app/components/hotels/HotelHead";
import { hotelInfo, hotelPrice } from "@/app/types";
import { hotelInTelAviv } from '@/app/libs/hotelsDetails';
import { TelAvivHotelPrices } from "@/app/libs/hotelsPrices";
import HotelPrice from "@/app/components/hotels/HotelPrice";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";

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

    return (
        <div className="flex flex-col justify-center items-center gap-4 text-5xl mt-52">
            {isLoading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-white">
                    <div className="flex flex-col gap-1 justify-center items-center">
                        <PuffLoader color="#36d7b7" />
                        Fetching hotel details...
                    </div>
                </div>
            ) : (
                <>
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
                </>
            )}
            
        </div>
    );
};

export default HotelPage;