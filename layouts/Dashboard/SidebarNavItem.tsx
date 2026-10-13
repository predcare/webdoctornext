'use client';

import { ChevronIcon, SubmenuIcon } from '@/components/ui/Icons/dashboard';
import type { SideNavItem } from '@/configs/navItems';
import { Tooltip } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';

type SidebarNavItemProps = {
  item: SideNavItem;
  icon: ReactNode;
  currentPath: string;
  collapsed: boolean;
  onNavigate?: () => void;
};

const pathsMatch = (href: string | undefined, currentPath: string) =>
  Boolean(href) && currentPath === href;

const SidebarNavItem = ({
  item,
  icon,
  currentPath,
  collapsed,
  onNavigate,
}: SidebarNavItemProps) => {
  const children = item.children ?? [];
  const hasChildren = children.length > 0;
  const [open, setOpen] = useState(false);
  const parentActive =
    pathsMatch(item.href, currentPath) ||
    children.some((child) => pathsMatch(child.href, currentPath));

  useEffect(() => {
    if (collapsed) {
      setOpen(false);
    }
  }, [collapsed]);

  const isOpen = hasChildren && open && !collapsed;
  const className = [
    'nav-item',
    parentActive ? 'active' : '',
    isOpen ? 'open' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const content = (
    <>
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{item.name}</span>
      {hasChildren ? (
        <span className="nav-chevron">
          <ChevronIcon direction={isOpen ? 'down' : 'right'} />
        </span>
      ) : null}
    </>
  );

  const toggleSubmenu = () => {
    if (hasChildren && !collapsed) {
      setOpen((value) => !value);
    }
  };

  const control =
    item.href && !hasChildren ? (
      <Link
        href={item.href}
        className={className}
        aria-current={parentActive ? 'page' : undefined}
        onClick={onNavigate}
      >
        {content}
      </Link>
    ) : (
      <button
        type="button"
        className={className}
        aria-expanded={hasChildren ? isOpen : undefined}
        onClick={toggleSubmenu}
      >
        {content}
      </button>
    );

  return (
    <div className="nav-group">
      <Tooltip title={collapsed ? item.name : ''} placement="right" arrow>
        {control}
      </Tooltip>
      {isOpen ? (
        <div className="submenu">
          {children.map((child) => {
            const childActive = pathsMatch(child.href, currentPath);
            const childClass = childActive
              ? 'submenu-item active'
              : 'submenu-item';
            const childContent = (
              <>
                <span className="submenu-icon">
                  <SubmenuIcon />
                </span>
                <span className="submenu-label">{child.name}</span>
              </>
            );

            if (child.href) {
              return (
                <Link
                  key={child.id}
                  href={child.href}
                  className={childClass}
                  aria-current={childActive ? 'page' : undefined}
                  onClick={onNavigate}
                >
                  {childContent}
                </Link>
              );
            }

            return (
              <button key={child.id} type="button" className={childClass}>
                {childContent}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default SidebarNavItem;
