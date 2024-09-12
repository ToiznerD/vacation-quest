import { create } from 'zustand';

interface useSearchProps{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    entityId: string;
    setEntityId: (id: string) => void;
}

const usePopularHotelModal = create<useSearchProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false } ),
    entityId: '',
    setEntityId: (id: string) => set({ entityId: id })
}))

export default usePopularHotelModal;