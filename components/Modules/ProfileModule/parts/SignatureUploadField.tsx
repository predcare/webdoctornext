'use client';

import CustomRadioGroup from '@/components/ui/CustomRadio/CustomRadio';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type SignatureUploadFieldProps = {
  name: string;
  title: string;
  description: string;
  hint: string;
  modeValue?: string;
  onModeChange?: (mode: string) => void;
  file?: File | null;
  onFileChange?: (file: File | null) => void;
  existingImageUrl?: string | null;
};

export default function SignatureUploadField({
  name,
  title,
  description,
  hint,
  modeValue,
  onModeChange,
  file,
  onFileChange,
  existingImageUrl,
}: SignatureUploadFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [file]);

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
        value={modeValue}
        defaultValue="upload"
        onChange={onModeChange}
        options={[
          {
            value: 'upload',
            label: 'Upload Signature',
            icon: <CloudUploadOutlinedIcon />,
          },
          { value: 'none', label: 'No Signature Required' },
        ]}
      />
      <Typography component="p" className="field-hint">
        {hint}
      </Typography>
      <Box className="signature-dropzone">
        {previewUrl || existingImageUrl ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box
              component="img"
              src={previewUrl || existingImageUrl!}
              alt="Signature preview"
              sx={{
                maxHeight: 60,
                maxWidth: 200,
                objectFit: 'contain',
                borderRadius: '4px',
                border: '1px solid #e2e8f0',
                p: 0.5,
                bgcolor: '#fff',
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {file ? file.name : 'Current signature on file'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                type="button"
                className="select-file-btn"
                variant="outlined"
                size="small"
                component="label"
              >
                Change File
                <input
                  hidden
                  type="file"
                  name={`${name}-file`}
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => onFileChange?.(e.target.files?.[0] || null)}
                />
              </Button>
              {previewUrl && (
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onFileChange?.(null)}
                >
                  Remove
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          <>
            <span className="drop-icon">
              <CloudUploadOutlinedIcon />
            </span>
            <Typography component="p" className="drop-title">
              No signature uploaded
            </Typography>
            <Button
              type="button"
              className="select-file-btn"
              variant="outlined"
              component="label"
            >
              Select File
              <input
                hidden
                type="file"
                name={`${name}-file`}
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => onFileChange?.(e.target.files?.[0] || null)}
              />
            </Button>
          </>
        )}
      </Box>
      <Typography component="p" className="signature-none-note field-hint">
        No signature will be printed on the PDF.
      </Typography>
    </Box>
  );
}
