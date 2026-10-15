'use client';

import { Box, styled } from '@mui/material';

export const ProfileWrapper = styled(Box)`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .profile-layout {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    gap: 16px;
    align-items: start;
    min-width: 0;
  }

  .tab-nav {
    display: flex;
    flex-direction: column;
    min-width: 0;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    overflow: hidden;
  }

  .tab-link {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 46px;
    padding: 10px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-decoration: none;
    transition:
      background-color 0.15s ease,
      color 0.15s ease;

    .MuiSvgIcon-root {
      font-size: 18px;
      flex-shrink: 0;
    }

    &:last-child {
      border-bottom: 0;
    }

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
      color: ${({ theme }) => theme.palette.customColors.heading};
    }

    &.is-active {
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      font-weight: 600;
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.palette.customColors.brandTeal};
      outline-offset: -2px;
    }
  }

  .profile-main,
  .section-stack {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .section-stack {
    margin: 0;
  }

  .form-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
    padding: 20px;
    border-radius: 14px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
  }

  .card-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    color: ${({ theme }) => theme.palette.customColors.heading};

    .MuiSvgIcon-root {
      font-size: 18px;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }
  }

  .card-subtitle,
  .block-copy,
  .field-hint,
  .empty-copy,
  .readonly-note,
  .format-note {
    margin: 6px 0 0;
    font-size: 12.5px;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .avatar-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .section-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    padding-bottom: 14px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .field-label,
  .block-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 8px;
    font-size: 13px;
    font-weight: 700;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.customColors.heading};

    .MuiSvgIcon-root {
      font-size: 18px;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }
  }

  .label-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }

  .label-row .field-label,
  .block-title {
    margin-bottom: 0;
  }

  .optional-pill {
    padding: 1px 8px;
    border-radius: 999px;
    background: ${({ theme }) => theme.palette.customColors.hoverBg};
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
  }

  .is-required .inputLabel-txt-global::after,
  .is-required > .field-label::after {
    content: '*';
    margin-left: 2px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.error};
  }

  .profile-overview {
    gap: 18px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.palette.customColors.brandTealLight} 0%,
      ${({ theme }) => theme.palette.customColors.cardBg} 42%
    );
  }

  .profile-overview .identity-card,
  .profile-overview .summary-card {
    padding: 0;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
  }

  .profile-overview .summary-card {
    gap: 14px;
    padding-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .identity-card {
    flex-direction: row;
    align-items: center;
    gap: 18px;
  }

  .identity-avatar,
  .profile-avatar {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    font-weight: 700;
  }

  .identity-avatar {
    width: 72px;
    height: 72px;
    border-radius: 18px;
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 30px;
    box-shadow: 0 10px 22px
      ${({ theme }) => theme.palette.customColors.brandTealGlow};
  }

  .profile-avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    font-size: 28px;
    font-weight: 600;
  }

  .identity-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .identity-name-row,
  .clinic-line,
  .chip-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .identity-name {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .identity-role {
    margin: 0;
    font-size: 13px;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .clinic-line {
    width: fit-content;
    max-width: 100%;
    margin: 2px 0 0;
    padding: 6px 10px 6px 8px;
    border-radius: 999px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    font-size: 13px;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }

  .clinic-line .MuiSvgIcon-root {
    font-size: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .spec-chip.MuiChip-root,
  .muted-chip.MuiChip-root {
    height: 26px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }

  .spec-chip.MuiChip-root {
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .muted-chip.MuiChip-root {
    background: ${({ theme }) => theme.palette.customColors.hoverBg};
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }

  .verified-pill,
  .summary-verified {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.palette.customColors.success};
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;

    .MuiSvgIcon-root {
      font-size: 14px;
    }
  }

  .verified-pill {
    padding: 2px 8px;
    border-radius: 999px;
    background: ${({ theme }) => theme.palette.customColors.successBg};
  }

  .summary-card {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .summary-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .summary-row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
  }

  .summary-row.is-wide {
    grid-column: 1 / -1;
  }

  .summary-icon {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    color: ${({ theme }) => theme.palette.customColors.brandTeal};

    .MuiSvgIcon-root {
      font-size: 20px;
    }
  }

  .summary-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .summary-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .summary-label {
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .summary-value {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.customColors.heading};
    overflow-wrap: anywhere;
  }

  .static-box {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 44px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.inputBorder};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
  }

  .chip-meta {
    margin: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .mode-block,
  .signature-block,
  .setting-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .setting-block:last-of-type,
  .signature-block:last-of-type {
    padding-bottom: 0;
    border-bottom: 0;
  }

  .mode-panel {
    display: none;
    min-width: 0;
  }

  .mode-block:has(input[value='default']:checked) .mode-default,
  .mode-block:has(input[value='editor']:checked) .mode-editor,
  .mode-block:has(input[value='image']:checked) .mode-image {
    display: flex;
  }

  .mode-default,
  .info-note {
    align-items: flex-start;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 8px;
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    color: ${({ theme }) => theme.palette.customColors.textMuted};

    .MuiSvgIcon-root {
      font-size: 16px;
      margin-top: 1px;
      flex-shrink: 0;
    }

    p {
      margin: 0;
      font-size: 13px;
      line-height: 20px;
    }
  }

  .mode-editor,
  .mode-image {
    flex-direction: column;
    gap: 8px;
  }

  .native-file {
    width: 100%;
    max-width: 100%;
    min-height: 44px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.inputBorder};
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    color: ${({ theme }) => theme.palette.customColors.textPrimary};
    font-size: 13px;
  }

  .upload-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px;
    border-radius: 8px;
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 15px;
    font-weight: 700;

    .MuiSvgIcon-root {
      font-size: 18px;
    }
  }

  .signature-dropzone {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 28px 16px;
    border-radius: 12px;
    border: 1px dashed ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    text-align: center;
  }

  .signature-block:has(input[value='none']:checked) .signature-dropzone {
    display: none;
  }

  .signature-none-note {
    display: none;
  }

  .signature-block:has(input[value='none']:checked) .signature-none-note {
    display: block;
  }

  .drop-icon {
    color: ${({ theme }) => theme.palette.customColors.textMuted};

    .MuiSvgIcon-root {
      font-size: 28px;
    }
  }

  .drop-title {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .select-file-btn.MuiButton-root {
    width: min(100%, 460px);
    min-height: 40px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.brandTeal};
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    font-size: 14px;
    font-weight: 600;
    text-transform: none;

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }
  }

  .form-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .form-actions.is-end {
    justify-content: flex-end;
  }

  .form-actions-end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    margin-left: auto;
  }

  .add-btn.MuiButton-root,
  .cancel-btn.MuiButton-root,
  .save-btn.MuiButton-root {
    min-height: 38px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-transform: none;
    box-shadow: none;
  }

  .add-btn.MuiButton-root {
    border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.cardBg};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }
  }

  .cancel-btn.MuiButton-root {
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    background: transparent;

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .save-btn.MuiButton-root {
    padding: 0 16px;
    color: ${({ theme }) => theme.palette.common.white};
    background: ${({ theme }) => theme.palette.customColors.brandTeal};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealDark};
    }
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    .profile-layout {
      grid-template-columns: minmax(0, 1fr);
    }

    .tab-nav {
      flex-direction: row;
      overflow-x: auto;
      scrollbar-width: thin;
    }

    .tab-link {
      flex: 0 0 auto;
      border-bottom: 0;
      border-right: 1px solid
        ${({ theme }) => theme.palette.customColors.border};
      white-space: nowrap;

      &:last-child {
        border-right: 0;
      }
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .form-card {
      padding: 16px;
    }

    .identity-card {
      flex-direction: column;
      align-items: flex-start;
    }

    .summary-list {
      grid-template-columns: minmax(0, 1fr);
    }

    .summary-row.is-wide {
      grid-column: auto;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 12px;

    .profile-layout,
    .profile-main,
    .section-stack {
      gap: 12px;
    }

    .form-card {
      padding: 14px;
      border-radius: 12px;
    }

    .identity-name {
      font-size: 16px;
    }

    .section-head {
      flex-direction: column;
    }

    .form-actions,
    .form-actions-end {
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      margin-left: 0;
    }

    .add-btn.MuiButton-root,
    .cancel-btn.MuiButton-root,
    .save-btn.MuiButton-root,
    .select-file-btn.MuiButton-root {
      width: 100%;
    }
  }
`;
