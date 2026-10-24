'use client';

import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, CircularProgress } from '@mui/material';

type FormActionsProps = {
  saveLabel: string;
  addLabel?: string;
  showCancel?: boolean;
  showCheck?: boolean;
  type?: 'button' | 'submit';
  loading?: boolean;
  disabled?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
};

export default function FormActions({
  saveLabel,
  addLabel,
  showCancel = false,
  showCheck = false,
  type = 'submit',
  loading = false,
  disabled = false,
  onSave,
  onCancel,
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
          <Button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button
          type={type}
          className="save-btn"
          variant="contained"
          disableElevation
          disabled={disabled || loading}
          onClick={type === 'button' ? onSave : undefined}
          startIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : showCheck ? (
              <CheckIcon />
            ) : undefined
          }
        >
          {loading ? 'Saving...' : saveLabel}
        </Button>
      </Box>
    </Box>
  );
}
