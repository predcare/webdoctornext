'use client';

import { StatusChipWrapper } from '@/styles/CustomStyled/StatusChipWrapper';
import { memo } from 'react';

type StatusChipProps = {
  status: 'Active' | 'Inactive';
};

function StatusChip({ status }: StatusChipProps) {
  return <StatusChipWrapper className={status.toLowerCase()}>{status}</StatusChipWrapper>;
}

export default memo(StatusChip);
