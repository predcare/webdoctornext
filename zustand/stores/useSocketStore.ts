import { Socket } from 'socket.io-client';
import { create } from 'zustand';

interface ISocketStoreState {
  socket: Socket | null;
  isConnected: boolean;
  setSocket: (socket: Socket | null) => void;
  setIsConnected: (connected: boolean) => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<ISocketStoreState>((set, get) => ({
  socket: null,
  isConnected: false,

  setSocket: (socket) => set({ socket }),

  setIsConnected: (isConnected) => set({ isConnected }),

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
    }
    set({ socket: null, isConnected: false });
  },
}));
