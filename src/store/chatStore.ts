import { create } from 'zustand';

interface ChatState {
  peerCon: any;
  setPeerCon: (id: string) => void;
}

export const useChatStore = create<ChatState>()((set) => ({ peerCon: {}, setPeerCon: (peer) => set((state) => ({ ...state, peerCon: peer })) }));
