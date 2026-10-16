"use client";

import { queryClient } from '@/components/Providers/ReactQueryProvider';
import {
    showErrorToast,
    showInfoToast,
    showSuccessToast,
    showWarningToast,
} from '@/lib/commons/toast';
import { projectRoutes } from '@/routes';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import useEventEmitter from '../../../hooks/commons/useEventEmitter';
import useAuthProfile from '../../../hooks/react-query/common/useAuthProfile';
import events from '../../../lib/services/events/events';
import { setIntentionalLogoutMode } from '../../../services/api/apiClient';
import { useAuthStore } from '../../../zustand/stores/useAuthStore';

interface EventListenerProps {
    onLogout?: () => void;
}

export default function EventListener({ onLogout }: EventListenerProps) {
    const router = useRouter();
    useAuthProfile();
    const { logout } = useAuthStore((state) => state);
    const handleLogout = useCallback(
        async (data?: { intentional?: boolean }) => {
            if (data?.intentional) {
                setIntentionalLogoutMode(true);
                showSuccessToast('Logged out successfully');
            } else {
                showWarningToast('Please login again.', {
                    description: 'Session Expired',
                });
            }
            onLogout?.();
            await queryClient.cancelQueries();
            await queryClient.clear();
            await logout();
            router.replace(projectRoutes.home);
            setTimeout(() => {
                setIntentionalLogoutMode(false);
            }, 1000);
        },
        [onLogout, logout],
    );

    const showNotifications = useCallback(
        (data: { message: string; options: { variant: string } }) => {
            const variant = data?.options?.variant;
            if (variant === 'error' || variant === 'warning') {
                showErrorToast(data.message || '');
            } else if (variant === 'success') {
                showSuccessToast(data.message);
            } else {
                showInfoToast(data.message);
            }
        },
        [],
    );

    useEventEmitter(events.showToast, showNotifications);
    useEventEmitter(events.logoutCurrentUser, handleLogout);

    return null;
}
