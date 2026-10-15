import { Box, styled } from '@mui/material';

export const NotFoundWrapper = styled(Box)`
  width: 100%;
  animation: notFoundIn 0.3s ease-out;

  .not-found-card {
    position: relative;
    overflow: hidden;
    text-align: center;
    border-radius: 24px;
    background-color: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.cardBorder};
  }

  .glow {
    position: absolute;
    top: -60px;
    right: -60px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.customColors.brandTealLight};
    filter: blur(40px);
    pointer-events: none;
  }

  .chip-row {
    display: flex;
    justify-content: center;
  }

  .status-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    line-height: 1.4;
    text-transform: uppercase;
  }

  .status-chip svg {
    flex-shrink: 0;
  }

  .code {
    margin: 0;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
    user-select: none;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .title {
    margin: 0;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .copy {
    margin: 0 auto;
    color: ${({ theme }) => theme.palette.text.secondary};
    line-height: 1.6;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  && .primary-btn.MuiButton-root,
  && .secondary-btn.MuiButton-root,
  && .ghost-btn.MuiButton-root,
  && .shortcut-btn.MuiButton-root {
    text-transform: none;
    font-weight: 600;
    box-shadow: none;
  }

  && .primary-btn.MuiButton-root {
    color: #ffffff;
    border-radius: 12px;
    padding: 10px 28px;
    font-size: 0.95rem;
  }

  && .primary-btn.MuiButton-root svg,
  && .secondary-btn.MuiButton-root svg,
  && .ghost-btn.MuiButton-root svg,
  && .shortcut-btn.MuiButton-root svg {
    display: block;
  }

  && .secondary-btn.MuiButton-root {
    border-radius: 12px;
    padding: 10px 28px;
    font-size: 0.95rem;
    border-color: ${({ theme }) => theme.palette.customColors.border};
    color: ${({ theme }) => theme.palette.text.primary};
    background-color: transparent;
  }

  && .secondary-btn.MuiButton-root:hover {
    border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background-color: ${({ theme }) => theme.palette.customColors.hoverBg};
  }

  && .ghost-btn.MuiButton-root {
    background: transparent;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-weight: 500;
    font-size: 0.9rem;
  }

  && .ghost-btn.MuiButton-root:hover {
    background: transparent;
  }

  .section-label {
    display: block;
    margin: 0 0 20px;
    color: ${({ theme }) => theme.palette.text.disabled};
    font-weight: 600;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-align: center;
  }

  .shortcut-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  && .shortcut-btn.MuiButton-root {
    width: 100%;
    justify-content: flex-start;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 0.9rem;
    border-color: ${({ theme }) => theme.palette.customColors.border};
    color: ${({ theme }) => theme.palette.text.primary};
  }

  && .shortcut-btn.MuiButton-root svg {
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  && .shortcut-btn.MuiButton-root:hover {
    border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background-color: ${({ theme }) => theme.palette.customColors.hoverBg};
  }

  .icon-badge {
    width: 72px;
    height: 72px;
    margin: 0 auto 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .feature-card {
    display: block;
    height: 100%;
    padding: 28px;
    text-decoration: none;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.cardBorder};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease,
      border-color 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.palette.customColors.authLinkHover};
    box-shadow: 0 12px 24px -4px rgba(37, 99, 235, 0.12);
  }

  .feature-icon {
    width: 52px;
    height: 52px;
    margin-bottom: 16px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feature-title {
    margin: 0 0 8px;
    font-size: 1.15rem;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .feature-copy {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  &.dashboard {
    max-width: 900px;
    margin: 0 auto;
    padding: 32px 16px;
  }

  &.dashboard .not-found-card {
    padding: 24px;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05);
  }

  &.dashboard .status-chip {
    margin-bottom: 24px;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background-color: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  &.dashboard .code {
    margin-bottom: 12px;
    font-size: 5rem;
    background-image: linear-gradient(
      135deg,
      ${({ theme }) => theme.palette.customColors.brandTeal} 0%,
      ${({ theme }) => theme.palette.customColors.authAccentEnd} 100%
    );
  }

  &.dashboard .title {
    margin-bottom: 12px;
    font-size: 1.5rem;
  }

  &.dashboard .copy {
    max-width: 540px;
    margin-bottom: 32px;
    font-size: 0.95rem;
  }

  &.dashboard .actions {
    margin-bottom: 40px;
  }

  &.dashboard .primary-btn.MuiButton-root {
    background-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    box-shadow: 0 4px 14px 0
      ${({ theme }) => theme.palette.customColors.brandTealGlow};
  }

  &.dashboard .primary-btn.MuiButton-root:hover {
    background-color: ${({ theme }) => theme.palette.customColors.brandTealDark};
  }

  &.dashboard .shortcuts {
    padding-top: 32px;
    border-top: 1px dashed ${({ theme }) => theme.palette.customColors.border};
  }

  &.auth .not-found-card {
    padding: 24px;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  }

  &.auth .icon-badge {
    color: ${({ theme }) => theme.palette.customColors.authAccentEnd};
    background-color: ${({ theme }) => theme.palette.customColors.authTabTrack};
  }

  &.auth .status-chip {
    margin-bottom: 16px;
    color: ${({ theme }) => theme.palette.customColors.authAccentEnd};
    background-color: color-mix(
      in srgb,
      ${({ theme }) => theme.palette.customColors.authAccentEnd} 10%,
      transparent
    );
  }

  &.auth .title {
    margin-bottom: 12px;
    font-size: 1.5rem;
  }

  &.auth .copy {
    max-width: 380px;
    margin-bottom: 32px;
    font-size: 0.95rem;
  }

  &.auth .actions {
    align-items: stretch;
    margin-bottom: 8px;
  }

  &.auth .primary-btn.MuiButton-root,
  &.auth .secondary-btn.MuiButton-root {
    width: 100%;
    padding: 12px 16px;
    border-radius: 14px;
    font-size: 1rem;
  }

  &.auth .primary-btn.MuiButton-root {
    background-color: ${({ theme }) => theme.palette.customColors.authAccentEnd};
    box-shadow: 0 10px 15px -3px
      color-mix(
        in srgb,
        ${({ theme }) => theme.palette.customColors.authAccentEnd} 30%,
        transparent
      );
  }

  &.auth .primary-btn.MuiButton-root:hover {
    background-color: ${({ theme }) => theme.palette.customColors.authAccentHoverEnd};
  }

  &.auth .secondary-btn.MuiButton-root:hover {
    border-color: ${({ theme }) => theme.palette.customColors.authAccentEnd};
    background-color: color-mix(
      in srgb,
      ${({ theme }) => theme.palette.customColors.authAccentEnd} 4%,
      transparent
    );
  }

  &.auth .ghost-btn.MuiButton-root:hover {
    color: ${({ theme }) => theme.palette.customColors.authAccentEnd};
  }

  &.cms {
    position: relative;
    overflow: hidden;
    padding: 112px 0;
    background-color: ${({ theme }) => theme.palette.customColors.pageBg};
  }

  &.cms .cms-inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &.cms .centerpiece {
    margin-bottom: 48px;
    text-align: center;
  }

  &.cms .status-chip {
    margin-bottom: 20px;
    padding: 6px 18px;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.palette.customColors.authAccentEnd};
    background-color: color-mix(
      in srgb,
      ${({ theme }) => theme.palette.customColors.authAccentEnd} 8%,
      ${({ theme }) => theme.palette.customColors.cardBg}
    );
    border: 1px solid
      color-mix(
        in srgb,
        ${({ theme }) => theme.palette.customColors.authAccentEnd} 20%,
        transparent
      );
  }

  &.cms .code {
    margin-bottom: 16px;
    font-size: 5.5rem;
    font-weight: 900;
    background-image: linear-gradient(
      135deg,
      ${({ theme }) => theme.palette.customColors.brandDarkest} 0%,
      ${({ theme }) => theme.palette.customColors.authAccentEnd} 50%,
      ${({ theme }) => theme.palette.customColors.authLinkHover} 100%
    );
  }

  &.cms .title {
    margin-bottom: 16px;
    font-size: 1.75rem;
  }

  &.cms .copy {
    max-width: 620px;
    margin-bottom: 40px;
    font-size: 1.05rem;
  }

  &.cms .primary-btn.MuiButton-root,
  &.cms .secondary-btn.MuiButton-root,
  &.cms .ghost-btn.MuiButton-root {
    border-radius: 50px;
    padding: 12px 28px;
    font-size: 1rem;
  }

  &.cms .primary-btn.MuiButton-root {
    padding-left: 32px;
    padding-right: 32px;
    background-color: ${({ theme }) => theme.palette.customColors.authAccentEnd};
    box-shadow: 0 10px 20px -3px
      color-mix(
        in srgb,
        ${({ theme }) => theme.palette.customColors.authAccentEnd} 35%,
        transparent
      );
  }

  &.cms .primary-btn.MuiButton-root:hover {
    background-color: ${({ theme }) => theme.palette.customColors.authAccentHoverEnd};
    transform: translateY(-2px);
  }

  &.cms .secondary-btn.MuiButton-root:hover {
    color: ${({ theme }) => theme.palette.customColors.authAccentEnd};
    border-color: ${({ theme }) => theme.palette.customColors.authAccentEnd};
    background-color: color-mix(
      in srgb,
      ${({ theme }) => theme.palette.customColors.authAccentEnd} 8%,
      ${({ theme }) => theme.palette.customColors.cardBg}
    );
  }

  &.cms .ghost-btn.MuiButton-root:hover {
    color: ${({ theme }) => theme.palette.customColors.authAccentEnd};
  }

  &.cms .destinations {
    margin-top: 48px;
  }

  &.cms .section-label {
    margin-bottom: 24px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  &.cms .feature-icon {
    color: ${({ theme }) => theme.palette.customColors.authAccentEnd};
    background-color: color-mix(
      in srgb,
      ${({ theme }) => theme.palette.customColors.authAccentEnd} 8%,
      ${({ theme }) => theme.palette.customColors.cardBg}
    );
  }

  @media (min-width: 600px) {
    &.dashboard .not-found-card,
    &.auth .not-found-card {
      padding: 40px;
    }

    &.dashboard .code {
      font-size: 7rem;
    }

    &.dashboard .title {
      font-size: 2rem;
    }

    &.dashboard .copy {
      font-size: 1.05rem;
    }

    &.dashboard .actions,
    &.cms .actions {
      flex-direction: row;
    }

    &.auth .title {
      font-size: 1.75rem;
    }

    &.cms .code {
      font-size: 8rem;
    }

    &.cms .title {
      font-size: 2.5rem;
    }

    .shortcut-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 900px) {
    &.dashboard {
      padding: 64px 24px;
    }

    &.dashboard .not-found-card {
      padding: 48px;
    }

    &.dashboard .code {
      font-size: 8.5rem;
    }

    &.cms {
      padding: 144px 0;
    }

    &.cms .centerpiece {
      margin-bottom: 64px;
    }

    &.cms .code {
      font-size: 10rem;
    }

    &.cms .copy {
      font-size: 1.2rem;
    }

    &.cms .destinations {
      margin-top: 64px;
    }

    .feature-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @keyframes notFoundIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
