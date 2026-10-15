'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { Box, MenuItem, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import BannerModeField from '../parts/BannerModeField';
import FormActions from '../parts/FormActions';
import SignatureUploadField from '../parts/SignatureUploadField';

const preventSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

const gstOptions = [
  { value: 'none', label: 'None (No GST)' },
  { value: 'gst-5', label: 'GST 5%' },
  { value: 'gst-12', label: 'GST 12%' },
  { value: 'gst-18', label: 'GST 18%' },
];

export default function InvoiceSettingsSection() {
  return (
    <Box component="form" className="form-card" noValidate onSubmit={preventSubmit}>
      <BannerModeField
        name="invoice-header"
        title="Invoice Header"
        defaultNote="The default invoice banner (clinic name, address, contact info, invoice number strip) will be used."
      />
      <BannerModeField
        name="invoice-footer"
        title="Invoice Footer"
        defaultNote="The default footer (terms, signature line, bottom band) will be used."
      />
      <Box>
        <Box className="label-row">
          <Typography component="p" className="field-label">
            Terms & Conditions
          </Typography>
          <span className="optional-pill">Optional</span>
        </Box>
        <CustomInput
          multiline
          minRows={3}
          name="invoiceTerms"
          placeholder="Enter any terms or conditions you want printed on the invoice..."
        />
      </Box>
      <SignatureUploadField
        name="invoice-signature"
        title="Authorized Signature"
        description="Choose how the signature area appears on every invoice PDF."
        hint="JPEG, PNG, GIF — max 2 MB. Use a transparent PNG for best results. Recommended size 240 × 90 px — the signature is displayed at max 160 × 52 px on the PDF."
      />
      <Box>
        <Box className="label-row">
          <Typography component="p" className="field-label">
            <ReceiptLongOutlinedIcon />
            Default GST Type
          </Typography>
        </Box>
        <Typography component="p" className="block-copy">
          Applied by default when creating new invoices.
        </Typography>
        <CustomInput select name="gstType" defaultValue="none">
          {gstOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CustomInput>
      </Box>
      <FormActions saveLabel="Save Settings" showCheck />
    </Box>
  );
}
