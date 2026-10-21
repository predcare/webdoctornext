'use client';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SyncIcon from '@mui/icons-material/Sync';
import { Box, Button, Typography } from '@mui/material';

type ConsultationActionsBarProps = {
  id?: string;
  status?: string;
  autoSaveStatus: 'idle' | 'typing' | 'saving' | 'saved' | 'error';
  lastSavedAt: string | null;
  emailSentAt?: string | null;
  onSendPrescription: () => void;
  onPrintSummary: () => void;
  onCompleteConsultation: () => void;
  isSendingEmail?: boolean;
  isCompleting?: boolean;
};

export default function ConsultationActionsBar({
  id,
  status = 'draft',
  autoSaveStatus,
  lastSavedAt,
  emailSentAt,
  onSendPrescription,
  onPrintSummary,
  onCompleteConsultation,
  isSendingEmail = false,
  isCompleting = false,
}: ConsultationActionsBarProps) {
  const getAutoSaveText = () => {
    switch (autoSaveStatus) {
      case 'saving':
        return 'Saving draft...';
      case 'saved':
        return `Draft saved at ${lastSavedAt || 'just now'}`;
      case 'error':
        return 'Failed to auto-save draft';
      case 'typing':
        return 'Unsaved changes...';
      default:
        return lastSavedAt ? `Saved at ${lastSavedAt}` : 'Draft autosave active';
    }
  };

  const isCompleted = status === 'completed';

  return (
    <Box id={id} className="actions-bar">
      <Box className="status-copy">
        <Typography component="p" className="status-pdf">
          {autoSaveStatus === 'saving' ? (
            <SyncIcon
              sx={{
                animation: 'spin 1.5s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            />
          ) : (
            <PictureAsPdfOutlinedIcon />
          )}
          {getAutoSaveText()}
        </Typography>
        <Box className="status-meta">
          <Typography component="p" className="status-line">
            Status:{' '}
            <strong
              style={{
                textTransform: 'capitalize',
                color: isCompleted ? '#059669' : '#0284c7',
              }}
            >
              {status || 'Draft'}
            </strong>
          </Typography>
          <Typography component="p" className="status-line">
            Sent to patient:{' '}
            <strong>{emailSentAt ? `Yes (${emailSentAt})` : 'Not yet'}</strong>
          </Typography>
        </Box>
      </Box>

      <Box className="actions-group">
        <Button
          type="button"
          className="action-btn"
          variant="outlined"
          disableElevation
          disabled={isSendingEmail || isCompleting}
          startIcon={
            isSendingEmail ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <SendOutlinedIcon fontSize="small" />
            )
          }
          onClick={onSendPrescription}
        >
          {isSendingEmail ? 'Sending...' : 'Send Prescription'}
        </Button>
        <Button
          type="button"
          className="action-btn"
          variant="outlined"
          disableElevation
          startIcon={<PrintOutlinedIcon fontSize="small" />}
          onClick={onPrintSummary}
        >
          Print / PDF
        </Button>
        <Button
          type="button"
          className="action-btn"
          variant="contained"
          disableElevation
          disabled={isCompleting || isSendingEmail}
          startIcon={
            isCompleting ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <CheckCircleOutlinedIcon fontSize="small" />
            )
          }
          onClick={onCompleteConsultation}
        >
          {isCompleting ? 'Completing...' : 'Complete Consultation'}
        </Button>
      </Box>
    </Box>
  );
}
