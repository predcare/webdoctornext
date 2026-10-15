import type { PrescriptionWorkspaceStatus } from '@/resources/mock';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Button, Typography } from '@mui/material';

type ConsultationActionsBarProps = {
  id?: string;
  status: PrescriptionWorkspaceStatus;
};

export default function ConsultationActionsBar({
  id,
  status,
}: ConsultationActionsBarProps) {
  return (
    <Box id={id} className="actions-bar">
      <Box className="status-copy">
        <Typography component="p" className="status-pdf">
          <PictureAsPdfOutlinedIcon />
          {status.pdf}
        </Typography>
        <Box className="status-meta">
          <Typography component="p" className="status-line">
            Status: <strong>{status.status}</strong>
          </Typography>
          <Typography component="p" className="status-line">
            Sent to customer: <strong>{status.sent}</strong>
          </Typography>
        </Box>
      </Box>

      <Box className="actions-group">
        <Button
          type="button"
          className="action-btn"
          variant="outlined"
          disableElevation
          startIcon={<SaveOutlinedIcon fontSize="small" />}
        >
          Send Prescription
        </Button>
        <Button
          type="button"
          className="action-btn"
          variant="outlined"
          disableElevation
          startIcon={<PrintOutlinedIcon fontSize="small" />}
        >
          Print Summary
        </Button>
        <Button
          type="button"
          className="action-btn"
          variant="contained"
          disableElevation
          startIcon={<CheckCircleOutlinedIcon fontSize="small" />}
        >
          Complete Consultation
        </Button>
      </Box>
    </Box>
  );
}
