'use client';

import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Modal from './Modal';
import useGalleryModal from '@/app/hooks/useGalleryModal';
import { ChevronLeft ,ChevronRight } from 'lucide-react'
import Image from 'next/image';

const GalleryModal = () => {
    const galleryModal = useGalleryModal();
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(0);

    const {
        name,
        gallery
    } = galleryModal;

    const {
        register,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const handleLeftArrow = () => {
        if(isSelected === 0) {
            setIsSelected(() => gallery.length-1);
            return;
        }
        setIsSelected((isSelected) => isSelected-1);
    }

    const handleRightArrow = () => {
        if(isSelected === gallery.length) {
            setIsSelected(() => 1);
            return;
        }
        setIsSelected((isSelected) => isSelected+1);
    }

    const changeImageByClick = (index: number) => {
        if (isSelected + index > gallery.length) {
            setIsSelected(() => index+1)
            return;
        }
        setIsSelected((isSelected) => isSelected+index)
    }

    const handleOnClose = () => {
        galleryModal.onClose();
        setIsSelected(0);
    }
    
    const bodyContent = (
        <div className="flex flex-col gap-16">
            <div className="flex flex-row gap-4 justify-between items-center">
                <div className="cursor-pointer">
                    <ChevronLeft size={64} onClick={handleLeftArrow} />
                </div>

                <div className="relative cursor-pointer h-[25vh] w-screen md:h-[30vh]">
                    <Image src={isSelected < gallery.length ? gallery[isSelected] : gallery[isSelected-gallery.length]} alt={`Hotel image 0`} layout="fill" objectFit="cover"/>
                </div>

                <div className="cursor-pointer">
                    <ChevronRight size={64} onClick={handleRightArrow}/>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4">
                <div key={isSelected} className="relative w-44 h-32 cursor-pointer">
                    <Image 
                        src={isSelected < gallery.length ? gallery[isSelected] : gallery[gallery.length-isSelected]}
                        alt={`Hotel image ${isSelected}`}
                        layout="fill" // Ensure the image fills the container
                        objectFit="cover" // Cover the container without distorting the image
                        className="rounded-lg"
                    />
                </div>
                <div key={isSelected+1} className="relative w-44 h-32 cursor-pointer opacity-40"
                onClick={() => changeImageByClick(1)}>
                    <Image 
                        src={isSelected+1 < gallery.length ? gallery[isSelected+1] : gallery[isSelected+1-gallery.length]}
                        alt={`Hotel image ${isSelected+1}`}
                        layout="fill" // Ensure the image fills the container
                        objectFit="cover" // Cover the container without distorting the image
                        className="rounded-lg"
                    />
                </div>
                <div key={isSelected+2} className="relative w-44 h-32 cursor-pointer opacity-40"
                onClick={() => changeImageByClick(2)}>
                    <Image 
                        src={isSelected+2 < gallery.length ? gallery[isSelected+2] : gallery[isSelected+2-gallery.length]}
                        alt={`Hotel image ${isSelected+2}`}
                        layout="fill" // Ensure the image fills the container
                        objectFit="cover" // Cover the container without distorting the image
                        className="rounded-lg"
                    />
                </div>
                <div key={isSelected+3} className="relative w-44 h-32 hidden md:block cursor-pointer opacity-40"
                onClick={() => changeImageByClick(3)}>
                    <Image 
                        src={isSelected+3 < gallery.length ? gallery[isSelected+3] : gallery[isSelected+3-gallery.length]}
                        alt={`Hotel image ${isSelected+3}`}
                        layout="fill" // Ensure the image fills the container
                        objectFit="cover" // Cover the container without distorting the image
                        className="rounded-lg"
                    />
                </div>
                <div key={isSelected+4} className="relative w-44 h-32 hidden 2xl:block cursor-pointer opacity-40"
                onClick={() => changeImageByClick(4)}>
                    <Image 
                        src={isSelected+4 < gallery.length ? gallery[isSelected+4] : gallery[isSelected+4-gallery.length]}
                        alt={`Hotel image ${isSelected+4}`}
                        layout="fill" // Ensure the image fills the container
                        objectFit="cover" // Cover the container without distorting the image
                        className="rounded-lg"
                    />
                </div>
                
            </div>
        </div>
    )

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={galleryModal.isOpen}
            title={name}
            onClose={handleOnClose}
            body={bodyContent}
        />
     );
}
 
export default GalleryModal;