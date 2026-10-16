'use client';

import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import BackdropLoader from './BackdropLoader';

const GlobalBackdropLoader = () => {
  const { isLoading, message } = useLoadingStore((state) => state);

  return <BackdropLoader open={isLoading} text={message} blur={2} />;
};

export default GlobalBackdropLoader;
