'use client'

import HotelHead from "@/app/components/hotels/HotelHead";
import { hotelInfo } from "@/app/types";
import { hotelInTelAviv } from '@/app/lib/hotelsDetails';
import { TelAvivHotelPrices } from "@/app/lib/hotelsPrices";
import HotelPrice from "@/app/components/hotels/HotelPrice";

interface Props {
    hotelInfo : hotelInfo;
}
const HotelPage = ({ hotelInfo }: Props) => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 text-5xl mt-52">
            <HotelHead
                name={hotelInTelAviv.data.general.name}
                stars={hotelInTelAviv.data.general.stars}
            />

            {/* hotel prices */}
            <div className="flex flex-col gap-2 justify-center items-center">
                {
                    TelAvivHotelPrices.data.otaRates.map((hotelPrice, index) => (
                        hotelPrice.deeplink &&
                        <HotelPrice key={index} hotelPrice={hotelPrice} />
                    ))
                }
            </div>
        </div>
    );
};

export default HotelPage;