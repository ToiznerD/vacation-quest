'use client'

import { hotelPrice } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaLongArrowAltRight } from "react-icons/fa";

interface Props {
    hotelPrice: hotelPrice;
}

const HotelPrice = ({hotelPrice}: Props) => {
    return (
        <div className="flex flex-row justify-between w-[40vh] md:w-[80vh] p-4 border-b-[1px]">
            <div className="text-lg md:text-2xl">
                <Image 
                    src={hotelPrice.partnerLogo}
                    width={150}
                    height={100}
                    alt="Hotel Logo"
                />
            </div>
            <div className="flex flex-row gap-4 items-center text-xl">
                <span className="font-semibold">{hotelPrice.price}</span>
                <div className="flex flex-row rounded-lg text-white justify-center items-center p-2 md:p-4 font-bold bg-blue-500 hover:bg-blue-500/90 cursor-pointer">
                    <a href={`https://${hotelPrice.deeplink}`}>
                        Select
                    </a>
                    <FaLongArrowAltRight className="ml-2"/>
                </div>
            </div>
        </div>
    );
};

export default HotelPrice;