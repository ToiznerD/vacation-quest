import { searchNewYork } from "../lib/hotelsSearch";
import HotelCard from "@/app/components/hotels/HotelCard";
const HotelsListPage = () => {
    
    return ( 
        <div className="pt-24">
            <div className="flex flex-col gap-2 justify-center items-center">
                {
                    searchNewYork.data.hotels.map((hotelCard, index) => (
                        <HotelCard key={index} hotelCard={hotelCard} />
                    ))
                }
            </div>
        </div>
     );
}
 
export default HotelsListPage;