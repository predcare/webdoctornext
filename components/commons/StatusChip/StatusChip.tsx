'use client';

import { StatusChipWrapper } from '@/styles/CustomStyled/StatusChipWrapper';
import { memo } from 'react';

type StatusChipProps = {
  status: "active" | "inactive" | "pending" | "rejected" | "suspended" | "unverified" | string;
};

function StatusChip({ status }: StatusChipProps) {
  return <StatusChipWrapper className={status.toLowerCase()}>{status}</StatusChipWrapper>;
}

export default memo(StatusChip);
