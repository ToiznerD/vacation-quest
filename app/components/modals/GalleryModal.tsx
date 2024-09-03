'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import useGalleryModal from '@/app/hooks/useGalleryModal';
import { ChevronLeft ,ChevronRight, Key } from 'lucide-react'
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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                setIsLoading(false);

                if (callback?.ok) {
                    toast.success('Logged in');
                    // router.refresh();
                    galleryModal.onClose();
                }

                if (callback?.error) {
                    toast.error(callback.error);
                }
        })
    }

    const handleLeftArrow = () => {
        if(isSelected === 0) {
            setIsSelected(() => gallery.length-1);
            return;
        }
        setIsSelected((isSelected) => isSelected-1);
    }

    const handleRightArrow = () => {
        if(isSelected === gallery.length) {
            return;
        }
        setIsSelected((isSelected) => isSelected+1);
    }

    const changeImageByClick = (index: number) => {
        if (isSelected + index > gallery.length) {
            return;
        }
        setIsSelected((isSelected) => isSelected+index)
    }

    const bodyContent = (
        <div className="flex flex-col gap-16">
            <div className="flex flex-row gap-4 justify-between items-center">
                <div className="cursor-pointer">
                    <ChevronLeft size={64} onClick={handleLeftArrow} />
                </div>

                <div className="relative cursor-pointer h-[25vh] w-screen md:h-[30vh]">
                    <Image src={gallery[isSelected]} alt={`Hotel image 0`} layout="fill" objectFit="cover"/>
                </div>

                <div className="cursor-pointer">
                    <ChevronRight size={64} onClick={handleRightArrow}/>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4">
                <div key={isSelected} className="relative w-44 h-32 cursor-pointer">
                    <Image 
                        src={gallery[isSelected]}
                        alt={`Hotel image ${isSelected}`}
                        layout="fill" // Ensure the image fills the container
                        objectFit="cover" // Cover the container without distorting the image
                        className="rounded-lg"
                    />
                </div>
                <div key={isSelected+1} className="relative w-44 h-32 cursor-pointer opacity-40"
                onClick={() => changeImageByClick(1)}>
                    <Image 
                        src={gallery[isSelected+1]}
                        alt={`Hotel image ${isSelected+1}`}
                        layout="fill" // Ensure the image fills the container
                        objectFit="cover" // Cover the container without distorting the image
                        className="rounded-lg"
                    />
                </div>
                <div key={isSelected+2} className="relative w-44 h-32 cursor-pointer opacity-40"
                onClick={() => changeImageByClick(2)}>
                    <Image 
                        src={gallery[isSelected+2]}
                        alt={`Hotel image ${isSelected+2}`}
                        layout="fill" // Ensure the image fills the container
                        objectFit="cover" // Cover the container without distorting the image
                        className="rounded-lg"
                    />
                </div>
                <div key={isSelected+3} className="relative w-44 h-32 hidden md:block cursor-pointer opacity-40"
                onClick={() => changeImageByClick(3)}>
                    <Image 
                        src={gallery[isSelected+3]}
                        alt={`Hotel image ${isSelected+3}`}
                        layout="fill" // Ensure the image fills the container
                        objectFit="cover" // Cover the container without distorting the image
                        className="rounded-lg"
                    />
                </div>
                <div key={isSelected+4} className="relative w-44 h-32 hidden 2xl:block cursor-pointer opacity-40"
                onClick={() => changeImageByClick(4)}>
                    <Image 
                        src={gallery[isSelected+4]}
                        alt={`Hotel image ${isSelected+4}`}
                        layout="fill" // Ensure the image fills the container
                        objectFit="cover" // Cover the container without distorting the image
                        className="rounded-lg"
                    />
                </div>
                
            </div>
        </div>
    )

    const footerContent = (
        <div>
            raz
        </div>
        // <div className="flex flex-row justify-center gap-4">
        //     <div key={isSelected} className="relative w-44 h-32 cursor-pointer">
        //             <Image 
        //                 src={gallery[isSelected]}
        //                 alt={`Hotel image ${isSelected}`}
        //                 layout="fill" // Ensure the image fills the container
        //                 objectFit="cover" // Cover the container without distorting the image
        //                 className="rounded-lg"
        //             />
        //     </div>
        //     <div key={isSelected+1} className="relative w-44 h-32 cursor-pointer">
        //             <Image 
        //                 src={gallery[isSelected+1]}
        //                 alt={`Hotel image ${isSelected+1}`}
        //                 layout="fill" // Ensure the image fills the container
        //                 objectFit="cover" // Cover the container without distorting the image
        //                 className="rounded-lg"
        //             />
        //     </div>
        //     <div key={isSelected+2} className="relative w-44 h-32 cursor-pointer">
        //             <Image 
        //                 src={gallery[isSelected+2]}
        //                 alt={`Hotel image ${isSelected+2}`}
        //                 layout="fill" // Ensure the image fills the container
        //                 objectFit="cover" // Cover the container without distorting the image
        //                 className="rounded-lg"
        //             />
        //     </div>
        //     <div key={isSelected+3} className="relative w-44 h-32 hidden md:block cursor-pointer">
        //             <Image 
        //                 src={gallery[isSelected+3]}
        //                 alt={`Hotel image ${isSelected+3}`}
        //                 layout="fill" // Ensure the image fills the container
        //                 objectFit="cover" // Cover the container without distorting the image
        //                 className="rounded-lg"
        //             />
        //     </div>
        //     <div key={isSelected+4} className="relative w-44 h-32 hidden 2xl:block cursor-pointer">
        //             <Image 
        //                 src={gallery[isSelected+4]}
        //                 alt={`Hotel image ${isSelected+4}`}
        //                 layout="fill" // Ensure the image fills the container
        //                 objectFit="cover" // Cover the container without distorting the image
        //                 className="rounded-lg"
        //             />
        //     </div>
        // </div>
    )


    return ( 
        <Modal
            disabled={isLoading}
            isOpen={galleryModal.isOpen}
            title={name}
            onClose={galleryModal.onClose}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default GalleryModal;