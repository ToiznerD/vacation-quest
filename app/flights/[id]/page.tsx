"use client";

import { useRouter, useSearchParams } from "next/navigation";
import FlightDeal from "./FlightDeal";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FlightDetails } from "@/app/types";
import PuffLoader from 'react-spinners/PuffLoader';
import { FaLongArrowAltRight } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import FlightDetail from "./FlightDetail";
import qs from 'query-string';

interface Params {
    id?: string;
}
const FlightPage = ({params}: {params: Params}) => {
    const {id} = params;
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const token = searchParams?.get('token');
    const router = useRouter();
    const [itinerary, setItinerary] = useState<FlightDetails | undefined>(undefined)
    useEffect(() => {
        const getDetails = async () => {
            setLoading(true);
            const response = await axios.get('/api/flight', { params: { id, token: token }})
            console.log(response)
            setItinerary(response.data.data.itinerary)
            setLoading(false);
        }
        getDetails();
    }, [])


    const handleNext = useCallback(() => {
        let currentQuery = {};

        if (searchParams){
            currentQuery = qs.parse(searchParams.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            token,
            
        }
        const url = qs.stringifyUrl({
            url: `/hotels`,
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);
    }, [])

    return ( 
        <div className="pt-20 md:px-20 flex flex-col justify-center">
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-white">
                    <div className="flex flex-col gap-1 justify-center items-center">
                        <PuffLoader color="#36d7b7" />
                        Fetching flight details...
                        </div>
                </div>) : 
            (<>
                <div className="flex mb-4 flex-col md:flex-row justify-between items-center text-lg gap-1 w-full px-10">
                    <div>Find the best deal for your flight</div>
                    <div className="flex flex-col justify-end gap-1">
                        <div className="text-xs flex justify-center">Step 2/4</div>
                        <Progress value={50} className="w-[20vh] md:w-[30vh] lg:w-[40vh] xl:w-[50vh]"/>
                    </div>
                    <div className="flex flex-row rounded-lg text-white justify-center items-center p-2 md:p-4 font-bold bg-blue-500 hover:bg-blue-500/90 cursor-pointer">
                        <div onClick={handleNext}>
                            Next
                        </div>
                        <FaLongArrowAltRight className="ml-2"/>
                    </div>
                    
                </div>
                <div className="flex flex-col md:flex-row gap-2 justify-center">
                    <FlightDetail itinerary={itinerary} className="block md:hidden w-full"/>
                    <div className="w-full">
                        {itinerary?.pricingOptions.map((option, index) => (
                                <FlightDeal
                                    key={index}
                                    option={option}
                                />
                            )
                        )}
                    </div>
                    <FlightDetail itinerary={itinerary} className="hidden md:block"/>
                </div>
            </>)}
        </div>
     );
}
 
export default FlightPage;