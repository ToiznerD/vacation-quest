"use client";

import { TLVtoBKK } from "@/app/libs/flight-detail-mock";
import { useSearchParams } from "next/navigation";
import FlightRow from "../FlightRow";
import FlightDeal from "./FlightDeal";
import { useEffect, useState } from "react";
import axios from "axios";
import useFlightDetails from "@/app/hooks/useFlightDetails";
import { FlightDetails } from "@/app/types";

interface Params {
    id?: string;
}
const FlightPage = ({params}: {params: Params}) => {
    const {id} = params;
    const searchParams = useSearchParams();
    //const token = searchParams?.get('token');
    const flightDetails = useFlightDetails();
    const { entityId, token } = flightDetails;
    const [itinerary, setItinerary] = useState<FlightDetails | undefined>(undefined)
    // useEffect(() => {
    //     const getDetails = async () => {
    //         const response = await axios.get('/api/flight', { params: { id: entityId, token: token }})
    //         console.log(response)
    //         setItinerary(response.data.data.itinerary)
    //     }
    //     getDetails();
    // }, [])
    useEffect(() => {
        setItinerary(TLVtoBKK.data.itinerary);
    }, [])
    // const itinerary = TLVtoBKK.data.itinerary;
    const options = itinerary?.pricingOptions || [];
    return ( 
        <div className="pt-20 px-20 flex flex-row justify-center">
            <div className="w-full">
                {itinerary?.pricingOptions.map((option, index) => (
                        <FlightDeal
                            key={index}
                            option={option}
                        />
                    )
                )}
            </div>
            <div className="flex flex-col gap-4 justify-center items-center p-4">
                <div className="flex flex-col gap-4 border rounded-lg p-4">
                    <span className="text-blue-900 font-bold text-lg">Outbound:</span>
                    {
                        itinerary?.legs[0].segments.map((segment, index) => (
                            <FlightRow
                                key={index}
                                imageSrc={segment.operatingCarrier.logo}
                                title={segment.operatingCarrier.name}
                                departure={segment.departure}
                                arrival={segment.arrival}
                                originId={segment.origin.displayCode}
                                destinationId={segment.destination.displayCode}
                                duration={segment.duration}
                            />
                        ))
                    }
                </div>

                <div className="flex flex-col gap-4 border rounded-lg p-4">
                    <span className="text-blue-900 font-bold text-lg">Return:</span>
                    {
                        itinerary?.legs[1].segments.map((segment, index) => (
                            <FlightRow
                                key={index}
                                imageSrc={segment.operatingCarrier.logo}
                                title={segment.operatingCarrier.name}
                                departure={segment.departure}
                                arrival={segment.arrival}
                                originId={segment.origin.displayCode}
                                destinationId={segment.destination.displayCode}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
     );
}
 
export default FlightPage;