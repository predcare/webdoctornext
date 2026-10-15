'use client';

import { Box, styled } from '@mui/material';

export const AddFamilyMemberModalWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .is-required .inputLabel-txt-global::after {
    content: '*';
    margin-left: 2px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.error};
  }

  .select-placeholder {
    font-size: 13px;
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
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 20px;

    .modal-footer {
      flex-direction: column-reverse;
      align-items: stretch;
    }

    .footer-btn.MuiButton-root {
      width: 100%;
    }
  }
`;
