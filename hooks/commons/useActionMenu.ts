import { useCallback, useState } from 'react';

export function useActionMenu<TId = string, TStatus = string>() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState<TId | null>(null);
  const [activeStatus, setActiveStatus] = useState<TStatus | null>(null);

  const open = useCallback(
    (anchor: HTMLElement, id?: TId, status?: TStatus) => {
      setAnchorEl(anchor);
      setActiveId(id ?? null);
      setActiveStatus(status ?? null);
    },
    [],
  );

  const close = useCallback(() => setAnchorEl(null), []);

  return { anchorEl, activeId, activeStatus, open, close };
}
