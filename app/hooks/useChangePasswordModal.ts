import { create } from 'zustand';

interface ChangePasswordModalStore{
    isOpen: boolean;
    name: string;
    setName: (name: string) => void;
    onOpen: () => void;
    onClose: () => void;
}

const useChangePasswordModal = create<ChangePasswordModalStore>((set) => ({
    isOpen: false,
    name: '',
    setName: (name) => set({ name }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false } ),
}))

export default useChangePasswordModal;