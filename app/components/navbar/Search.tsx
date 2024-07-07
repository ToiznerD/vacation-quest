"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";

interface Props {
    searchValues: {
        destination: string;
        when: {
            from: Date;
            to: Date;
        };
        guestCount: number;
    }
}

const Search = ({ searchValues }: Props ) => {
    const { onOpen, onClose } = useSearchModal();
    
    const vacationDate = useMemo(() => {
        if (!searchValues.when) {
            return null;
        }

        const start = new Date(searchValues.when.from);
        const end = new Date(searchValues.when.to);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [searchValues.when])

    return ( 
        <div
            onClick={onOpen}
            className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        >
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {searchValues.destination === '' ? 'Destination' : searchValues.destination}
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    {searchValues.when ? vacationDate : 'When'}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">
                        {searchValues.guestCount === 0 ? 'Add guests' : searchValues.guestCount + ' Guests'}
                    </div>
                    <div className="p-2 bg-blue-400 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
     );

    
}
 
export default Search;