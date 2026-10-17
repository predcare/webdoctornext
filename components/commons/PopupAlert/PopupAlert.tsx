'use client';

import CustomModal from '@/components/ui/CustomModal/CustomModal';
import { PopupAlertWrapper } from '@/styles/CustomStyled/PopupAlertWrapper';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { Box, Button, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

export interface PopupAlertProps {
  visible: boolean;
  type?: AlertType;
  title?: string;
  message?: string;
  buttonText?: string;
  cancelText?: string;
  onPress?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  closeOnBackdrop?: boolean;
}

const ALERT_CONFIG: Record<
  AlertType,
  { icon: ReactNode; defaultTitle: string }
> = {
  success: {
    icon: <CheckCircleOutlineRoundedIcon />,
    defaultTitle: 'Success',
  },
  error: { icon: <HighlightOffRoundedIcon />, defaultTitle: 'Error' },
  warning: { icon: <WarningAmberRoundedIcon />, defaultTitle: 'Warning' },
  info: { icon: <InfoOutlinedIcon />, defaultTitle: 'Information' },
  confirm: { icon: <HelpOutlineRoundedIcon />, defaultTitle: 'Confirmation' },
};

const PopupAlert = ({
  visible,
  type = 'info',
  title,
  message,
  buttonText = 'OK',
  cancelText = 'Cancel',
  onPress,
  onCancel,
  showCancel = false,
}: PopupAlertProps) => {
  const config = ALERT_CONFIG[type] ?? ALERT_CONFIG.info;

  return (
    <CustomModal
      open={visible}
      onClose={onCancel}
      className="popupAlertModal"
      noCloseBtn
      isWhiteBg
    >
      <PopupAlertWrapper
        className={`tone-${type}`}
        role="alertdialog"
        aria-labelledby="popup-alert-title"
        aria-describedby={message ? 'popup-alert-message' : undefined}
      >
        <Box className="popup-top-bar" />
        <Box className="popup-icon-outer">
          <Box className="popup-icon-inner">{config.icon}</Box>
        </Box>
        <Typography
          id="popup-alert-title"
          component="h2"
          className="popup-title"
        >
          {title || config.defaultTitle}
        </Typography>
        {message ? (
          <Typography
            id="popup-alert-message"
            component="p"
            className="popup-message"
          >
            {message}
          </Typography>
        ) : null}
        <Box className="popup-actions">
          {showCancel ? (
            <Button
              type="button"
              variant="outlined"
              className="popup-btn cancel"
              onClick={onCancel}
            >
              {cancelText}
            </Button>
          ) : null}
          <Button
            type="button"
            variant="contained"
            disableElevation
            autoFocus
            className="popup-btn primary"
            onClick={onPress}
          >
            {buttonText}
          </Button>
        </Box>
      </PopupAlertWrapper>
    </CustomModal>
  );
};

export default PopupAlert;
