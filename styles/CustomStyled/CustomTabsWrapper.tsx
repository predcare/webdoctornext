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