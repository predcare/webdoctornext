import { Box, Dialog, Slide, styled, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect } from 'react';
import CloseIcon from '../Icons/CloseIcon';

interface ICustomModalWrapperProps {
  open: boolean;
  onClose?: () => void;
  scroll?: 'paper' | 'body';
  children: React.JSX.Element | React.JSX.Element[];
  className?: string;
  noCloseBtn?: boolean;
  isWhiteBg?: boolean;
  hasRoundedCross?: boolean;
  heading?: string;
  subheading?: string;
  headerIcon?: React.ReactNode;
}

const SlideDownTransition = forwardRef(function SlideDownTransition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomModal({
  open,
  onClose,
  scroll,
  children,
  className,
  noCloseBtn,
  isWhiteBg,
  hasRoundedCross,
  heading,
  subheading,
  headerIcon,
}: ICustomModalWrapperProps) {
  useEffect(() => {
    const html = document.documentElement;
    const modalClass = 'modal-open';
    if (open) {
      html.classList.add(modalClass);
    } else {
      html.classList.remove(modalClass);
    }
    return () => {
      html.classList.remove(modalClass);
    };
  }, [open]);

  const showCloseBtn = !noCloseBtn || hasRoundedCross;

  return (
    <MuiModalWrapperStyled
      className={`common-modal ${className} ${isWhiteBg ? 'white-bg-cls' : ''}`}
      open={open}
      onClose={onClose}
      scroll={scroll}
      slots={{
        transition: SlideDownTransition,
      }}
      transitionDuration={300}
      aria-labelledby="responsive-dialog-title"
    >
      {heading && (
        <Box className="modal-header">
          <Box className="modal-header-left">
            {headerIcon && <span className="header-icon">{headerIcon}</span>}
            <Box className="header-text">
              <Typography className="heading">{heading}</Typography>
              {subheading && (
                <Typography className="heading-sub">{subheading}</Typography>
              )}
            </Box>
          </Box>
          {showCloseBtn && (
            <IconButton onClick={onClose} disableRipple className="close-btn">
              <CloseIcon IconColor="currentColor" />
            </IconButton>
          )}
        </Box>
      )}

      {!heading && showCloseBtn && (
        <IconButton
          onClick={onClose}
          autoFocus
          disableRipple
          className="close-btn-floating"
        >
          <CloseIcon IconColor="currentColor" />
        </IconButton>
      )}

      <DialogContent>{children}</DialogContent>
    </MuiModalWrapperStyled>
  );
}

export const MuiModalWrapperStyled = styled(Dialog)`
  .MuiDialog-paper {
    position: relative;
    max-width: 1200px;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.palette.divider};
    overflow: hidden;
    @media (max-width: 899px) {
      border-radius: 14px;
    }

    @media (max-width: 599px) {
      margin: 10px;
      border-radius: 12px;
    }

    /* ================= HEADER ================= */
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 24px;
      border-bottom: 0.5px solid ${({ theme }) => theme.palette.divider};
      background-color: ${({ theme }) => theme.palette.background.paper};

      /* top accent bar lives on the header */
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background: linear-gradient(
          90deg,
          ${({ theme }) => theme.palette.primary.main},
          ${({ theme }) => theme.palette.primary.dark}
        );
        border-radius: 16px 16px 0 0;
        pointer-events: none;
      }

      @media (max-width: 599px) {
        padding: 14px 16px;
      }
    }

    .modal-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: ${({ theme }) => theme.palette.primary.light};
      flex-shrink: 0;
      svg {
        width: 16px;
        height: 16px;
        color: ${({ theme }) => theme.palette.primary.main};
      }
    }

    .header-text {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .heading {
      font-family: 'Outfit', sans-serif !important;
      font-weight: 600;
      font-size: 15px;
      line-height: 1.3;
      color: ${({ theme }) => theme.palette.text.primary};
      margin: 0;
    }

    .heading-sub {
      font-size: 11px;
      color: ${({ theme }) => theme.palette.text.secondary};
      line-height: 1.4;
      margin: 0;
    }

    /* ================= CLOSE BUTTON (inside header) ================= */
    .close-btn {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      border: 0.5px solid ${({ theme }) => theme.palette.divider};
      background: transparent;
      flex-shrink: 0;
      transition: background 0.15s ease;

      &:hover {
        background: ${({ theme }) => theme.palette.action.hover};
      }

      svg {
        width: 14px;
        height: 14px;
        color: ${({ theme }) => theme.palette.text.secondary};
      }
    }

    /* close btn when no heading exists */
    .close-btn-floating {
      position: absolute;
      top: 14px;
      right: 14px;
      z-index: 2;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      border: 0.5px solid ${({ theme }) => theme.palette.divider};
      background: transparent;
      transition: background 0.15s ease;

      &:hover {
        background: ${({ theme }) => theme.palette.action.hover};
      }

      svg {
        width: 14px;
        height: 14px;
        color: ${({ theme }) => theme.palette.text.secondary};
      }
    }

    /* ================= CONTENT ================= */
    .MuiDialogContent-root {
      padding: 24px 28px;

      @media (max-width: 899px) {
        padding: 20px;
      }

      @media (max-width: 479px) {
        padding: 16px;
      }
    }
  }

  /* ================= BACKDROP ================= */
  .MuiBackdrop-root {
    backdrop-filter: blur(1px);
  }

  /* ================= WHITE BG VARIANT ================= */
  &.white-bg-cls {
    .MuiDialog-paper {
      background-color: ${({ theme }) => theme.palette.background.paper};
    }
  }

  &.joinMeetingModal {
    .MuiDialog-paper {
      width: 100%;
      max-width: 600px;
      height: initial;
      margin: 20px auto;
      border-radius: 16px;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .MuiDialog-paper {
        max-width: 95%;
        margin: 16px auto;
        height: initial;
      }
    }

    @media (max-width: 599px) {
      .MuiDialog-paper {
        max-width: calc(100% - 20px);
        margin: 10px;
        height: initial;
      }
    }
  }
  &.profileModal {
    .MuiDialog-paper {
      width: 100%;
      max-width: 650px;
      margin: 20px auto;
      height: initial;
      border-radius: 24px;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .MuiDialog-paper {
        max-width: 95%;
        margin: 16px auto;
      }
    }

    @media (max-width: 599px) {
      .MuiDialog-paper {
        max-width: calc(100% - 20px);
        margin: 10px;
      }
    }
  }
  &.passwordModal {
    .MuiDialog-paper {
      width: 100%;
      max-width: 450px;
      margin: 20px auto;
      height: initial;
      border-radius: 24px;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .MuiDialog-paper {
        max-width: 95%;
        margin: 16px auto;
      }
    }

    @media (max-width: 599px) {
      .MuiDialog-paper {
        max-width: calc(100% - 20px);
        margin: 10px;
      }
    }
  }
  &.forgotPasswordModal {
    .MuiDialog-paper {
      width: 100%;
      max-width: 450px;
      margin: 20px auto;
      height: initial;
      border-radius: 24px;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .MuiDialog-paper {
        max-width: 95%;
        margin: 16px auto;
      }
    }

    @media (max-width: 599px) {
      .MuiDialog-paper {
        max-width: calc(100% - 20px);
        margin: 10px;
      }
    }
  }
  &.meetingSettingModal {
    .MuiDialog-paper {
      width: 100%;
      max-width: 500px;
      margin: 20px auto;
      height: initial;
      border-radius: 24px;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .MuiDialog-paper {
        max-width: 95%;
        margin: 16px auto;
      }
    }

    @media (max-width: 599px) {
      .MuiDialog-paper {
        max-width: calc(100% - 20px);
        margin: 10px;
      }
    }
  }
  &.confirmationModal {
    .MuiDialog-paper {
      width: 100%;
      max-width: 450px;
      margin: 20px auto;
      height: initial;
      border-radius: 24px;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .MuiDialog-paper {
        max-width: 95%;
        margin: 16px auto;
      }
    }

    @media (max-width: 599px) {
      .MuiDialog-paper {
        max-width: calc(100% - 20px);
        margin: 10px;
      }
    }
  }
  &.otpVerifyModal {
    .MuiDialog-paper {
      width: 100%;
      max-width: 400px;
      margin: 16px;
      background: transparent;
      box-shadow: none;
      height: initial;
    }

    @media (max-width: 768px) {
      .MuiDialog-paper {
        max-width: 95%;
        margin: 16px auto;
        height: initial;
      }
    }

    @media (max-width: 599px) {
      .MuiDialog-paper {
        max-width: calc(100% - 20px);
        margin: 10px;
        height: initial;
      }
    }
  }

  /* ─── Add Blog Modal ─────────────────────────────────── */
  &.addBlogModal {
    .MuiDialog-paper {
      width: 100%;
      max-width: 1200px;
      margin: 24px auto;
      height: calc(100dvh - 48px);
      border-radius: 20px;
      overflow: hidden;
    }

    @media (max-width: 1024px) {
      .MuiDialog-paper {
        max-width: 96%;
      }
    }

    @media (max-width: 599px) {
      .MuiDialog-paper {
        max-width: calc(100% - 20px);
        margin: 10px;
        height: calc(100dvh - 20px);
        border-radius: 16px;
      }
    }
  }

  /* ─── Add / Edit Category Modal ──────────────────────── */
  &.addCategoryModal {
    .MuiDialog-paper {
      width: 100%;
      max-width: 520px;
      margin: 24px auto;
      height: initial;
      border-radius: 20px;
      overflow: hidden;
    }

    @media (max-width: 599px) {
      .MuiDialog-paper {
        max-width: calc(100% - 20px);
        margin: 10px;
        border-radius: 16px;
      }
    }
  }

  /* ─── Add Family Member Modal ────────────────────────── */
  &.familyMemberModal {
    .MuiDialog-paper {
      width: 100%;
      max-width: 640px;
      margin: 24px auto;
      height: initial;
      border-radius: 20px;
      overflow: hidden;
    }

    @media (max-width: 599px) {
      .MuiDialog-paper {
        max-width: calc(100% - 20px);
        margin: 10px;
        border-radius: 16px;
      }
    }
  }

  /* ─── Upload Medical Record Modal ────────────────────── */
  &.medicalRecordModal {
    .MuiDialog-paper {
      width: 100%;
      max-width: 720px;
      margin: 24px auto;
      height: initial;
      border-radius: 20px;
      overflow: hidden;
    }

    @media (max-width: 599px) {
      .MuiDialog-paper {
        max-width: calc(100% - 20px);
        margin: 10px;
        border-radius: 16px;
      }
    }
  }

  @media (max-width: 599px) {
    max-height: calc(100vh - 60px);
  }
`;
