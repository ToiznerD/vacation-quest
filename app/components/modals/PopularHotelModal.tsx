"use client";

import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from 'query-string';
import { format, formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import GeocodingMap from "../Geocoding";
import useSearchModal from "@/app/hooks/useSearchModal";
import toast from "react-hot-toast";
import usePopularHotelModal from "@/app/hooks/usePopularHotelModal";

enum STEPS {
    DATE = 0,
    INFO = 1
}

const PopularHotelModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const popularHotelModal = usePopularHotelModal();
    const [step, setStep] = useState(STEPS.DATE);
    const { entityId } = popularHotelModal;
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [roomCount, setRoomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });


    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, [])
    
    const onNext = useCallback(() => {        
        setStep((value) => value + 1);
    }, [step])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }
        
        let currentQuery = {};

        if (params){
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            entityId,
            adults,
            children,
            roomCount
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = format(dateRange.startDate, 'yyyy-MM-dd');
        }

        if(dateRange.endDate) {
            updatedQuery.endDate = format(dateRange.endDate, 'yyyy-MM-dd');
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        setStep(STEPS.DATE);
        popularHotelModal.onClose();
        router.push(`/hotels/${entityId}/` + url);
    }, [step, popularHotelModal, entityId, router, adults, children, roomCount, dateRange, onNext, params]);

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO){
            return 'Search';
        }

        return 'Next';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.DATE){
            return undefined;
        }

        return 'Back';
    }, [step] )


        let bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="When do you plan to go?"
                    subtitle="Make sure everyone is free!"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )

    if (step === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subtitle="Find your perfect place"
                />
                <Counter 
                    title="Adults"
                    subtitle="How many adults are coming?"
                    value={adults}
                    onChange={(value) => setAdults(value)}
                />
                <Counter 
                    title="Children"
                    subtitle="How many children are coming?"
                    value={children}
                    onChange={(value) => setChildren(value)}
                />
                <Counter 
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
            </div>
        )
    }
    return ( 
        <Modal 
            isOpen={popularHotelModal.isOpen}
            onClose={popularHotelModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.DATE ? undefined : onBack}
            body={bodyContent}
        />
     );
}
 
export default PopularHotelModal;

