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

enum STEPS {
    LOCATION = 0,
    DESTINATION = 1,
    DATE = 2,
    INFO = 3
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const [destination, setDestination] = useState('');
    const [location, setLocation] = useState('');
    const [originPosition, setOriginPosition] = useState<[number, number]>([51.1657, 10.4515]);
    const [position, setPosition] = useState<[number, number]>([51.1657, 10.4515]);
    const [step, setStep] = useState(STEPS.LOCATION);

    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Geocoding'), {
        ssr: false
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, [])
    
    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, [])

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
            location,
            destination,
            originPosition: JSON.stringify(originPosition),
            position: JSON.stringify(position),
            guestCount,
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

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push("/flights/" + url);
    }, [step, searchModal, destination, location, router, guestCount, roomCount, dateRange, onNext, params]);

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO){
            return 'Search';
        }

        return 'Next';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.LOCATION){
            return undefined;
        }

        return 'Back';
    }, [step] )

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="From"
                subtitle="Search and select your location"
            />
            <GeocodingMap location={location} setLocation={setLocation} position={originPosition} setPosition={setOriginPosition}/>
        </div>
    )

    if (step === STEPS.DESTINATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="To"
                    subtitle="Search and select your destination"
                />
                <GeocodingMap location={destination} setLocation={setDestination} position={position} setPosition={setPosition}/>
            </div>
        )
    }

    if (step === STEPS.DATE) {
        bodyContent = (
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
    }

    if (step === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subtitle="Find your perfect place"
                />
                <Counter 
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
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
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
     );
}
 
export default SearchModal;

