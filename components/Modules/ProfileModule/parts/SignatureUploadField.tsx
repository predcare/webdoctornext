'use client';

import CustomRadioGroup from '@/components/ui/CustomRadio/CustomRadio';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import { Box, Button, Typography } from '@mui/material';

type SignatureUploadFieldProps = {
  name: string;
  title: string;
  description: string;
  hint: string;
};

export default function SignatureUploadField({
  name,
  title,
  description,
  hint,
}: SignatureUploadFieldProps) {
  return (
    <Box className="signature-block">
      <Box>
        <Typography component="h3" className="block-title">
          <DrawOutlinedIcon />
          {title}
        </Typography>
        <Typography component="p" className="block-copy">
          {description}
        </Typography>
      </Box>
      <CustomRadioGroup
        name={name}
        ariaLabel={title}
        variant="segmented"
        defaultValue="upload"
        options={[
          { value: 'upload', label: 'Upload Signature', icon: <CloudUploadOutlinedIcon /> },
          { value: 'none', label: 'No Signature Required' },
        ]}
      />
      <Typography component="p" className="field-hint">
        {hint}
      </Typography>
      <Box className="signature-dropzone">
        <span className="drop-icon">
          <CloudUploadOutlinedIcon />
        </span>
        <Typography component="p" className="drop-title">
          No signature uploaded
        </Typography>
        <Button type="button" className="select-file-btn" variant="outlined" component="label">
          Select File
          <input hidden type="file" name={`${name}-file`} accept="image/jpeg,image/png,image/gif" />
        </Button>
      </Box>
      <Typography component="p" className="signature-none-note field-hint">
        No signature will be printed on the PDF.
      </Typography>
    </Box>
  );
}
