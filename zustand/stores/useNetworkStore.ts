import { create } from 'zustand';

export type TConnectionType =
  'wifi' | 'cellular' | 'ethernet' | 'unknown' | 'none' | 'other';

export interface INetworkSnapshot {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  connectionType: TConnectionType;
}

interface INetworkStoreState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  connectionType: TConnectionType;
  isOffline: boolean;
  wasOffline: boolean;
  lastChangedAt: number | null;
  setNetworkState: (state: INetworkSnapshot) => void;
  dismissWasOffline: () => void;
}

export const useNetworkStore = create<INetworkStoreState>((set, get) => ({
  isConnected: true,
  isInternetReachable: true,
  connectionType: 'unknown',
  isOffline: false,
  wasOffline: false,
  lastChangedAt: null,

  setNetworkState: (state) => {
    const isOffline =
      state.isConnected === false || state.isInternetReachable === false;
    const currentOffline = get().isOffline;
    const cameBackOnline = currentOffline && !isOffline;

    set({
      isConnected: state.isConnected,
      isInternetReachable: state.isInternetReachable,
      connectionType: state.connectionType,
      isOffline,
      wasOffline: cameBackOnline ? true : get().wasOffline,
      lastChangedAt: Date.now(),
    });
  },

  dismissWasOffline: () => {
    set({ wasOffline: false });
  },
}));
