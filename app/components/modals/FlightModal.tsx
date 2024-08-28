"use client";

import useFlightModal from "@/app/hooks/useFlightModal";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import {TLVtoBKK} from '@/app/libs/flight-detail-mock';
import FlightRow from "@/app/flights/FlightRow";



const FlightModal = () => {
    const { isOpen, onOpen, onClose, id, token, setId, setToken } = useFlightModal();
    const [loading, setLoading] = useState();

    const handleClose = useCallback(() => {
        onClose();
        setId('');
        setToken('');
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

    return ( 
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
                    {/* CONTENT    */}
                    <div className={`
                    translate duration-300 h-full ${isOpen ? 'translate-y-0' : 'translate-y-full'} ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            { /* HEADER */}
                            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                                <button
                                    onClick={handleClose}
                                    className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                                    <IoMdClose size={18} />
                                </button>
                                <div className="text-lg font-semibold">
                                    Title
                                </div>
                            </div>
                            { /* BODY */}
                            <div className="relative p-6 flex-auto">
                                <div className="flex flex-col gap-8 w-full">

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
                                            />
                                        ))
                                    }

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
                            { /* FOOTER */}
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-row justify-center items-center gap-4 w-full">

                                    Buttons?
                                    
                                </div>
                                Footer
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default FlightModal;