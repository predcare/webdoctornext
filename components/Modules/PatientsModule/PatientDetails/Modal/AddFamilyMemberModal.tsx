'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomModal from '@/components/ui/CustomModal/CustomModal';
import { AddFamilyMemberModalWrapper } from '@/styles/CustomStyled/AddFamilyMemberModalWrapper';
import CheckIcon from '@mui/icons-material/Check';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import { Box, Button, Grid, MenuItem, Typography } from '@mui/material';
import { memo } from 'react';

const relationOptions = ['Father', 'Mother', 'Spouse', 'Son', 'Daughter', 'Brother', 'Sister', 'Other'];
const genderOptions = ['Male', 'Female', 'Other'];

const halfSize = { xs: 12, sm: 6 };

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

type AddFamilyMemberModalProps = {
  open: boolean;
  onClose?: () => void;
};

function AddFamilyMemberModal({ open, onClose }: AddFamilyMemberModalProps) {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      className="familyMemberModal"
      heading="Add Family Member"
      subheading="Link a relative to this patient"
      headerIcon={<FamilyRestroomOutlinedIcon />}

    >
      <AddFamilyMemberModalWrapper>
        <Grid container spacing={2.5}>
          <Grid size={12} className="is-required">
            <CustomInput name="fullName" inputLabelName="Full Name" placeholder="Full name" />
          </Grid>
          <Grid size={halfSize} className="is-required">
            <CustomInput
              select
              name="relation"
              inputLabelName="Relation"
              defaultValue=""
              slotProps={selectSlotProps('Select relation')}
            >
              {relationOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </CustomInput>
          </Grid>
          <Grid size={halfSize} className="is-required">
            <CustomInput
              select
              name="gender"
              inputLabelName="Gender"
              defaultValue=""
              slotProps={selectSlotProps('Select gender')}
            >
              {genderOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </CustomInput>
          </Grid>
          <Grid size={halfSize}>
            <CustomInput name="dob" type="date" inputLabelName="Date of Birth" />
          </Grid>
          <Grid size={halfSize}>
            <CustomInput name="phone" type="tel" inputLabelName="Phone" placeholder="Phone number" />
          </Grid>
          <Grid size={12}>
            <CustomInput
              name="email"
              type="email"
              inputLabelName="Email"
              placeholder="example@email.com"
            />
          </Grid>
        </Grid>

        <Box className="modal-footer">
          <Button className="footer-btn" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="footer-btn"
            variant="contained"
            disableElevation
            startIcon={<CheckIcon fontSize="small" />}
            onClick={onClose}
          >
            Save
          </Button>
        </Box>
      </AddFamilyMemberModalWrapper>
    </CustomModal>
  );
}

export default memo(AddFamilyMemberModal);
