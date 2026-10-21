'use client';

import { SocketEvents } from '@/configs/socket.constants';
import { getAuthToken } from '@/lib/commons/authToken';
import { baseUrl } from '@/services/api/endpoints';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { useSocketStore } from '@/zustand/stores/useSocketStore';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export default function SocketProvider() {
  const socketRef = useRef<Socket | null>(null);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userId = useAuthStore((state) => state.userData?.id);
  const setSocket = useSocketStore((state) => state.setSocket);
  const setIsConnected = useSocketStore((state) => state.setIsConnected);


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
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
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
  }, [isLoggedIn, userId, setSocket, setIsConnected]);

  return null;
}
