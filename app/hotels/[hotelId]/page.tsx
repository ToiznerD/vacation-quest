'use client'

import HotelHead from "@/app/components/hotels/HotelHead";
import { hotelInfo } from "@/app/types";
import { hotelInNewYork } from '@/app/lib/hotels-detail';
import { NewYorkHotelPrices } from "@/app/lib/hotels-prices";
import HotelPrice from "@/app/components/hotels/HotelPrice";

interface Props {
    hotelInfo : hotelInfo;
}
const HotelPage = ({ hotelInfo }: Props) => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 text-5xl mt-52">
            <HotelHead
                name={hotelInNewYork.data.general.name}
                stars={hotelInNewYork.data.general.stars}
            >

            </HotelHead>

            {/* hotel prices */}
            <div className="flex flex-col gap-2 justify-center items-center">
                {
                    NewYorkHotelPrices.data.otaRates.map((hotelPrice, index) => (
                        <HotelPrice key={index} hotelPrice={hotelPrice} />
                    ))
                }
            </div>
        </div>
    );
};

export default HotelPage;