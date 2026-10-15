import { Typography } from '@mui/material';

export const selectSlotProps = (
  placeholder: string,
  getLabel: (value: string) => string = (value) => value,
) => ({
  select: {
    displayEmpty: true,
    renderValue: (value: unknown) =>
      value ? (
        getLabel(String(value))
      ) : (
        <Typography component="span" className="select-placeholder">
          {placeholder}
        </Typography>
      ),
  },
});
