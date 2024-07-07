"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";

const Search = () => {
    const { onOpen, onClose } = useSearchModal();
    return ( 
        <div
            onClick={onOpen}
            className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        >
            <div className="flex flex-row items-center justify-between">
                <div className="px-8">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400">Destination</span>
                        <span className="text-sm font-semibold">Where to?</span>
                    </div>
                </div>
                <div className="hidden sm:block px-8 border-x-[1px] flex-1 text-center">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400">Check-in</span>
                        <span className="text-sm font-semibold">Departure</span>
                    </div>
                </div>
                <div className="hidden sm:block px-6 border-x-[1px] flex-1 text-center">
                    <div className="flex flex-col">
                            <span className="text-xs text-slate-400">Check-out</span>
                            <span className="text-sm font-semibold">Arrival</span>
                    </div>
                </div>
                <div className="pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400">Guests and rooms</span>
                            <span className="text-sm font-semibold">2 Guests, 1 Room</span>
                        </div>
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