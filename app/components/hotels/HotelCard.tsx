'use client'

import { hotelCard } from "@/app/types";
import Image from 'next/image'
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { FaLongArrowAltRight, FaStar } from "react-icons/fa";
import qs from 'query-string';
import axios from "axios";
import useQuestionnaireModal from "@/app/hooks/useQuestionnaireModal";
import { differenceInDays } from "date-fns";

interface Props {
    entityId: string;
    hotelCard: hotelCard;
}

const HotelCard = ({ hotelCard, entityId }: Props) => {
    const [imgCount, setImgCount] = useState(0);
    const router = useRouter();
    const params = useSearchParams();
    const questionnaireModal = useQuestionnaireModal();
    const [days, setDays] = useState(1);
    
    const NextImg = () => {
        console
        if (imgCount === 2) {
            setImgCount(() => 0);
            return;
        }
        setImgCount((imgCount) => imgCount + 1);
    };

    const handleClick = useCallback(async () => {

        let currentQuery: { destination?: string, endDate?: string, startDate?: string} = {};
        let destination = '';
        if (params){
            currentQuery = qs.parse(params.toString());
            destination = currentQuery.destination || '';
        }


        axios.post('/api/embedding', {
            city: destination,
            hotelInfo: hotelCard,
            questionnaire: questionnaireModal.data
        })

        
        setDays(differenceInDays(new Date(currentQuery.endDate || ''), new Date(currentQuery.startDate || '')))
        
        const updatedQuery: any = {
            ...currentQuery,
            entityId,
            hotelId: hotelCard.hotelId,
        }

        const url = qs.stringifyUrl({
            url: `/hotels/${hotelCard.hotelId}`,
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);
    }, [entityId, hotelCard, params, questionnaireModal.data, router]);

    if(!hotelCard.rawPrice){
        return null;
    }

    return (
        <div className="flex flex-col md:flex-row w-full mt-4 border-2 border-blue-400 rounded-lg">
            <div className="relative">

                <div className="h-[25vh] ">
                    <Image
                        src={hotelCard.images ? hotelCard.images[imgCount] : ''}
                        width={500}
                        height={100}
                        alt="Hotel image"
                        className="cursor-pointer h-full"
                        onClick={() => NextImg()}
                    />
                    <div className={`absolute bottom-3 left-[43%] rounded-full h-2 w-2 ${imgCount === 0 ? 'bg-rose-500' : 'bg-blue-500'}`} />
                    <div className={`absolute bottom-3 left-[50%] rounded-full h-2 w-2 ${imgCount === 1 ? 'bg-rose-500' : 'bg-blue-500'}`} />
                    <div className={`absolute bottom-3 left-[57%] rounded-full h-2 w-2 ${imgCount === 2 ? 'bg-rose-500' : 'bg-blue-500'}`} />
                </div>
            </div>
            
            
            <div className="flex flex-col md:flex-row justify-between w-full">
                {/* decription */}
                <div className="p-4 py-2">
                    <div className="flex flex-col text-reg md:text-lg gap-4 ">

                        <div className="flex flex-row font-bold text-reg md:text-xl">
                            <div>
                                {hotelCard.name}
                            </div>
                            <div className="flex flex-row">
                                {[...Array(Number(hotelCard.stars))].map((_, i) => (<FaStar key={i} className="md:ml-2 ml-1 text-yellow-500"/>))}
                            </div>
                        </div>
                        <div>
                            {hotelCard.distance}
                        </div>
                        <div>
                            {hotelCard.relevantPoiDistance}
                        </div>
                        <div className="flex flex-row gap-[4px]">
                            <div className="font-bold">
                                {hotelCard.reviewSummary 
                                ?   `${hotelCard.reviewSummary?.value} - ${hotelCard.reviewSummary?.description}`
                                :   "No reviews available"}
                            </div>
                            <div className="text-gray-500">
                                {hotelCard.reviewSummary 
                                    ?   `(${hotelCard.reviewSummary?.formatCount} reviews)`
                                    :   ""}
                            </div>
                        </div>
                    </div>
                </div>
                {/* button and price */}
                <div className="flex flex-row md:flex-col md:justify-center justify-end items-center gap-4 md:gap-4 border-t md:border-t-0 md:border-l pt-4 md:pt-0 m-4 md:pr-4 md:pl-8">
                    <div className="font-bold text-base break-all">
                        {hotelCard.cheapestOfferPartnerName}
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="font-bold text-base md:text-xl">${hotelCard.rawPrice}</span>
                        <span className="text-xs">per night</span>
                    </div>
                    <div className="flex flex-row rounded-lg text-white justify-center items-center p-2 md:p-4 font-bold bg-blue-500 hover:bg-blue-500/90 cursor-pointer"
                        onClick={handleClick}>
                        <div>
                            Select
                        </div>
                        <FaLongArrowAltRight className="ml-2"/>
                    </div>
                </div>
                
            </div>


        </div>
    );
};

export default HotelCard;