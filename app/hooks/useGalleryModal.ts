import { create } from 'zustand';

interface GalleryModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    name: string;
    setName: (name : string) => void;
    gallery: string[];
    setGallery: (gallery: string[]) => void;

}

const useGalleryModal = create<GalleryModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false } ),
    name: "",
    setName: (name : string) => set({ name: name }),
    gallery: [],
    setGallery: (gallery: string[]) => set({ gallery: gallery})
}))

export default useGalleryModal;