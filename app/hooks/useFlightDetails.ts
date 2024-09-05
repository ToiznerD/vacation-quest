import { create } from 'zustand';


interface useFlightProps{
    token: string;
    entityId: string;
    setData: (token: string, entityId: string) => void
}

const useFlightDetails = create<useFlightProps>((set) => ({
    token: '',
    entityId: '',
    setData: (token: string, entityId: string) => set({ token: token, entityId: entityId }),
}))

export default useFlightDetails;