'use client';

import { useRouter } from 'next/navigation';
import { Suspense, useCallback } from 'react';

import { queryClient } from '@/components/Providers/ReactQueryProvider';
import useEventEmitter from '@/hooks/commons/useEventEmitter';
import useAuthProfile from '@/hooks/react-query/common/useAuthProfile';
import {
    showErrorToast,
    showInfoToast,
    showSuccessToast,
    showWarningToast,
} from '@/lib/commons/toast';
import events from '@/lib/services/events/events';
import { projectRoutes } from '@/routes';
import { setIntentionalLogoutMode } from '@/services/api/apiClient';
import { useAuthStore } from '@/zustand/stores/useAuthStore';

interface EventListenerProps {
    onLogout?: () => void;
}

function AuthProfileListener() {
    useAuthProfile();
    return null;
}

export default function EventListener({
    onLogout,
}: EventListenerProps) {
    const router = useRouter();
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
            queryClient.clear();
            await logout();

            router.replace(projectRoutes.home);

            setTimeout(() => {
                setIntentionalLogoutMode(false);
            }, 1000);
        },
        [onLogout, logout, router],
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

    return (
        <Suspense fallback={null}>
            <AuthProfileListener />
        </Suspense>
    );
}