'use client';

import { Box, Popover, styled } from '@mui/material';

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
    right: 14px;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    max-width: none;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
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

      &.warning {
        background: #d97706;
      }

      &.urgent {
        background: #dc2626;
      }
    }

    &.hd {
      background: #1b2433;
    }

    &.net,
    &.encrypted {
      background: #17803d;
    }

    &.net.offline {
      background: ${({ theme }) => theme.palette.customColors.error};
    }

    &.share-label {
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .status-pill-id {
    min-width: 0;
    max-width: 34vw;
    margin-left: 2px;
    padding-left: 6px;
    overflow: hidden;
    border-left: 1px solid rgba(255, 255, 255, 0.45);
    text-overflow: ellipsis;
  }

  .remote-name {
    position: static;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex: 0 1 auto;
    min-width: 0;
    max-width: fit-content;
    margin: 0;
    overflow: hidden;
    height: 22px;
    padding: 0 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
  }

  .remote-name-text {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .remote-name-id {
    flex-shrink: 0;
    max-width: 42vw;
    overflow: hidden;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  && .control-btn.is-off {
    background: ${({ theme }) => theme.palette.customColors.errorBg};
    color: ${({ theme }) => theme.palette.customColors.error};
    border-color: ${({ theme }) => theme.palette.customColors.error};
  }

  && .control-btn.is-sharing {
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: #ffffff;
    border-color: transparent;

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
      filter: brightness(0.94);
    }
  }

  .participants-badge .MuiBadge-badge {
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    font-size: 10px;
    font-weight: 700;
  }

  .local-tile {
    position: absolute;
    right: 12px;
    bottom: 68px;
    z-index: 4;
    width: 120px;
    height: 78px;
    border-radius: 12px;
    border: 2px solid #ffffff;
    overflow: hidden;
    background: #1e293b;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.25);
  }

  .local-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
  }

  .local-camera-off {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #334155;
    color: #94a3b8;
  }

  .local-mute {
    position: absolute;
    bottom: 6px;
    left: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.customColors.error};
    color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    .MuiSvgIcon-root {
      font-size: 13px;
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

  && .avatar {
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
    box-shadow: 0 0 0 4px
      ${({ theme }) => theme.palette.customColors.brandTealLight};
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

  .session-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-height: 60vh;
    padding: 24px;
    text-align: center;
  }

  .session-empty-icon.MuiSvgIcon-root {
    font-size: 64px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .session-empty-title {
    margin: 0;
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 24px;
    font-weight: 600;
  }

  .session-empty-copy {
    max-width: 420px;
    margin: 0;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    font-size: 16px;
    line-height: 1.5;
  }

  .session-empty-action {
    margin-top: 8px;
    border-radius: 10px;
  }

  .remote-video {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #0f172a;
  }

  .remote-player,
  .remote-player-video,
  .mini-player-video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #0f172a;
  }

  .remote-waiting,
  .remote-cam-off {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    color: #f8fafc;
    text-align: center;
  }

  .remote-waiting {
    padding: 24px;
  }

  .remote-spinner.MuiCircularProgress-root {
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .remote-waiting-title {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }

  .remote-waiting-copy,
  .remote-cam-note {
    max-width: 360px;
    margin: 0;
    color: #94a3b8;
    font-size: 14px;
    line-height: 1.5;
  }

  .remote-cam-note {
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: none;
  }

  .remote-avatar.MuiAvatar-root {
    width: 96px;
    height: 96px;
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    font-size: 40px;
    font-weight: 700;
    box-shadow: 0 0 0 8px
      ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  .summary-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-height: 60vh;
  }

  .summary-spinner.MuiCircularProgress-root {
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  &:has(.summary-page) {
    height: auto;
    min-height: 0;
    overflow: visible;
  }

  .summary-page {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 16px 0;
  }

  .summary-card.MuiPaper-root {
    width: 100%;
    overflow: hidden;
    border-radius: 16px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: none;
    box-shadow: none
  }

  .summary-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 24px;
    background: ${({ theme }) => theme.palette.customColors.successBg};
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .summary-banner-icon.MuiSvgIcon-root {
    font-size: 36px;
    color: ${({ theme }) => theme.palette.customColors.success};
  }

  .summary-banner-title {
    margin: 0;
    color: ${({ theme }) => theme.palette.customColors.success};
    font-size: 20px;
    font-weight: 700;
  }

  .summary-banner-copy {
    margin: 4px 0 0;
    color: ${({ theme }) => theme.palette.customColors.success};
    font-size: 14px;
  }

  .summary-body.MuiCardContent-root,
  .summary-body.MuiCardContent-root:last-child {
    padding: 24px;
  }

  .summary-identity {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .summary-avatar.MuiAvatar-root {
    width: 56px;
    height: 56px;
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    font-size: 24px;
    font-weight: 700;
  }

  .summary-name {
    margin: 0;
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 20px;
    font-weight: 700;
  }

  .summary-identity-copy {
    margin: 4px 0 0;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    font-size: 14px;
  }

  .summary-divider {
    margin: 20px 0;
    border-color: ${({ theme }) => theme.palette.customColors.border};
  }

  .summary-section-heading {
    margin-bottom: 12px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .summary-contact-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
  }

  .summary-contact-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    font-size: 13px;

    .MuiSvgIcon-root {
      font-size: 15px;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .summary-meta-label {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;

    .MuiSvgIcon-root {
      font-size: 15px;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .summary-meta-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 16px;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.hoverBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .summary-meta-value {
    margin: 6px 0 0;
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 15px;
    font-weight: 600;
  }

  .summary-clinical-box {
    padding: 14px 16px;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.hoverBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .summary-allergy-alert {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    background: ${({ theme }) => theme.palette.customColors.errorBg};
    color: ${({ theme }) => theme.palette.customColors.error};
    font-size: 12px;
    font-weight: 600;

    .MuiSvgIcon-root {
      font-size: 16px;
    }
  }

  .summary-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: flex-end;
  }

  .summary-action {
    border-radius: 10px;
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    .stage {
      min-height: 480px;
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

    .summary-page {
      padding: 20px 0;
    }

    .summary-body.MuiCardContent-root,
    .summary-body.MuiCardContent-root:last-child,
    .summary-banner {
      padding: 32px;
    }
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    &:has(.summary-page) {
      height: auto;
      overflow: visible;
      flex-direction: column;
      margin-bottom: 24px;
    }

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

export const MeetingParticipantsPopover = styled(Popover)`
  .MuiPopover-paper {
    width: 280px;
    max-width: calc(100vw - 32px);
    margin-top: -8px;
    padding: 12px;
    border-radius: 16px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
  }

  .participants-title {
    margin: 0;
    padding: 0 8px 8px;
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 14px;
    font-weight: 700;
  }

  .participants-empty {
    margin: 0;
    padding: 8px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    font-size: 14px;
  }

  .participant-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 6px 8px;
  }

  .participant-name {
    min-width: 0;
    overflow: hidden;
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 14px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .participant-media {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};

    .MuiSvgIcon-root {
      font-size: 16px;
    }

    .is-off {
      color: ${({ theme }) => theme.palette.customColors.error};
    }
  }
`;

export const EndCallActions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const MeetingMiniPlayerShell = styled(Box)`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1400;
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 160px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  background: #0f172a;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);

  .mini-top {
    position: absolute;
    top: 8px;
    right: 8px;
    left: 8px;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mini-timer {
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    font-size: 11px;
    font-weight: 700;
  }

  .mini-expand {
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;

    &:hover {
      background: rgba(0, 0, 0, 0.85);
    }
  }

  .mini-stage {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #1e293b;
  }

  .mini-player-frame,
  .mini-player-video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #1e293b;
  }

  .mini-avatar.MuiAvatar-root {
    width: 48px;
    height: 48px;
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    font-size: 20px;
    font-weight: 700;
  }

  .mini-controls {
    position: absolute;
    right: 0;
    bottom: 6px;
    left: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .mini-btn.MuiIconButton-root {
    width: 28px;
    height: 28px;
    background: #ffffff;
    color: #0f172a;

    .MuiSvgIcon-root {
      font-size: 16px;
    }

    &:hover {
      opacity: 0.9;
    }
  }

  .mini-btn.is-sharing.MuiIconButton-root {
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: #ffffff;
  }

  .mini-btn.is-off.MuiIconButton-root,
  .mini-btn.end-call.MuiIconButton-root {
    background: ${({ theme }) => theme.palette.customColors.error};
    color: #ffffff;
  }

  .mini-btn.end-call.MuiIconButton-root:hover {
    filter: brightness(0.94);
  }
`;
