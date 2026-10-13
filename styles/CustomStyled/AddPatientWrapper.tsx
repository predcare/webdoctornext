'use client';

import { Box, styled } from '@mui/material';

export const AddPatientWrapper = styled(Box)`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .add-patient-form {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

    &:not(:has(input[name='mode'][value='existing']:checked)) .existing-only {
      display: none;
    }

    &:has(input[name='mode'][value='existing']:checked) .new-only {
      display: none;
    }
  }

  .form-card {
    display: flex;
    flex-direction: column;
    gap: 22px;
    padding: 24px;
    border-radius: 14px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
  }

  .card-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .card-title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .card-subtitle {
    margin: 0;
    font-size: 12px;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .field-label {
    display: flex;
    align-items: center;
    gap: 2px;
    margin: 0 0 8px;
    font-size: 12.5px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.01em;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

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

  .radio-group {
    min-height: 44px;
    align-items: center;
    gap: 8px 24px;

    .MuiFormControlLabel-root {
      margin: 0;
      gap: 8px;
    }

    .MuiRadio-root {
      padding: 2px;
      color: ${({ theme }) => theme.palette.customColors.inputBorder};

      &.Mui-checked {
        color: ${({ theme }) => theme.palette.customColors.brandTeal};
      }
    }

    .MuiFormControlLabel-label {
      font-size: 13px;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.customColors.heading};
    }
  }

  .photo-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .photo-picker.MuiIconButton-root {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border: 1px dashed ${({ theme }) => theme.palette.customColors.inputBorder};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    transition: border-color 0.15s ease, color 0.15s ease;

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }

    .MuiSvgIcon-root {
      font-size: 22px;
    }
  }

  .photo-copy {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .photo-title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .photo-hint {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .existing-only.MuiGrid-root {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .selected-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
  }

  .selected-user-copy {
    min-width: 0;
  }

  .selected-user-name {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.palette.customColors.heading};

    strong {
      font-weight: 700;
    }
  }

  .selected-user-email {
    margin: 2px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    word-break: break-all;
  }

  .clear-btn.MuiButton-root {
    flex-shrink: 0;
    height: 30px;
    padding: 0 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    text-transform: none;
    color: ${({ theme }) => theme.palette.customColors.error};
    border-color: ${({ theme }) => theme.palette.customColors.error};

    .MuiButton-startIcon {
      margin-right: 4px;
    }

    .MuiSvgIcon-root {
      font-size: 14px;
    }

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.errorBg};
    }
  }

  .form-note {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 14px 16px;
    border-radius: 10px;
    border: 1px solid transparent;

    .MuiSvgIcon-root {
      font-size: 18px;
      margin-top: 1px;
      flex-shrink: 0;
    }

    .MuiTypography-root {
      margin: 0;
      font-size: 13px;
      line-height: 20px;
      color: inherit;
    }

    strong {
      font-weight: 700;
    }

    &.info {
      color: ${({ theme }) => theme.palette.customColors.info};
      background: ${({ theme }) => theme.palette.customColors.infoBg};
      border-color: ${({ theme }) => theme.palette.customColors.info}33;
    }

    &.warning {
      color: ${({ theme }) => theme.palette.customColors.warning};
      background: ${({ theme }) => theme.palette.customColors.warningBg};
      border-color: ${({ theme }) => theme.palette.customColors.warning}33;
    }
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    padding-bottom: 8px;
  }

  .footer-btn.MuiButton-root {
    height: 42px;
    min-width: 120px;
    padding: 0 22px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    text-transform: none;
  }

  .cancel-btn.MuiButton-root {
    color: ${({ theme }) => theme.palette.customColors.heading};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .submit-btn.MuiButton-root {
    color: ${({ theme }) => theme.palette.common.white};
    background: ${({ theme }) => theme.palette.customColors.brandTeal};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealDark};
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .form-card {
      padding: 20px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 16px;

    .add-patient-form {
      gap: 16px;
    }

    .form-card {
      padding: 16px;
      gap: 18px;
      border-radius: 12px;
    }

    .radio-group {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .selected-user {
      flex-direction: column;
      align-items: flex-start;
    }

    .form-footer {
      flex-direction: column-reverse;
      align-items: stretch;
      gap: 10px;
    }

    .footer-btn.MuiButton-root {
      width: 100%;
    }
  }
`;
