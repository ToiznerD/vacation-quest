"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import { DatePicker } from "@/components/ui/date-picker";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";


const SearchModal = () => {
    const searchModal = useSearchModal();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            trip: {
                from: new Date(),
                to: addDays(new Date(), 7),
            },
            guestCount: 1,
            roomCount: 1,
        }
    })

    const guests = watch('guestCount');
    const rooms = watch('roomCount');
    const trip = watch('trip');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    if (!searchModal.isOpen) {
        return null;
    }

    const body = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Let's find your next vacation!"
                subtitle="Fill in all the fields"
            />
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <div className="font-medium">
                        Trip Dates
                    </div>
                    <div className="font-light text-gray-600">
                        Departure - Return dates
                    </div>
                </div>
                <DatePicker 
                value={trip} 
                onChange={(value: DateRange) =>  setCustomValue('trip', value)}
                />
            </div>

            <Counter 
                title="Guests"
                subtitle="How many guests are coming?"
                value={guests}
                onChange={(value: number) => setCustomValue('guestCount', value)}
            />

            <Counter 
                title="Rooms"
                subtitle="How many rooms?"
                value={rooms}
                onChange={(value: number) => setCustomValue('roomCount', value)}
            />
        </div>
    )

    return (

            <Modal
                title="Search Vacation!"
                isOpen={searchModal.isOpen}
                onClose={searchModal.onClose}
                onSubmit={ () => {}}
                actionLabel="Search"
                secondaryActionLabel="Cancel"
                secondaryAction={() => {}}
                body={body}
            />
    )
}
 
export default SearchModal;