import { useCallback, useState } from 'react';

export function useActionMenu<TId = string, TStatus = string>() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState<TId | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<TStatus | null>(null);

  const open = useCallback(
    (anchor: HTMLElement, id?: TId, status?: TStatus, type?: string) => {
      setAnchorEl(anchor);
      setActiveId(id ?? null);
      setActiveStatus(status ?? null);
      setActiveType(type ?? null);
    },
    [],
  );

  const close = useCallback(() => setAnchorEl(null), []);

  return { anchorEl, activeId, activeStatus, activeType, open, close };
}
