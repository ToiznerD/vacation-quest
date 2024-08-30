'use client'

import { FaStar } from "react-icons/fa";
import { hotelInNewYork } from '@/app/lib/hotels-detail';
import Image from 'next/image';
import { MdLocationPin } from "react-icons/md";

interface Props {
    name: string;
    stars: number;
}

const HotelHead = ({name, stars}: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row font-bold text-2xl">
                {name}
                {[...Array(Number(stars))].map((_, i) => (<FaStar className="md:ml-2 ml-1 text-yellow-500"/>))}
            </div>
            <div className="flex flex-row">
                <MdLocationPin className="text-blue-500 text-2xl"/>
                <div className="text-base">
                    {hotelInNewYork.data.location.address}
                </div>
            </div>
                <div className="flex flex-col gap-2 w-[100vh]">
                    
                    <div className="flex flex-row gap-2 justify-between">

                        <div className="w-[67%] relative">
                            <Image fill src={hotelInNewYork.data.gallery.images[0].dynamic} alt={`Hotel image 0`} />
                        </div>

                        <div className="flex flex-col justify-between gap-2">
                            <div className="relative">
                                <Image width={300} height={100} src={hotelInNewYork.data.gallery.images[1].dynamic} alt={`Hotel image 0`} />
                            </div>
                            <div className="relative">
                                <Image width={300} height={100} src={hotelInNewYork.data.gallery.images[2].dynamic} alt={`Hotel image 0`} />
                            </div>
                        </div>

                    </div>
                    
                    <div className="flex flex-row justify-between gap-x-2">
                        <div className="w-1/5 relative">
                            <Image fill src={hotelInNewYork.data.gallery.images[3].dynamic} alt={`Hotel image 0`} />
                        </div>
                        <div className="w-1/5 relative">
                            <Image fill src={hotelInNewYork.data.gallery.images[4].dynamic} alt={`Hotel image 0`} />
                        </div>
                        <div className="w-1/5 relative">
                            <Image fill src={hotelInNewYork.data.gallery.images[5].dynamic} alt={`Hotel image 0`} />
                        </div>
                        <div className="w-1/5">
                            <Image width={200} height={200} src={hotelInNewYork.data.gallery.images[6].dynamic} alt={`Hotel image 0`} />
                        </div>
                        <div className="w-1/5 relative">
                            <Image fill src={hotelInNewYork.data.gallery.images[7].dynamic} alt={`Hotel image 0`} />
                        </div>
                    </div>


                    {/* <div>
                        <Image className="h-auto" width={550} height={100} src={hotelInNewYork.data.gallery.images[0].dynamic} alt={`Hotel image 0`} />
                    </div>

                    <div className="grid grid-rows-1 gap-4">
                        <Image width={240} height={100} src={hotelInNewYork.data.gallery.images[0].dynamic} alt={`Hotel image 0`} />
                        <Image width={240} height={100} src={hotelInNewYork.data.gallery.images[0].dynamic} alt={`Hotel image 0`} />
                    </div> */}

                </div>
                {/* <div>
                    {hotelInNewYork.data.gallery.images.map((image, i) => (
                        <Image key={i} width={300} height={100} src={image.dynamic} alt={`Hotel image ${i + 1}`} />
                    ))}
                </div> */}

        </div>
    );
};

export default HotelHead;