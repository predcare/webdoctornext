'use client';

import CustomModal from '@/components/ui/CustomModal/CustomModal';
import { Box, styled } from '@mui/material';

export const CustomCalendarModalStyled = styled(CustomModal)`
  && .MuiDialog-paper {
    width: 100%;
    max-width: 380px;
    height: auto;
    margin: 20px auto;
  }

  && .MuiDialogContent-root {
    padding: 12px 16px 16px;
  }
`;

export const CustomCalendarModalWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .MuiDateCalendar-root {
    width: 100%;
    max-width: 340px;
    height: auto;
    max-height: none;
    margin: 0 auto;
  }

  .MuiPickersCalendarHeader-root {
    padding-left: 12px;
    padding-right: 4px;
  }

  .MuiPickersCalendarHeader-label {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .MuiPickersArrowSwitcher-button {
    color: ${({ theme }) => theme.palette.customColors.heading};

    &.Mui-disabled {
      color: ${({ theme }) => theme.palette.customColors.textMuted};
      opacity: 0.4;
    }
  }

  .MuiDayCalendar-weekDayLabel {
    font-size: 11px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .MuiPickerDay-root {
    position: relative;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.heading};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }

    &.Mui-disabled:not(.Mui-selected) {
      font-weight: 400;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
      opacity: 0.55;
    }

    &.MuiPickerDay-today:not(.Mui-selected) {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    &.Mui-selected,
    &.Mui-selected:hover,
    &.Mui-selected:focus {
      color: ${({ theme }) => theme.palette.common.white};
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    &.is-available::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      transform: translateX(-50%);
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    &.is-available.Mui-selected::after {
      background: ${({ theme }) => theme.palette.common.white};
    }
  }

  .calendar-legend {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-size: 12px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};

    span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .legend-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${({ theme }) => theme.palette.customColors.brandTeal};

      &.muted {
        background: ${({ theme }) => theme.palette.customColors.border};
      }
    }
  }

  .calendar-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;

    .MuiButton-root {
      text-transform: none;
      font-weight: 700;
      border-radius: 8px;
    }
  }
`;
