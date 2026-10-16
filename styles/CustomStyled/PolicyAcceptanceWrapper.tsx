import { Box, Paper, styled } from '@mui/material';

export const PolicyAcceptanceWrapper = styled(Paper)`
  width: 100%;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.palette.customColors.cardBg};
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  overflow: hidden;
  padding: 24px;

  @media (min-width: 1200px) {
    padding: 40px;
  }

  .policy-header {
    text-align: center;
    margin-bottom: 24px;
  }

  && .policy-title {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.25;
    color: ${({ theme }) => theme.palette.customColors.heading};
    margin-bottom: 8px;
  }

  && .policy-subtitle {
    font-size: 1rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  .doc-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 14px;
  }

  .doc-tile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: border-color 0.15s ease, background-color 0.15s ease;

    &:hover {
      border-color: ${({ theme }) => theme.palette.primary.main};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }
  }

  .doc-tile-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    flex: 1;
  }

  .doc-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    color: ${({ theme }) => theme.palette.primary.main};
  }

  .doc-meta {
    min-width: 0;
  }

  .doc-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  && .doc-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .doc-version {
    flex-shrink: 0;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 600;
    background: ${({ theme }) => theme.palette.customColors.border};
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  && .doc-subtext {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  .doc-action {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
  }

  .notice-box {
    display: flex;
    gap: 8px;
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 16px;
    background: #fffbeb;
    color: #92400e;
  }

  && .notice-text {
    font-size: 0.85rem;
    line-height: 1.45;
  }

  .policy-divider {
    height: 1px;
    background: ${({ theme }) => theme.palette.customColors.border};
    margin: 8px 0 16px;
  }

  .checkbox-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  && .accept-btn {
    width: 100%;
    height: 52px;
    border-radius: 12px;
    font-size: 1.05rem;
    font-weight: 600;
    text-transform: none;
    color: #ffffff;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.palette.customColors.authAccentStart} 0%,
      ${({ theme }) => theme.palette.customColors.authAccentEnd} 100%
    );

    &:hover {
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.palette.customColors.authAccentHoverStart} 0%,
        ${({ theme }) => theme.palette.customColors.authAccentHoverEnd} 100%
      );
    }

    &.Mui-disabled {
      color: #ffffff;
      opacity: 0.55;
    }
  }

  && .signout-btn {
    width: 100%;
    height: 44px;
    border-radius: 12px;
    text-transform: none;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

export const PolicyContentModalWrapper = styled(Box)`
  .policy-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  }

  .policy-version-chip {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.2;
    color: ${({ theme }) => theme.palette.primary.main};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  .policy-body {
    max-height: min(52vh, 420px);
    overflow-y: auto;
    padding-right: 4px;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 999px;
      background: ${({ theme }) => theme.palette.divider};
    }
  }

  .policy-heading {
    font-weight: 700;
    font-size: 0.95rem;
    line-height: 1.4;
    color: ${({ theme }) => theme.palette.customColors.heading};
    margin: 16px 0 8px;

    &:first-child {
      margin-top: 0;
    }
  }

  .policy-paragraph {
    font-size: 0.9rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.palette.text.secondary};
    margin: 0 0 10px;
  }

  .policy-bullet {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 8px;
  }

  .policy-bullet-mark {
    flex-shrink: 0;
    margin-top: 2px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.primary.main};
  }

  .policy-bullet-text {
    font-size: 0.9rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  .policy-spacer {
    height: 8px;
  }

  .policy-empty {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.palette.text.secondary};
    text-align: center;
    padding: 24px 0;
  }
`;