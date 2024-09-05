'use client'

import { searchNewYork } from "../libs/hotelsSearch";
import HotelCard from "@/app/components/hotels/HotelCard";
import { hotelCard } from "../types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const HotelsListPage = () => {
    const [hotelList, setHotelList] = useState<hotelCard[]>([]);
    const [entityId, setEntityId] = useState('');
    const params = useSearchParams();
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const destination = params?.get('destination');

    useEffect(() => {
        const getHotelList = async () => {
            const response = await axios.get('/api/hotels', {
                params: {
                    startDate,
                    endDate,
                    destination,
                }
            });
            const hotelList = response.data.hotelCards;
            const entityId = response.data.entityId;
            setHotelList(hotelList);
            setEntityId(entityId);
        }
        getHotelList();
    }, []);
    
    return ( 
        <div className="pt-24">
            <div className="flex flex-col gap-2 justify-center items-center">
                {
                    hotelList.map((hotelCard: hotelCard, index: any) => (
                        <HotelCard key={index} hotelCard={hotelCard} entityId={entityId} />
                    ))
                }
            </div>
        </div>
     );
}
 
export default HotelsListPage;