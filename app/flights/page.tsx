"use client";

import FlightCard from "./FlightCard";
import { roundedtrip_tlv_bkk } from "../libs/flight-roundtrip";
import { Checkbox } from "@/components/ui/checkbox";
import { itinerary } from "../types";
import { useEffect, useMemo, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useSearchParams } from "next/navigation";
import axios from "axios";


const FlightListPage = () => {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [deals, setDeals] = useState<itinerary[]>([]);
    const [token, setToken] = useState('');
    const originPosition = searchParams?.get('originPosition') || '[0, 0]';
    const position = searchParams?.get('position') || '[0, 0]';
    const startDate = searchParams?.get('startDate');
    const endDate = searchParams?.get('endDate');

    useEffect(() => {
        const getFlights = async () => {
            setLoading(true);
            try {
                // const response = await axios.get('/api/flights', { params: { originPosition, position, startDate, endDate } });
                // console.log(response);
                // setDeals(response.data.data.itineraries);
                // setToken(response.data.data.token)

                setDeals(roundedtrip_tlv_bkk.data.itineraries);
                setToken('5cafd19031msh154445f4f635b20p1f63a7jsn09b9bc3ba2ea');
            } finally {
                setLoading(false);
            }
        }

        getFlights();
    }, [originPosition, position, startDate, endDate]);

    const [directFlag, setDirectFlag] = useState(true);
    const [oneStopFlag, setOneStopFlag] = useState(true);
    const [twoStopFlag, setTwoStopFlag] = useState(true);
    
    const maxPrice = useMemo(() => {
        return deals ? (deals.length > 0 ? Math.max(...deals.map(deal => deal.price.raw)) : 0) : 10000;
    }, [deals]);

    const minPrice = useMemo(() => {
        return deals ? (deals.length > 0 ? Math.min(...deals.map(deal => deal.price.raw)) : 0) : 10000;
    }, [deals]);

    const [price, setPrice] = useState([maxPrice]);

    useEffect(() => {
        setPrice([maxPrice]);
    }, [maxPrice])
    const filteredDeals = useMemo(() => {
        return deals ? deals.filter(deal => {
            const meetsStopCriteria = 
                (directFlag && deal.legs[0].stopCount === 0) ||
                (oneStopFlag && deal.legs[0].stopCount === 1) ||
                (twoStopFlag && deal.legs[0].stopCount > 1);
            
            const meetsPriceCriteria = price[0] >= deal.price.raw;
        
            return meetsStopCriteria && meetsPriceCriteria;
        }) : [];
    }, [deals, directFlag, oneStopFlag, twoStopFlag, price]);

    return ( 
        <div className="pt-24 flex flex-row gap-8 w-full">
            <div className="sticky top-24 h-[calc(100vh-6rem)] bg-gray-100/50 rounded-lg p-4 overflow-y-auto w-[20%]">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="text-lg font-bold text-blue-900">
                            Stops
                        </div>
                        <div className="text-sm flex flex-row gap-2">
                            <Checkbox 
                                onCheckedChange={() => setDirectFlag(!directFlag)}
                                checked={directFlag}
                            /> Direct
                        </div>
                        <div className="text-sm flex flex-row gap-2">
                            <Checkbox 
                                onCheckedChange={() => setOneStopFlag(!oneStopFlag)}
                                checked={oneStopFlag}
                            /> 1 stop
                        </div>
                        <div className="text-sm flex flex-row gap-2">
                            <Checkbox 
                                onCheckedChange={() => setTwoStopFlag(!twoStopFlag)}
                                checked={twoStopFlag}
                            /> 2+ stops
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-lg font-bold text-blue-900">
                            Max Price:
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="text-lg font-bold text-blue-900 font-serif">${price[0]}</div>
                            <Slider onValueChange={(value) => setPrice(value)} defaultValue={price} min={minPrice} max={maxPrice} step={10}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
                { loading ? (
                    <div className="text-lg text-center font-bold text-blue-900">
                        Loading...
                    </div>) : (
                        <>
                        {
                            filteredDeals.map((itinerary, index) => (
                                <FlightCard key={index} itinerary={itinerary} token={token}/>
                            ))
                        }
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default FlightListPage;
