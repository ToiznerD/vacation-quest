import { create } from 'zustand';

interface useSearchProps{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    
}

const useSearchModal = create<useSearchProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false } ),
}))

export default useSearchModal;