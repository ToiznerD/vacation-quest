import Image from "next/image";
import { differenceInHours, differenceInMinutes, format } from "date-fns";
import { PlaneLanding, PlaneTakeoff } from "lucide-react";
import { differenceInHoursWithOptions } from "date-fns/fp";

interface Props {
    imageSrc: string;
    title: string;
    departure: string;
    arrival: string;
    originId: string;
    destinationId: string;
    stops?: number;
    duration?: number;
}

const FlightRow = ({ imageSrc, title, departure, arrival, originId, destinationId, stops, duration = 0}: Props) => {
    
    return ( 
        <div className="flex flex-row gap-2 justify-between items-center">
            
            <div className="flex flex-col text-center gap-1 justify-center items-center w-[10vh]">
                            <Image src={imageSrc} alt={title} width={32} height={32} />
                            <span className="text-xs font-bold break-all">{title}</span>
            </div>
            <div className="flex flex-col font-bold gap-2  my-auto text-center h-full justify-center">
                <div className="text-xs text-slate-400">
                    {format(new Date(departure), "dd/MM")}
                </div>
                <div className="font-semibold">
                    {format(new Date(departure), "HH:mm")}
                </div>
                <div className="font-semibold">
                    {originId}
                </div>
            </div>
                
            <div className="w-[50%] flex flex-row gap-4 justify-center items-center">
                    <PlaneTakeoff size={40} className="text-blue-800" />
                    <div className="w-full">
                        <div className="w-full my-auto h-[1px] border"/>
                        {stops && stops > 0 && (
                            <>
                                <div className="relative -top-1 flex justify-center items-center gap-2">
                                    {[...Array(stops)].map((_, i) => (<div key={i} className="rounded-full h-2 w-2 bg-rose-500" />))}
                                </div>
                                <div className="flex justify-center items-center text-xs font-sans">
                                    {stops} stop{stops && stops > 1 && "s"}
                                </div>
                            </>
                        )}
                        <div className="flex justify-center items-center text-xs font-sans">
                            {Math.floor(duration/60) + "h " + duration%60 + "m"}
                        </div>
                    </div>
                    <PlaneLanding size={40} className="text-blue-800" />
            </div>

            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex flex-col font-bold gap-2 text-center my-auto h-full justify-center">
                    <div className="text-slate-400 text-xs">
                        {format(new Date(arrival), "dd/MM")}
                    </div>
                    <div className="font-semibold">
                        {format(new Date(arrival), "HH:mm")}
                    </div>
                    <div className="font-semibold">
                        {destinationId}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default FlightRow;