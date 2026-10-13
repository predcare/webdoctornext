import { Box, Tabs, styled } from '@mui/material';

export const CustomTabWrapper = styled(Tabs)`
  width: 100%;
  border-radius: 999px;
  padding: 6px;
  overflow-x: auto;

  @media (max-width: 599px) {
    padding: 4px;
  }

  &.catWiseTab {
    max-width: 800px;
    .MuiTabs-flexContainer {
      width: max-content;
      gap: 8px;
      ::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .MuiTabs-flexContainer {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .MuiTab-root {
    min-height: 48px;
    min-width: auto;
    /* max-width: auto; */
    padding: 6px 14px;
    border-radius: 999px;
    background: #ffffff;
    color: ${({ theme }) => theme.palette.common.black};
    font-weight: 500;
    font-size: 14px;
    text-transform: none;
    border: 1px solid #e3e3e4;
    font-family: 'Outfit';
    line-height: 120%;
    letter-spacing: 0%;
    transition: all 0.25s ease;

    display: flex;
    flex-direction: row;
    gap: 6px;

    &:hover {
      background: #dcdcdc;
    }

    @media (max-width: 599px) {
      padding: 4px 10px;
      font-size: 13px;
      min-height: 36px;
    }

    &.Mui-selected {
      background-color: ${({ theme }) => theme.palette.common.black};
      color: #fff;
    }

    &.Mui-selected:hover {
      background-color: ${({ theme }) => theme.palette.common.black};
    }

    p {
      font-size: inherit;
      font-weight: inherit;
    }
  }

  .MuiTabs-indicator {
    display: none;
  }

  .Mui-disabled {
    display: none;
  }

  &.segmented {
    border-radius: 8px;
    padding: 4px;
    overflow: hidden;
    background: ${({ theme }) => theme.palette.customColors.authTabTrack};
    min-height: 52px;

    .MuiTabs-scroller {
      overflow: visible !important;
    }

    .MuiTabs-flexContainer {
      gap: 0;
      position: relative;
      z-index: 1;
    }

    .MuiTabs-indicator {
      display: block;
      height: 100%;
      top: 0;
      bottom: auto;
      border-radius: 8px;
      z-index: 0;
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.palette.customColors.authAccentStart} 0%,
        ${({ theme }) => theme.palette.customColors.authAccentEnd} 100%
      );
      transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .MuiTab-root {
      min-height: 44px;
      max-width: none;
      padding: 8px 12px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: ${({ theme }) => theme.palette.text.secondary};
      font-family: var(--font-inter), 'Inter', sans-serif;
      font-size: 1.1rem;
      font-weight: 600;
      z-index: 1;

      &:hover {
        background: transparent;
      }

      @media (max-width: 599px) {
        min-height: 40px;
        padding: 8px 8px;
        font-size: 1rem;
      }

      &.Mui-selected {
        background: transparent;
        color: #ffffff;
      }

      &.Mui-selected:hover {
        background: transparent;
        color: #ffffff;
      }
    }
  }
`;

export const TabCountCircle = styled(Box)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #e3e3e4;
  display: flex;
  color: inherit;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
`;