import { FlightDetails } from "@/app/types";
import FlightRow from "../FlightRow";
import { cn } from "@/app/libs/utils";

interface Props {
    itinerary?: FlightDetails;
    className?: string;
}
const FlightDetail = ({ itinerary, className }: Props) => {
    return ( 
        <div className={className}>

            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-4 border rounded-lg p-4 w-full">
                    <span className="text-blue-900 font-bold text-lg">Outbound:</span>
                    {
                        itinerary?.legs[0].segments.map((segment, index) => (
                            <FlightRow
                                key={index}
                                imageSrc={segment.operatingCarrier.logo}
                                title={segment.operatingCarrier.name}
                                departure={segment.departure}
                                arrival={segment.arrival}
                                originId={segment.origin.displayCode}
                                destinationId={segment.destination.displayCode}
                                duration={segment.duration}
                            />
                        ))
                    }
                </div>

                <div className="flex flex-col gap-4 border rounded-lg p-4">
                    <span className="text-blue-900 font-bold text-lg">Return:</span>
                    {
                        itinerary?.legs[1].segments.map((segment, index) => (
                            <FlightRow
                                key={index}
                                imageSrc={segment.operatingCarrier.logo}
                                title={segment.operatingCarrier.name}
                                departure={segment.departure}
                                arrival={segment.arrival}
                                originId={segment.origin.displayCode}
                                destinationId={segment.destination.displayCode}
                                duration={segment.duration}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
     );
}
 
export default FlightDetail;