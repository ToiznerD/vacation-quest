'use client'

import { searchNewYork } from "../libs/hotelsSearch";
import HotelCard from "@/app/components/hotels/HotelCard";
import { hotelCard } from "../types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import useQuestionnaireModal from "../hooks/useQuestionnaireModal";
import { Recommendation } from "@prisma/client";
import PuffLoader from "react-spinners/PuffLoader";

const HotelsListPage = () => {
    const [hotelList, setHotelList] = useState<hotelCard[]>([]);
    const [recommendList, setRecommendList] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(false);
    const [entityId, setEntityId] = useState('');
    const params = useSearchParams();
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const destination = params?.get('destination');
    const questionnaireModal = useQuestionnaireModal();
    useEffect(() => {
        const getHotelList = async () => {
            setLoading(true);
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
            setLoading(false);
        }
        const getRecommendList = async () => {
            
            if(!questionnaireModal.data.id){
                return [];
            }
            const cleanedQuestionnaire = Object.fromEntries(
                Object.entries(questionnaireModal.data).filter(([_, v]) => v != null)
            );
            
            const response = await axios.post('/api/recommendation', {
                city: destination,
                questionnaire: cleanedQuestionnaire,
                query: params?.toString()
            });
            const recommendList = response.data.recommendations;
            
            setRecommendList(recommendList);
        }
        getRecommendList();
        getHotelList();
    }, [questionnaireModal.data]);
    
    return ( 
        <div className="pt-24">
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-white">
                    <div className="flex flex-col gap-1 justify-center items-center">
                        <PuffLoader color="#36d7b7" />
                        Collecting hotels for you...
                    </div>
                </div>
            ) : (
                <>
                    {recommendList.length > 0 && (
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <div className="text-xl md:w-[120vh] text-left font-bold p-1">
                                Recommended for you:
                            </div>
                            {
                                recommendList.map((hotelCard: Recommendation, index: any) => (
                                    <HotelCard key={index} hotelCard={hotelCard.hotelInfo as hotelCard} entityId={entityId} />
                                ))
                            }
                        </div>
                    )}
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <div className="text-xl md:w-[120vh] text-left font-bold p-1">
                                Other Options:
                            </div>
                        {
                            hotelList.map((hotelCard: hotelCard, index: any) => (
                                <HotelCard key={index} hotelCard={hotelCard} entityId={entityId} />
                            ))
                        }
                        {/* {
                            searchNewYork.data.hotels.map((hotelCard, index) => (
                                <HotelCard key={index} hotelCard={hotelCard} entityId={searchNewYork.data.entity.entity_id} />
                            ))
                        } */}
                    </div>
                </>
            )}
            
        </div>
     );
}
 
export default HotelsListPage;