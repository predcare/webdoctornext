import { useCallback, useState } from 'react';

export function useActionMenu<TId = string>() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState<TId | null>(null);

  const open = useCallback((anchor: HTMLElement, id?: TId) => {
    setAnchorEl(anchor);
    setActiveId(id ?? null);
  }, []);

  const close = useCallback(() => setAnchorEl(null), []);

  return { anchorEl, activeId, open, close };
}
