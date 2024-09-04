'use client'

import { FaStar } from "react-icons/fa";
import { hotelInTelAviv } from '@/app/lib/hotelsDetails';
import Image from 'next/image';
import { MdLocationPin } from "react-icons/md";
import useGalleryModal from "@/app/hooks/useGalleryModal";
import dynamic from "next/dynamic";
import { Wifi, CircleParking, AirVent, Bus, Utensils, CigaretteOff,
    HandCoins, FastForward, Luggage, Phone, ArrowUpDown, Paperclip, 
    Martini, Coffee, Scissors ,Bike, TreePine, WashingMachine, Store,
    Cigarette, RockingChair, Printer, CopyCheck, Antenna, TvMinimal,
    Cross, Globe, Check
 } from 'lucide-react';

interface Props {
    name: string;
    stars: number;
}

const HotelHead = ({name, stars}: Props) => {
    const galleryModal = useGalleryModal();

    const {
        onOpen,
        setName,
        setGallery
    } = galleryModal;

    const handleClick = () => {
        setName(name);
        const galleryImages = hotelInTelAviv.data.gallery.images.map(image => image.dynamic);
        setGallery(galleryImages);
        onOpen();
    }

    const Map = dynamic(() => import('../Map'), {
        ssr: false
    });

    const coordinates = hotelInTelAviv.data.location.coordinates;
    const latlng: number[] = [coordinates.latitude, coordinates.longitude];

    const iconMap: Record<string, React.ComponentType> = {
        WifiService: Wifi,
        Parking: CircleParking,
        AirConditioning: AirVent,
        AirportShuttleService: Bus,
        Restaurant: Utensils,
        NonSmokingService: CigaretteOff,
        ATM: HandCoins,
        CashMachine: HandCoins,
        ExpressCheckinService: FastForward,
        ExpressCheckoutService: FastForward,
        // Hairdressers: ,
        LuggageStorage: Luggage,
        RoomService: Phone,
        AccessibleParking: CircleParking,
        // HandrailsInStairways: ,
        Lift: ArrowUpDown,
        Desk: Paperclip,
        // HairDryer
        Bar: Martini,
        Cafe: Coffee,
        CoffeeMaker: Coffee,
        // Teahouse: ,
        BeautySalon: Scissors,
        BicycleRentalService: Bike,
        // MassageService: ,
        // Nightclub: ,
        //Chapel: ,
        Garden: TreePine,
        Laundry: WashingMachine,
        Shop: Store,
        SmokingArea: Cigarette,
        ChildrenFacility: RockingChair,
        Fax: Printer,
        Photocopier: CopyCheck,
        SatelliteTV: Antenna,
        Television: TvMinimal,
        FirstAidRoom: Cross,
        InternetAccessService: Globe,
        // WiFiInDesignatedAreas: ,
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Headline */}
            <div className="flex flex-row font-bold text-2xl md:text-4xl">
                {name}
                {[...Array(Number(stars))].map((_, i) => (<FaStar className="md:ml-2 ml-1 text-yellow-500"/>))}
            </div>
            <div className="flex flex-row">
                <MdLocationPin className="text-blue-500 text-2xl md:text-4xl"/>
                <div className="flex items-center text-base md:text-xl">
                    {hotelInTelAviv.data.location.address}
                </div>
            </div>
            
                {/* md:Gallery */}
                <div className="flex-col gap-4 w-[80vh] hidden md:block">
                    
                    {/* 3 photos */}
                    <div className="flex flex-row gap-4 justify-between">

                        <div className="relative cursor-pointer w-[70vh]">
                            <Image src={hotelInTelAviv.data.gallery.images[0].dynamic} alt={`Hotel image 0`} layout="fill" objectFit="cover"/>
                        </div>

                        <div className="flex flex-col justify-between gap-4 w-[30vh]">
                            <div className="relative cursor-pointer">
                                <Image width={300} height={100} src={hotelInTelAviv.data.gallery.images[1].dynamic} alt={`Hotel image 0`} className="w-full h-auto" />
                            </div>
                            <div className="relative cursor-pointer">
                                <Image width={300} height={100} src={hotelInTelAviv.data.gallery.images[2].dynamic} alt={`Hotel image 0`} className="w-full h-auto" />
                            </div>
                        </div>

                    </div>
                    
                    {/* 5 photos */}
                    <div className="flex flex-row justify-between gap-x-4 mt-4">
                        
                        <div className="w-1/5 relative inline-block cursor-pointer">
                            <Image src={hotelInTelAviv.data.gallery.images[3].dynamic} alt="{`Hotel image 0`}" layout="fill" objectFit="cover"/>
                        </div>
                        <div className="w-1/5 relative cursor-pointer">
                            <Image src={hotelInTelAviv.data.gallery.images[4].dynamic} alt={`Hotel image 0`} layout="fill" objectFit="cover" />
                        </div>
                        <div className="w-1/5 relative cursor-pointer">
                            <Image src={hotelInTelAviv.data.gallery.images[5].dynamic} alt={`Hotel image 0`} layout="fill" objectFit="cover" />
                        </div>
                        <div className="w-1/5 relative cursor-pointer">
                            <Image width={300} height={200} src={hotelInTelAviv.data.gallery.images[6].dynamic} alt={`Hotel image 0`}/>
                        </div>
                        <div className="w-1/5 relative inline-block bg-black cursor-pointer" onClick={handleClick}>
                            <Image fill src={hotelInTelAviv.data.gallery.images[7].dynamic} alt={`Hotel image 0`} className="object-cover relative z-10 opacity-60"/>
                            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold z-20">
                                +{hotelInTelAviv.data.gallery.images.length - 9} Photos
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* sm:Gallery */}
                <div className="block md:hidden flex-col w-[40vh]">
                    {/* 2 photos */}
                    <div className="flex flex-row justify-between items-center gap-2">
                        <div className="relative cursor-pointer w-[50vh] h-56">
                            <Image src={hotelInTelAviv.data.gallery.images[0].dynamic} alt={`Hotel image 0`} layout="fill" objectFit="cover"/>
                        </div>
                        <div className="relative cursor-pointer w-[50vh] h-56">
                            <Image src={hotelInTelAviv.data.gallery.images[1].dynamic} alt={`Hotel image 0`} layout="fill" objectFit="cover"/>
                        </div>
                    </div>
                    {/* 3 photos */}
                    <div className="flex flex-row justify-between gap-2 mt-2">
                        <div className="w-1/3 relative cursor-pointer h-40">
                            <Image src={hotelInTelAviv.data.gallery.images[2].dynamic} alt="{`Hotel image 0`}" layout="fill" objectFit="cover"/>
                        </div>
                        <div className="w-1/3 relative cursor-pointer h-40">
                            <Image src={hotelInTelAviv.data.gallery.images[3].dynamic} alt="{`Hotel image 0`}" layout="fill" objectFit="cover"/>
                        </div>
                        <div className="w-1/3 relative inline-block bg-black cursor-pointer h-40" onClick={galleryModal.onOpen}>
                            <Image src={hotelInTelAviv.data.gallery.images[4].dynamic} alt="{`Hotel image 0`}" layout="fill" objectFit="cover"
                            className="object-cover relative z-10 opacity-60"/>
                            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold z-20">
                                +{hotelInTelAviv.data.gallery.images.length - 5} Photos
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Map */}
                <Map center={latlng}/>

                {/* Amenities */}
                <div className="flex flex-col gap-4">
                    <div>
                        Amenities for guests
                    </div>
                    
                    {/* Squares */}
                    {hotelInTelAviv.data.amenities.contentV2.map((amenity) => (
                        amenity.id === "PopularAndEssential" && (
                            <div key={amenity.id} className="flex flex-row text-base w-[80vh] gap-4">
                                {amenity.items.slice(0,6).map((item) => {
                                    const IconComponent = item.id ? iconMap[item.id] : null;
                                    return IconComponent ? (
                                    <div key={item.id} className="flex flex-col justify-center items-center md:w-[9vh] md:h-[9vh] bg-slate-100 gap-4 rounded-lg">
                                        <div>
                                            <IconComponent />
                                        </div>
                                        <div>
                                            {item.description}
                                        </div>
                                    </div>
                                ) : null})}
                            </div>
                        )
                    ))}
                    
                    {/* Lines */}
                    <div className="flex flex-col justify-center md:w-[80vh]">
                        {hotelInTelAviv.data.amenities.contentV2.map((amenity, index, arr) => (
                            amenity.id !== "PopularAndEssential" && (
                                <div
                                    key={amenity.id}
                                    className={`flex flex-row justify-between items-center md:w-[80vh] h-auto p-4 ${index !== arr.length - 1 ? 'border-b-[1px]' : ''}`}>
                                    <div className="text-2xl w-[50%]">
                                        {amenity.category}
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-base w-[65%] justify-center">
                                        {amenity.items.map((item) => {
                                            const IconComponent = iconMap[item.id] || Check;
                                            return (
                                                <div key={item.id} className="flex flex-row justify-start gap-2">
                                                    <div>
                                                        <IconComponent />
                                                    </div>
                                                    <div>
                                                        {item.description}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>


                </div>
        </div>
    );
};

export default HotelHead;