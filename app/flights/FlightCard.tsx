"use client";

import Image from "next/image";
import { itinerary } from "../types";
import { ArrowBigRight, CircleAlert, Minus, PlaneLanding, PlaneTakeoff } from "lucide-react";
import Button from "@/app/components/Button";
import { format } from "date-fns";
import { FaLongArrowAltRight } from "react-icons/fa";
import FlightRow from "./FlightRow";
import useFlightModal from "../hooks/useFlightModal";
import { useRouter } from "next/navigation";
import useFlightDetails from "../hooks/useFlightDetails";



interface Props {
    itinerary: itinerary;
    token: string;
}



const FlightCard = ({ itinerary, token }: Props) => {
    const { onOpen, setId, setToken } = useFlightModal();
    const router = useRouter();
    const flightDetails = useFlightDetails();
    const handleSelect = () => {
        flightDetails.setData(token, itinerary.id);
        router.push(`/flights/${itinerary.id}?token=${token}`);
    }

    return ( 
        <div 
            className="flex flex-col md:flex-row p-4 gap-8 border-2 border-blue-400 rounded-lg"
        >
                <div className="flex flex-col gap-8 w-full">

                    <FlightRow 
                        imageSrc={itinerary.legs[0].carriers.marketing[0].logoUrl}
                        title={itinerary.legs[0].carriers.marketing[0].name}
                        departure={itinerary.legs[0].departure}
                        arrival={itinerary.legs[0].arrival}
                        originId={itinerary.legs[0].origin.id}
                        destinationId={itinerary.legs[0].destination.id}
                        stops={itinerary.legs[0].stopCount}
                        duration={itinerary.legs[0].durationInMinutes}
                    />


                    <FlightRow 
                        imageSrc={itinerary.legs[1].carriers.marketing[0].logoUrl}
                        title={itinerary.legs[1].carriers.marketing[0].name}
                        departure={itinerary.legs[1].departure}
                        arrival={itinerary.legs[1].arrival}
                        originId={itinerary.legs[1].origin.id}
                        destinationId={itinerary.legs[1].destination.id}
                        stops={itinerary.legs[1].stopCount}
                        duration={itinerary.legs[1].durationInMinutes}
                    />

                </div>
                <div className="md:min-h-full w-full md:w-[20vh] border-t md:border-t-0 md:border-l flex justify-center items-center p-4 md:p-8 pr-4">
                    <div className="flex flex-row md:flex-col gap-4 justify-between items-center">
                        {itinerary.isSelfTransfer && (
                            <div className="md:hidden">
                                <div className="flex flex-row gap-1">
                                    <CircleAlert size={20} className="text-rose-500 my-auto" />
                                    <span className="text-xs text-rose-500 font-semibold my-auto">Self-Transfer</span>
                                </div>
                            </div>
                        )}
                        <span className="font-semibold text-xl hidden md:block">{itinerary.price.formatted}</span>
                        <div 
                            onClick={handleSelect} 
                            className="flex flex-row rounded-lg text-white justify-center items-center p-4 font-bold bg-blue-500 hover:bg-blue-500/90 cursor-pointer"
                            >
                            <div>
                                Select
                            </div>
                            <FaLongArrowAltRight className="ml-2"/>
                        </div>
                        <span className="font-semibold md:hidden text-xl">{itinerary.price.formatted}</span>
                        {itinerary.isSelfTransfer && (
                            <div className="hidden md:block">
                                <div className="flex flex-row gap-1">
                                    <CircleAlert size={20} className="text-rose-500 my-auto" />
                                    <span className="text-xs text-rose-500 font-semibold my-auto">Self-Transfer</span>
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
        </div>
     );
}
 
export default FlightCard;
