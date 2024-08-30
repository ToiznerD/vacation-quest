'use client'

import HotelHead from "@/app/components/hotels/HotelHead";
import { hotelInfo } from "@/app/types";
import { hotelInNewYork } from '@/app/lib/hotels-detail';
import HotelPrices from "@/app/components/hotels/HotelPrices";

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

            <HotelPrices 

            />
        </div>
    );
};

export default HotelPage;