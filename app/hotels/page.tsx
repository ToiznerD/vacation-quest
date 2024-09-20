'use client'

import HotelCard from "@/app/components/hotels/HotelCard";
import { hotelCard } from "../types";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import useQuestionnaireModal from "../hooks/useQuestionnaireModal";
import { Recommendation } from "@prisma/client";
import PuffLoader from "react-spinners/PuffLoader";
import { Progress } from "@/components/ui/progress";


export const dynamic = 'force-dynamic';

const HotelsListPage = () => {
    const [hotelList, setHotelList] = useState<hotelCard[]>([]);
    const [recommendList, setRecommendList] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(false);
    const [entityId, setEntityId] = useState('');
    const params = useSearchParams();
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const roomCount = params?.get('roomCount')
    const destination = params?.get('destination');
    const adults = params?.get('adults');

    //delete
    // const hotelList = searchNewYork.data.hotels;

    const questionnaireModal = useQuestionnaireModal();
    useEffect(() => {
        const getHotels = async () => {
            // Get hotel list
            setLoading(true);
            const response = await axios.get('/api/hotels', {
                params: {
                    startDate,
                    endDate,
                    destination,
                    roomCount,
                    adults
                }
            });
            const hotelList = response.data.hotelCards;
            const entityId = response.data.entityId;
            setHotelList(hotelList);
            setEntityId(entityId);

            // Get recommend list
            let recommendList = [];

            if(!questionnaireModal.data.id){
                 const response = await axios.post('/api/recommendation', {
                    city: destination,
                    questionnaire: {},
                    query: params?.toString(),
                    entityId,
                    startDate,
                    endDate,
                    roomCount,
                    adults
                });
                recommendList = response.data.recommendations;
            } else {
                const cleanedQuestionnaire = Object.fromEntries(
                    Object.entries(questionnaireModal.data).filter(([_, v]) => v != null)
                );
                
                const response = await axios.post('/api/recommendation', {
                    city: destination,
                    questionnaire: cleanedQuestionnaire,
                    query: params?.toString(),
                    entityId,
                    startDate,
                    endDate,
                    roomCount,
                    adults
                });
                recommendList = response.data.recommendations;
            }
            
            setRecommendList(recommendList);

            setLoading(false);
        }

        getHotels();
    }, [questionnaireModal.data, adults, destination, endDate, params, roomCount, startDate]);
    
    return ( 
        <div className="pt-24">
            {/* loader */}
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-white">
                    <div className="flex flex-col gap-1 justify-center items-center">
                        <PuffLoader color="#36d7b7" />
                        Collecting hotels for you...
                    </div>
                </div>
            ) : (
                <>
                    {/* topic */}
                    <div className="flex flex-row justify-between items-center text-lg gap-1 w-full px-10">
                        <div>Choose your hotel!</div>
                        <div className="flex flex-col justify-end gap-1">
                            <div className="text-xs flex justify-center">Step 3/4</div>
                            <Suspense>
                                <Progress value={75} className="w-[20vh] md:w-[30vh] lg:w-[40vh] xl:w-[50vh]"/>
                            </Suspense>
                        </div>
                        <div className="text-lg font-semibold">  
                            
                        </div>
                    </div>


                    {/* hotels */}
                    <div className="mt-24">
                        {/* recommended hotels */}
                        {recommendList && recommendList.length > 0 && (
                            <div className="flex flex-col gap-2 justify-center items-center w-full">
                                <div className="text-xl text-left font-bold p-1">
                                    Recommended for you:
                                </div>
                                {
                                    recommendList.map((hotelCard: Recommendation, index: any) => (
                                        <HotelCard key={index} hotelCard={hotelCard.hotelInfo as hotelCard} entityId={entityId} />
                                    ))
                                }
                            </div>
                        )}

                        {/* other hotels */}
                        <div className="flex flex-col gap-2 justify-center items-center">
                            {recommendList.length > 0 &&
                            <div className="text-xl text-left font-bold p-1">
                                Other Options:
                            </div>}
                            {
                                hotelList.map((hotelCard: hotelCard, index: any) => (
                                    <HotelCard key={index} hotelCard={hotelCard} entityId={entityId} />
                                ))
                            }
                        </div>
                    </div>
                    
                </>
            )}

        </div>
     );
}
 
export default HotelsListPage;