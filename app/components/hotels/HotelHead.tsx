'use client'

import { FaStar } from "react-icons/fa";
import { hotelInNewYork } from '@/app/lib/hotels-detail';
import Image from 'next/image';
import { MdLocationPin } from "react-icons/md";
import { useState } from "react";

interface Props {
    name: string;
    stars: number;
}

const HotelHead = ({name, stars}: Props) => {
    const [isOpen, setIsOpen] = useState(false);

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

                        <div className="w-[67%] relative cursor-pointer">
                            <Image fill src={hotelInNewYork.data.gallery.images[0].dynamic} alt={`Hotel image 0`} />
                        </div>

                        <div className="flex flex-col justify-between gap-2">
                            <div className="relative cursor-pointer">
                                <Image width={300} height={100} src={hotelInNewYork.data.gallery.images[1].dynamic} alt={`Hotel image 0`} />
                            </div>
                            <div className="relative cursor-pointer">
                                <Image width={300} height={100} src={hotelInNewYork.data.gallery.images[2].dynamic} alt={`Hotel image 0`} />
                            </div>
                        </div>

                    </div>
                    
                    <div className="flex flex-row justify-between gap-x-2">
                        
                        <div className="w-1/5 relative inline-block bg-black cursor-pointer">
                            <Image fill src={hotelInNewYork.data.gallery.images[3].dynamic} alt="{`Hotel image 0`}"/>
                        </div>
                        <div className="w-1/5 relative cursor-pointer">
                            <Image fill src={hotelInNewYork.data.gallery.images[4].dynamic} alt={`Hotel image 0`} />
                        </div>
                        <div className="w-1/5 relative cursor-pointer">
                            <Image fill src={hotelInNewYork.data.gallery.images[5].dynamic} alt={`Hotel image 0`} />
                        </div>
                        <div className="w-1/5 cursor-pointer">
                            <Image width={200} height={200} src={hotelInNewYork.data.gallery.images[6].dynamic} alt={`Hotel image 0`} />
                        </div>
                        <div className="w-1/5 relative inline-block bg-black cursor-pointer">
                            <Image fill src={hotelInNewYork.data.gallery.images[7].dynamic} alt={`Hotel image 0`} className="object-cover relative z-10 opacity-60"/>
                            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold z-20"
                                onClick={() => {setIsOpen(!isOpen)}}>
                                +{hotelInNewYork.data.gallery.images.length - 9} Photos
                            </div>
                        </div>
                    </div>
                    {isOpen && 
                    <div className="flex justify-center items-center">
                    <div className="grid grid-cols-4 h-auto gap-2">
                      {hotelInNewYork.data.gallery.images.slice(8,hotelInNewYork.data.gallery.images.length).map((image, i) => (
                        <div key={i} className="relative w-[200px] h-[150px] bg-black">
                          <Image
                            src={image.dynamic}
                            alt={`Hotel image ${i}`}
                            layout="fill" // Ensure the image fills the container
                            objectFit="cover" // Cover the container without distorting the image
                            className="rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                    }
                </div>
        </div>
    );
};

export default HotelHead;