"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import { DatePicker } from "@/components/ui/date-picker";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

interface Props {
    searchValues: {
        destination: string;
        when: string;
        guestCount: number;
    },
    setSearchValues: (searchValues: any) => void
}

const SearchModal = ({searchValues, setSearchValues}: Props) => {
    const searchModal = useSearchModal();
    const router = useRouter();

    const handleConfirm: SubmitHandler<FieldValues> = (data) => {
        // Update the search values in the Search component
        setSearchValues(data);
    
        searchModal.onClose();
      };

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
            destination: '',
            when: {
                from: new Date(),
                to: addDays(new Date(), 7),
            },
            guestCount: 1,
            roomCount: 1,
        }
    })

    const guests = watch('guestCount');
    const rooms = watch('roomCount');
    const trip = watch('when');
    const destination = watch('destination');

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
                <div className="font-medium">
                    What is your destination?
                </div>
                <div className="w-[40vh]">
                    <input type="text" placeholder="Destination" className="w-full h-10 border border-slate-300 rounded-lg px-4 text-sm" {...register('destination', { required: true })} />
                </div>
                
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <div className="font-medium">
                        Trip Dates
                    </div>
                    <div className="font-light text-sm text-gray-600">
                        Departure - Return dates
                    </div>
                </div>
                <DatePicker 
                className="w-[40vh]"
                value={trip} 
                onChange={(value: DateRange) =>  setCustomValue('when', value)}
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
                onSubmit={handleSubmit(handleConfirm)}
                actionLabel="Update"
                body={body}
            />
    )
}
 
export default SearchModal;