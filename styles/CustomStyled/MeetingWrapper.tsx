'use client';

import { Box, styled } from '@mui/material';

const headerOffsetLg = 77;

export const MeetingWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  width: 100%;
  margin-bottom: 8px;
  background: transparent;

  .stage {
    position: relative;
    min-height: 420px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: linear-gradient(180deg, #f7f8fa 0%, #e8edf2 58%, #d5dde6 100%);
    overflow: hidden;
  }

  .remote-feed {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #f7f8fa 0%, #e8edf2 58%, #d5dde6 100%);
  }

  .status-row {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: calc(100% - 180px);
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 22px;
    padding: 0 8px;
    border-radius: 999px;
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.03em;
    line-height: 1;
    white-space: nowrap;

    .MuiSvgIcon-root {
      font-size: 13px;
    }

    .net-arrow {
      font-size: 11px;
    }

    &.timer {
      background: #6a4b16;
    }

    &.hd {
      background: #1b2433;
    }

    &.net,
    &.encrypted {
      background: #17803d;
    }
  }

  .remote-name {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 2;
    margin: 0;
    max-width: 46%;
    overflow: hidden;
    padding: 6px 10px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.92);
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 11px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
  }

  .control-bar {
    position: absolute;
    left: 50%;
    bottom: 14px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    max-width: calc(100% - 24px);
    transform: translateX(-50%);
  }

  && .control-btn {
    width: 36px;
    height: 36px;
    padding: 0;
    border-radius: 50%;
    background: #ffffff;
    color: #334155;
    border: 1px solid rgba(15, 23, 42, 0.06);
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12);

    .MuiSvgIcon-root {
      font-size: 20px;
    }

    &:hover {
      background: #f8fafc;
    }
  }

  && .control-btn.end-call {
    background: ${({ theme }) => theme.palette.customColors.error};
    color: #ffffff;
    border-color: transparent;

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.error};
      filter: brightness(0.94);
    }
  }

  .local-tile {
    position: absolute;
    right: 12px;
    bottom: 68px;
    z-index: 2;
    width: 120px;
    height: 78px;
    border-radius: 10px;
    border: 2px solid #ffffff;
    overflow: hidden;
    background: linear-gradient(180deg, #d5dee8 0%, #9aabbd 100%);
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.16);

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 18px;
      width: 26px;
      height: 26px;
      margin-left: -13px;
      border-radius: 50%;
      background: #6d7c8d;
    }

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -6px;
      width: 64px;
      height: 42px;
      margin-left: -32px;
      border-radius: 32px 32px 0 0;
      background: #5c6b7c;
    }
  }

  .side-panel {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    min-width: 0;
  }

  .panel-card {
    min-width: 0;
    padding: 16px;
    border-radius: 16px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  }

  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .profile-block {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;

    .MuiSvgIcon-root {
      font-size: 16px;
    }
  }

  .identity {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    min-width: 0;
  }

  .avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  .identity-copy {
    min-width: 0;
  }

  .patient-name {
    margin: 0;
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
  }

  .patient-id {
    margin: 2px 0 0;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
  }

  .meta-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .meta-card,
  .complaint-box {
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    border-radius: 8px;
    background: ${({ theme }) => theme.palette.customColors.pageBg};
  }

  .meta-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 12px;
    min-width: 0;
    border-radius: 12px;
  }

  .meta-label {
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    line-height: 14px;
    text-transform: uppercase;
  }

  .meta-value {
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
  }

  .complaint {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .complaint-box {
    padding: 12px;
    border-radius: 12px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    font-size: 13px;
    line-height: 18px;
  }

  && .panel-action {
    width: 100%;
    min-height: 42px;
    border-radius: 10px;
  }

  && .prescription-btn {
    border-color: ${({ theme }) => theme.palette.customColors.border};
    color: ${({ theme }) => theme.palette.customColors.heading};
    background: ${({ theme }) => theme.palette.customColors.cardBg};

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  && .settings-btn {
    width: 32px;
    height: 32px;
    padding: 0;
    flex-shrink: 0;
    border-radius: 8px;
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: #ffffff;

    .MuiSvgIcon-root {
      font-size: 16px;
    }

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealDark};
    }
  }

  .notes-block {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 8px;
  }

  .notes-field {
    .MuiOutlinedInput-root {
      align-items: flex-start;
      padding: 10px 12px;
      font-size: 13px;
      border-radius: 12px;
    }

    textarea {
      height: 88px !important;
      min-height: 88px !important;
      max-height: 140px !important;
      overflow: auto !important;
      resize: vertical;
    }

    .MuiInputBase-input::placeholder {
      color: ${({ theme }) => theme.palette.customColors.textMuted};
      opacity: 1;
    }
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    .stage {
      min-height: 480px;
    }

    .remote-name {
      top: 16px;
      right: 16px;
      max-width: 280px;
    }

    .control-bar {
      bottom: 16px;
      gap: 10px;
    }

    && .control-btn {
      width: 42px;
      height: 42px;
    }

    .local-tile {
      right: 16px;
      bottom: 76px;
      width: 156px;
      height: 100px;
    }
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    flex-direction: row;
    align-items: stretch;
    gap: 16px;
    height: calc(100dvh - ${headerOffsetLg}px - 24px - 48px);
    min-height: 0;
    margin-bottom: 16px;
    overflow: hidden;

    .stage {
      flex: 1;
      min-width: 0;
      min-height: 0;
      height: auto;
    }

    .remote-feed {
      inset: 0;
      width: auto;
    }

    .local-tile {
      width: 176px;
      height: 112px;
      right: 20px;
      bottom: 84px;
    }

    .remote-name {
      top: 16px;
      right: 16px;
      max-width: 280px;
    }

    .side-panel {
      width: 320px;
      flex-shrink: 0;
      height: 100%;
      overflow: auto;
    }

    .notes-block {
      margin-top: auto;
    }
  }
`;
