import FlightCard from "./FlightCard";
import { roundedtrip_tlv_bkk } from "../lib/flight-roundtrip";
const FlightListPage = () => {
    
    return ( 
        <div className="pt-24">
            <div className="flex flex-col gap-2 justify-center items-center">
                {
                    roundedtrip_tlv_bkk.data.itineraries.map((itinerary, index) => (
                        <FlightCard key={index} itinerary={itinerary} />
                    ))
                }
            </div>
        </div>
     );
}
 
export default FlightListPage;