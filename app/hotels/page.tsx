import { hotelsInNewYork } from "../lib/hotels-search";
import HotelCard from "@/app/components/hotels/HotelCard";
const HotelsListPage = () => {
    
    return ( 
        <div className="pt-24">
            <div className="flex flex-col gap-2 justify-center items-center">
                {
                    hotelsInNewYork.data.results.hotelCards.map((hotelCard, index) => (
                        <HotelCard key={index} hotelCard={hotelCard} />
                    ))
                }
            </div>
        </div>
     );
}
 
export default HotelsListPage;