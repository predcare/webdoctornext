'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomModal from '@/components/ui/CustomModal/CustomModal';
import { UploadMedicalRecordModalWrapper } from '@/styles/CustomStyled/UploadMedicalRecordModalWrapper';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Button, Grid, MenuItem, Switch, Typography } from '@mui/material';
import { memo } from 'react';

const categoryOptions = [
  'ECG Report',
  'MRI Scan',
  'CT Scan',
  'X-Ray',
  'Blood Test',
  'Lab Report',
  'Prescription',
  'Other',
];

const selectSlotProps = (placeholder: string) => ({
  select: {
    displayEmpty: true,
    renderValue: (value: unknown) =>
      value ? (
        String(value)
      ) : (
        <Typography component="span" className="select-placeholder">
          {placeholder}
        </Typography>
      ),
  },
});

type UploadMedicalRecordModalProps = {
  open: boolean;
  onClose?: () => void;
};

function UploadMedicalRecordModal({
  open,
  onClose,
}: UploadMedicalRecordModalProps) {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      className="medicalRecordModal"
      heading="Upload Medical Record"
      subheading="Add a report, scan or document for this patient"
      headerIcon={<FolderOutlinedIcon />}
    >
      <UploadMedicalRecordModalWrapper>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }} className="is-required">
            <CustomInput
              select
              name="category"
              inputLabelName="Document Category"
              defaultValue=""
              slotProps={selectSlotProps('Select category')}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </CustomInput>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} className="is-required">
            <CustomInput
              name="title"
              inputLabelName="Document Title"
              placeholder="Auto-filled from category, or enter manually"
            />
          </Grid>
          <Grid size={12}>
            <CustomInput
              multiline
              minRows={3}
              name="notes"
              inputLabelName="Notes / Description"
              placeholder="Add any relevant notes, observations, or important details about this document..."
              helperText="Optional · Max 1000 characters"
            />
          </Grid>
          <Grid size={12} className="is-required">
            <Typography component="p" className="field-label">
              Upload Document
            </Typography>
            <Box component="label" className="upload-zone">
              <input
                type="file"
                name="document"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <Box component="span" className="upload-icon">
                <CloudUploadOutlinedIcon />
              </Box>
              <Box className="upload-copy">
                <Typography component="p" className="upload-title">
                  Click to upload or drag and drop
                </Typography>
                <Typography component="p" className="upload-note">
                  No file chosen
                </Typography>
              </Box>
              <Box component="span" className="choose-btn">
                Choose File
              </Box>
            </Box>
            <Typography component="p" className="field-helper">
              Allowed formats: PDF, DOC, DOCX, JPG, PNG (Max: 10MB)
            </Typography>
          </Grid>
          <Grid size={12}>
            <Box className="visibility-box">
              <Switch
                defaultChecked
                size="small"
                slotProps={{ input: { 'aria-label': 'Show to patient' } }}
              />
              <Box className="visibility-copy">
                <Typography component="p" className="visibility-title">
                  <VisibilityOutlinedIcon />
                  Show to Patient
                </Typography>
                <Typography component="p" className="visibility-note">
                  Patient will be able to view this document in their portal
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box className="modal-footer">
          <Button
            className="footer-btn"
            variant="outlined"
            startIcon={<CloseIcon fontSize="small" />}
            onClick={onClose}
          >
            Clear
          </Button>
          <Button
            className="footer-btn"
            variant="contained"
            disableElevation
            startIcon={<FileUploadOutlinedIcon fontSize="small" />}
            onClick={onClose}
          >
            Upload Document
          </Button>
        </Box>
      </UploadMedicalRecordModalWrapper>
    </CustomModal>
  );
}

export default memo(UploadMedicalRecordModal);
