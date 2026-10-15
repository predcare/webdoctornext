'use client';

import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Button } from '@mui/material';

type FormActionsProps = {
  saveLabel: string;
  addLabel?: string;
  showCancel?: boolean;
  showCheck?: boolean;
};

export default function FormActions({
  saveLabel,
  addLabel,
  showCancel = false,
  showCheck = false,
}: FormActionsProps) {
  return (
    <Box className={addLabel ? 'form-actions' : 'form-actions is-end'}>
      {addLabel ? (
        <Button
          type="button"
          className="add-btn"
          variant="outlined"
          startIcon={<AddIcon />}
        >
          {addLabel}
        </Button>
      ) : null}
      <Box className="form-actions-end">
        {showCancel ? (
          <Button type="button" className="cancel-btn">
            Cancel
          </Button>
        ) : null}
        <Button
          type="button"
          className="save-btn"
          variant="contained"
          disableElevation
          startIcon={showCheck ? <CheckIcon /> : undefined}
        >
          {saveLabel}
        </Button>
      </Box>
    </Box>
  );
}
