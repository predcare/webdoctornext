'use client';

import { Box, styled } from '@mui/material';

export const UploadMedicalRecordModalWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .is-required .inputLabel-txt-global::after,
  .is-required > .field-label::after {
    content: '*';
    margin-left: 2px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.error};
  }

  .select-placeholder {
    font-size: 13px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .field-label {
    margin: 0 0 8px;
    font-size: 12.5px;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .field-helper {
    margin: 6px 0 0;
    font-size: 11px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .upload-zone {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
    border-radius: 12px;
    cursor: pointer;
    border: 1.5px dashed ${({ theme }) => theme.palette.customColors.inputBorder};
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    transition: border-color 0.2s ease, background 0.2s ease;

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }

    input {
      display: none;
    }
  }

  .upload-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};

    .MuiSvgIcon-root {
      font-size: 22px;
    }
  }

  .upload-copy {
    flex: 1;
    min-width: 0;
  }

  .upload-title,
  .upload-note {
    margin: 0;
  }

  .upload-title {
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .upload-note {
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .choose-btn {
    display: inline-flex;
    align-items: center;
    height: 34px;
    padding: 0 14px;
    border-radius: 8px;
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .visibility-box {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 14px 16px;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};

    .MuiSwitch-root {
      margin-top: -6px;
      margin-left: -8px;
    }
  }

  .visibility-copy {
    min-width: 0;
  }

  .visibility-title,
  .visibility-note {
    margin: 0;
  }

  .visibility-title {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.customColors.heading};

    .MuiSvgIcon-root {
      font-size: 16px;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .visibility-note {
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .footer-btn.MuiButton-root {
    height: 40px;
    min-width: 110px;
    padding-left: 18px;
    padding-right: 18px;
    border-radius: 8px;
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    box-shadow: none;
  }

  .footer-btn.MuiButton-outlined {
    color: ${({ theme }) => theme.palette.customColors.heading};
    border-color: ${({ theme }) => theme.palette.customColors.border};

    &:hover {
      color: ${({ theme }) => theme.palette.customColors.error};
      border-color: ${({ theme }) => theme.palette.customColors.error};
      background: ${({ theme }) => theme.palette.customColors.errorBg};
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 20px;

    .upload-zone {
      flex-wrap: wrap;
      padding: 16px;
    }

    .choose-btn {
      width: 100%;
      justify-content: center;
    }

    .modal-footer {
      flex-direction: column-reverse;
      align-items: stretch;
    }

    .footer-btn.MuiButton-root {
      width: 100%;
    }
  }
`;
