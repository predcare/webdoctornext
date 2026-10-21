'use client';

import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { useMeeting } from '@videosdk.live/react-sdk';
import { useCallback, useEffect, useState } from 'react';

export const useMeetingMedia = () => {
  const [webcams, setWebcams] = useState<
    Array<{ deviceId: string; label: string }>
  >([]);

  const {
    localMicOn,
    localWebcamOn,
    toggleMic,
    toggleWebcam,
    getWebcams,
    changeWebcam,
  } = useMeeting();

  const isMicOn = useMeetingStore((state) => state.isMicOn);
  const isCameraOn = useMeetingStore((state) => state.isCameraOn);
  const setMicState = useMeetingStore((state) => state.setMicState);
  const setCameraState = useMeetingStore((state) => state.setCameraState);
  const selectedVideoDeviceId = useMeetingStore(
    (state) => state.selectedVideoDeviceId,
  );
  const setSelectedVideoDeviceId = useMeetingStore(
    (state) => state.setSelectedVideoDeviceId,
  );

  const handleToggleMic = useCallback(() => {
    toggleMic();
    setMicState(!localMicOn);
  }, [toggleMic, localMicOn, setMicState]);

  const handleToggleCamera = useCallback(() => {
    toggleWebcam();
    setCameraState(!localWebcamOn);
  }, [toggleWebcam, localWebcamOn, setCameraState]);

  const handleSwitchCamera = useCallback(
    async (deviceId: string) => {
      try {
        await changeWebcam(deviceId);
        setSelectedVideoDeviceId(deviceId);
      } catch (err) {
        console.error('Error switching camera:', err);
      }
    },
    [changeWebcam, setSelectedVideoDeviceId],
  );

  useEffect(() => {
    let isMounted = true;
    getWebcams()
      .then((devices) => {
        if (isMounted && devices && devices.length > 0) {
          setWebcams(devices);
          if (!selectedVideoDeviceId && devices[0]?.deviceId) {
            setSelectedVideoDeviceId(devices[0].deviceId);
          }
        }
      })
      .catch((err) => console.warn('Could not enumerate webcams:', err));

    return () => {
      isMounted = false;
    };
  }, [getWebcams, selectedVideoDeviceId, setSelectedVideoDeviceId]);

  // Sync VideoSDK state to Zustand if changed externally
  useEffect(() => {
    if (localMicOn !== isMicOn) setMicState(localMicOn);
    if (localWebcamOn !== isCameraOn) setCameraState(localWebcamOn);
  }, [
    localMicOn,
    localWebcamOn,
    isMicOn,
    isCameraOn,
    setMicState,
    setCameraState,
  ]);

  return {
    isMicOn: localMicOn ?? isMicOn,
    isCameraOn: localWebcamOn ?? isCameraOn,
    webcams,
    hasMultipleCameras: webcams.length > 1,
    selectedVideoDeviceId,
    toggleMic: handleToggleMic,
    toggleCamera: handleToggleCamera,
    switchCamera: handleSwitchCamera,
  };
};
