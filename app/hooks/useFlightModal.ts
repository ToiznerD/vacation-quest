import { create } from 'zustand';

interface useFlightProps{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    id: string;
    token: string;
    setId: (id: string) => void;
    setToken: (token: string) => void;
}

const useFlightModal = create<useFlightProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false } ),
    id: '',
    token: '',
    setId: (id: string) => set({ id }),
    setToken: (token: string) => set({ token }),
}))

export default useFlightModal;