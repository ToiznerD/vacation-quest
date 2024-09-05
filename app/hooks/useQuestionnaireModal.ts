import { create } from 'zustand';

interface Store {
    isOpen: boolean;
    dismissed: boolean; // New state to track if the user dismissed the modal
    onOpen: () => void;
    onClose: () => void;
    onDismiss: () => void; // Function to handle dismiss
    setData: (data: any) => void;
    data: any;
}

const useQuestionnaireModal = create<Store>((set) => ({
    isOpen: false,
    dismissed: false, // Initial dismissed state is false
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onDismiss: () => set({ isOpen: false, dismissed: true }), // Dismisses and prevents reopening
    setData: (data: any) => set({ data: data }),
    data: {}
}));

export default useQuestionnaireModal;
