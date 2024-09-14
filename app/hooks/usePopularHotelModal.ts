import { create } from 'zustand';

interface useSearchProps{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    hotelId: string;
    setHotelId: (id: string) => void;
    destination: string;
    setDestination: (destination: string) => void;
}

const usePopularHotelModal = create<useSearchProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false } ),
    hotelId: '',
    setHotelId: (id: string) => set({ hotelId: id }),
    destination: '',
    setDestination: (destination: string) => set({ destination: destination }),
}))

export default usePopularHotelModal;