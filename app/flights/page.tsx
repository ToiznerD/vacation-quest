"use client";

import FlightCard from "./FlightCard";
import { roundedtrip_tlv_bkk } from "../libs/flight-roundtrip";
import { Checkbox } from "@/components/ui/checkbox";
import { itinerary } from "../types";
import { useState } from "react";

interface Props {
    itineraries: itinerary[];
}

const FlightListPage = ({ itineraries }: Props ) => {
    const [directFlag, setDirectFlag] = useState(true);
    const [oneStopFlag, setOneStopFlag] = useState(true);
    const [twoStopFlag, setTwoStopFlag] = useState(true);

    const deals = roundedtrip_tlv_bkk.data.itineraries;

    const filteredDeals = deals.filter(deal => {
        if (directFlag && deal.legs[0].stopCount === 0) return true;
        if (oneStopFlag && deal.legs[0].stopCount === 1) return true;
        if (twoStopFlag && deal.legs[0].stopCount > 1) return true;
        return false;
    });

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
                </div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
                {
                    filteredDeals.map((itinerary, index) => (
                        <FlightCard key={index} itinerary={itinerary} token={roundedtrip_tlv_bkk.data.token}/>
                    ))
                }
            </div>
        </div>
     );
}
 
export default FlightListPage;