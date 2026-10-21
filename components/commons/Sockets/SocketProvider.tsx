'use client';

import { SocketEvents } from '@/configs/socket.constants';
import { getAuthToken } from '@/lib/commons/authToken';
import { baseUrl } from '@/services/api/endpoints';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { useSocketStore } from '@/zustand/stores/useSocketStore';
import React, { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import CallSocketListeners from './CallSocketListeners';

type SocketProviderProps = {
  children?: React.ReactNode;
};

export default function SocketProvider({ children }: SocketProviderProps) {
  // 1. States & Refs
  const socketRef = useRef<Socket | null>(null);

  // 2. Hooks
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setSocket = useSocketStore((state) => state.setSocket);
  const setIsConnected = useSocketStore((state) => state.setIsConnected);

  // 3. useMemo & Functions
  // (none needed beyond effect cleanup)

  // 4. useEffects
  useEffect(() => {
    if (!isLoggedIn) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    const token = getAuthToken();
    if (!token) return;

    const socketInstance = io(baseUrl, {
      auth: { token },
      query: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    socketInstance.on(SocketEvents.CONNECT, () => {
      setIsConnected(true);
    });

    socketInstance.on(SocketEvents.DISCONNECT, () => {
      setIsConnected(false);
    });

    socketInstance.on(SocketEvents.CONNECT_ERROR, () => {
      setIsConnected(false);
    });

    return () => {
      socketInstance.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
    };
  }, [isLoggedIn, setSocket, setIsConnected]);

  return (
    <>
      <CallSocketListeners />
      {children}
    </>
  );
}
