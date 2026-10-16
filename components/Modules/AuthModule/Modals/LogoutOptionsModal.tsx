'use client';

import CustomModal from '@/components/ui/CustomModal/CustomModal';
import { LogoutOptionsModalWrapper } from '@/styles/CustomStyled/LogoutOptionsModalWrapper';
import LogoutIcon from '@mui/icons-material/Logout';
import PhonelinkLockOutlinedIcon from '@mui/icons-material/PhonelinkLockOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';

type LogoutChoice = 'current' | 'all';

export type LogoutOptionsModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirmLogout: (allDevices: boolean) => void;
  isLoading?: boolean;
};

const options: {
  id: LogoutChoice;
  title: string;
  description: string;
  icon: typeof PhonelinkLockOutlinedIcon;
}[] = [
    {
      id: 'current',
      title: 'Current device only',
      description: 'Log out of this session on your current device only.',
      icon: PhonelinkLockOutlinedIcon,
    },
    {
      id: 'all',
      title: 'All devices',
      description:
        'Sign out from all active sessions on phones, tablets, and web portals.',
      icon: ShieldOutlinedIcon,
    },
  ];

export default function LogoutOptionsModal({
  open,
  onClose,
  onConfirmLogout,
  isLoading = false,
}: LogoutOptionsModalProps) {
  const [selectedOption, setSelectedOption] = useState<LogoutChoice>('current');

  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      className="confirmationModal"
      heading="Sign Out"
      subheading="Choose how you want to log out of your doctor account."
      headerIcon={<LogoutIcon />}
      isWhiteBg
    >
      <LogoutOptionsModalWrapper>
        {options.map((option) => {
          const selected = selectedOption === option.id;
          const isDanger = option.id === 'all';
          const Icon = option.icon;

          return (
            <Box
              key={option.id}
              component="button"
              type="button"
              disabled={isLoading}
              aria-pressed={selected}
              className={
                selected
                  ? isDanger
                    ? 'option-card is-selected is-danger'
                    : 'option-card is-selected'
                  : isDanger
                    ? 'option-card is-danger'
                    : 'option-card'
              }
              onClick={() => setSelectedOption(option.id)}
            >
              <span
                className={
                  isDanger ? 'option-icon is-danger' : 'option-icon'
                }
              >
                <Icon />
              </span>
              <Box className="option-copy">
                <Typography
                  component="p"
                  className={
                    isDanger && selected
                      ? 'option-title is-danger'
                      : 'option-title'
                  }
                >
                  {option.title}
                </Typography>
                <Typography component="p" className="option-description">
                  {option.description}
                </Typography>
              </Box>
              <span
                className={
                  selected
                    ? isDanger
                      ? 'option-radio is-selected is-danger'
                      : 'option-radio is-selected'
                    : 'option-radio'
                }
              />
            </Box>
          );
        })}

        <Button
          type="button"
          className="confirm-btn"
          variant="contained"
          disableElevation
          disabled={isLoading}
          onClick={() => onConfirmLogout(selectedOption === 'all')}
        >
          {isLoading ? (
            <CircularProgress size={18} color="inherit" />
          ) : selectedOption === 'all' ? (
            'Sign Out of All Devices'
          ) : (
            'Sign Out'
          )}
        </Button>
        <Button
          type="button"
          className="cancel-btn"
          disabled={isLoading}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </LogoutOptionsModalWrapper>
    </CustomModal>
  );
}
