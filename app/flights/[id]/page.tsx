"use client";

import { TLVtoBKK } from "@/app/libs/flight-detail-mock";
import { useSearchParams } from "next/navigation";
import FlightRow from "../FlightRow";
import FlightDeal from "./FlightDeal";

interface Params {
    id?: string;
}
const FlightPage = ({params}: {params: Params}) => {
    const {id} = params;
    const searchParams = useSearchParams();
    const token = searchParams?.get('token');
    return ( 
        <div className="pt-20 px-20 flex flex-row justify-center items-center">
            <div className="w-full">
                {TLVtoBKK.data.itinerary.pricingOptions.map((option, index) => (
                        <FlightDeal
                            key={index}
                            option={option}
                            token={token}
                        />
                    )
                )}
            </div>
            <div className="flex flex-col gap-4 justify-center items-center p-4">
                <div className="flex flex-col gap-4 border rounded-lg p-4">
                    <span className="text-blue-900 font-bold text-lg">Outbound:</span>
                    {
                        TLVtoBKK.data.itinerary.legs[0].segments.map((segment, index) => (
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
                        TLVtoBKK.data.itinerary.legs[1].segments.map((segment, index) => (
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