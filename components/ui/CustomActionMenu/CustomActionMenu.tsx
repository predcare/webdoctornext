'use client';

import {
  CustomActionMenuStyled,
  CustomActionMenuTriggerButton,
} from '@/styles/CustomStyled/CustomActionMenuWrapper';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, MenuItem, type PopoverOrigin } from '@mui/material';
import Link from 'next/link';
import { memo, type MouseEvent, type ReactNode } from 'react';

export type TActionMenuItem = {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  tone?: 'default' | 'danger' | 'warning';
  disabled?: boolean;
  hidden?: boolean;
  showChevron?: boolean;
  dividerBefore?: boolean;
};

type CustomActionMenuProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  items: TActionMenuItem[];
  placement?: 'bottom-right' | 'bottom-left';
};

const placementOrigins: Record<
  NonNullable<CustomActionMenuProps['placement']>,
  { anchorOrigin: PopoverOrigin; transformOrigin: PopoverOrigin }
> = {
  'bottom-right': {
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    transformOrigin: { vertical: 'top', horizontal: 'right' },
  },
  'bottom-left': {
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    transformOrigin: { vertical: 'top', horizontal: 'left' },
  },
};

function CustomActionMenu({
  anchorEl,
  onClose,
  items,
  placement = 'bottom-right',
}: CustomActionMenuProps) {
  const visibleItems = items.filter((item) => !item.hidden);

  const renderContent = (item: TActionMenuItem) => (
    <>
      {item.icon ? (
        <Box component="span" className="action-menu-icon">
          {item.icon}
        </Box>
      ) : null}
      <Box component="span" className="action-menu-label">
        {item.label}
      </Box>
      {item.showChevron ? (
        <ChevronRightRoundedIcon className="action-menu-chevron" />
      ) : null}
    </>
  );

  return (
    <CustomActionMenuStyled
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      {...placementOrigins[placement]}
    >
      {visibleItems.flatMap((item, index) => {
        const className = `action-menu-item tone-${item.tone ?? 'default'}`;
        const handleClick = () => {
          item.onClick?.();
          onClose();
        };

        const menuItem = item.href ? (
          <MenuItem
            key={item.key}
            component={Link}
            href={item.href}
            className={className}
            disabled={item.disabled}
            onClick={handleClick}
          >
            {renderContent(item)}
          </MenuItem>
        ) : (
          <MenuItem
            key={item.key}
            className={className}
            disabled={item.disabled}
            onClick={handleClick}
          >
            {renderContent(item)}
          </MenuItem>
        );

        return item.dividerBefore && index > 0
          ? [
              <Box
                key={`${item.key}-divider`}
                component="li"
                role="separator"
                className="action-menu-divider"
              />,
              menuItem,
            ]
          : [menuItem];
      })}
    </CustomActionMenuStyled>
  );
}

type CustomActionMenuTriggerProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  'aria-label'?: string;
  className?: string;
};

export const CustomActionMenuTrigger = memo(function CustomActionMenuTrigger({
  onClick,
  'aria-label': ariaLabel = 'More actions',
  className,
}: CustomActionMenuTriggerProps) {
  return (
    <CustomActionMenuTriggerButton
      size="small"
      type="button"
      aria-label={ariaLabel}
      aria-haspopup="menu"
      className={className}
      onClick={onClick}
    >
      <MoreVertIcon />
    </CustomActionMenuTriggerButton>
  );
});

export default memo(CustomActionMenu);
