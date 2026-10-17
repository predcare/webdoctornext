'use client';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Box, Typography } from '@mui/material';
import { IChoiceOption } from '../contants/bookAppointment.constants';

type ChoiceCardGridProps<T extends string> = {
  options: IChoiceOption<T>[];
  value: T;
  onChange: (value: T) => void;
  columns?: 2 | 3;
  disabled?: boolean;
  ariaLabel: string;
};

export default function ChoiceCardGrid<T extends string>({
  options,
  value,
  onChange,
  columns = 2,
  disabled = false,
  ariaLabel,
}: ChoiceCardGridProps<T>) {
  return (
    <Box
      className={columns === 3 ? 'choice-grid three' : 'choice-grid'}
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((item) => {
        const isActive = item.id === value;
        return (
          <Box
            key={item.id}
            component="button"
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={disabled}
            onClick={() => onChange(item.id)}
            className={isActive ? 'choice-card active' : 'choice-card'}
          >
            <Box component="span" className="choice-icon">
              {item.icon}
            </Box>
            <Box component="span" className="choice-copy">
              <Typography component="span" className="choice-label">
                {item.label}
              </Typography>
              <Typography component="span" className="choice-hint">
                {item.hint}
              </Typography>
            </Box>
            {isActive ? <CheckRoundedIcon className="choice-check" /> : null}
          </Box>
        );
      })}
    </Box>
  );
}
