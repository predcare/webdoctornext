'use client';

import CommonErrorText from '@/components/commons/CommonErrorText/CommonErrorText';
import { EMR_RECORD_CATEGORIES } from '@/components/Modules/PatientsModule/constants/patients.constants';
import { queryClient } from '@/components/Providers/ReactQueryProvider';
import CustomAutocomplete from '@/components/ui/CustomAutocomplete/CustomAutocomplete';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomModal from '@/components/ui/CustomModal/CustomModal';
import CustomSwitch from '@/components/ui/CustomSwitch/CustomSwitch';
import { useUploadEmr } from '@/hooks/react-query/patients/patients.hooks';
import { PatientsQueryKeys } from '@/hooks/react-query/query.keys';
import {
  EMR_ACCEPT,
  emrUploadSchema,
  type TEMRUploadFormValues,
} from '@/lib/schemas/emrUpload.schema';
import { UploadMedicalRecordModalWrapper } from '@/styles/CustomStyled/UploadMedicalRecordModalWrapper';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import {
  memo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

const defaultValues: TEMRUploadFormValues = {
  category: '',
  title: '',
  file: null,
  notes: '',
  shareWithPatient: true,
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

type UploadMedicalRecordModalProps = {
  open: boolean;
  patientId: string | number;
  onClose?: () => void;
  onUploadSuccess?: () => void;
};

function UploadMedicalRecordModal({
  open,
  patientId,
  onClose,
  onUploadSuccess,
}: UploadMedicalRecordModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const userData = useAuthStore((state) => state.userData);
  const { mutate: uploadEmr, isPending } = useUploadEmr();
  const { showLoader, hideLoader } = useLoadingStore((state) => state);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TEMRUploadFormValues>({
    resolver: yupResolver(emrUploadSchema),
    defaultValues,
  });

  const selectedFile = useWatch({ control, name: 'file' });
  const uploadZoneClassName = [
    'upload-zone',
    isDragging ? 'is-dragging' : '',
    errors.file ? 'has-error' : '',
    selectedFile ? 'has-file' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const selectFile = (file?: File | null) => {
    if (!file) return;
    setValue('file', file, { shouldValidate: true });
  };

  const removeFile = () => {
    setValue('file', null, { shouldValidate: true });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectFile(event.target.files?.[0]);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  };

  const handleClear = () => {
    reset(defaultValues);
    setIsDragging(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClose = () => {
    if (isPending) return;
    handleClear();
    onClose?.();
  };

  const onSubmit = (data: TEMRUploadFormValues) => {
    const formData = new FormData();
    if (data.file) formData.append('file', data.file);
    formData.append('title', data.title.trim());
    formData.append('document_type', data.category);
    formData.append('description', (data.notes || '').trim());
    formData.append('patient_id', String(patientId));
    if (userData?.id) formData.append('doctor_id', String(userData.id));
    formData.append(
      'visible_to_patient',
      data.shareWithPatient ? 'true' : 'false',
    );
    formData.append('created_from', 'web');
    showLoader('Uploading document...');
    uploadEmr(formData, {
      onSuccess: async (res) => {
        if (!res?.success) return;
        await queryClient.invalidateQueries({
          queryKey: [PatientsQueryKeys.EmrRecords],
        });
        handleClear();
        onUploadSuccess?.();
        hideLoader();
        onClose?.();
      },
      onError: () => {
        hideLoader();
      },
    });
  };

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      className="medicalRecordModal"
      heading="Upload Medical Record"
      subheading="Add a report, scan or document for this patient"
      headerIcon={<FolderOutlinedIcon />}
    >
      <UploadMedicalRecordModalWrapper>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }} className="is-required">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <CustomAutocomplete<string>
                  name={field.name}
                  inputLabelName="Document Category"
                  placeholder="Select category"
                  options={EMR_RECORD_CATEGORIES}
                  value={field.value || null}
                  getOptionLabel={(option) => option}
                  noOptionsText="No categories found"
                  onChange={(next) => {
                    field.onChange(next ?? '');
                    setValue('title', next ?? '', { shouldValidate: !!next });
                  }}
                />
              )}
            />
            <CommonErrorText message={errors.category?.message || ''} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} className="is-required">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  inputLabelName="Document Title"
                  placeholder="Auto-filled from category, or enter manually"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  value={field.value || ''}
                  multiline
                  minRows={3}
                  inputLabelName="Notes / Description (Optional)"
                  placeholder="Add any relevant notes, observations, or important details about this document..."
                  error={!!errors.notes}
                  helperText={
                    errors.notes?.message || 'Optional · Max 1000 characters'
                  }
                />
              )}
            />
          </Grid>
          <Grid size={12} className="is-required">
            <Typography component="p" className="field-label">
              Upload Document
            </Typography>
            {selectedFile ? (
              <Box className="selected-file">
                <Box component="span" className="selected-file-icon">
                  <InsertDriveFileOutlinedIcon />
                </Box>
                <Box className="selected-file-copy">
                  <Typography
                    component="p"
                    className="selected-file-name"
                    title={selectedFile.name}
                  >
                    {selectedFile.name}
                  </Typography>
                  <Typography component="p" className="selected-file-size">
                    {formatFileSize(selectedFile.size)}
                  </Typography>
                </Box>
                <IconButton
                  className="selected-file-remove"
                  size="small"
                  aria-label="Remove selected file"
                  onClick={removeFile}
                  disabled={isPending}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <Box
                component="label"
                className={uploadZoneClassName}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  name="file"
                  accept={EMR_ACCEPT}
                  onChange={handleFileChange}
                />
                <Box component="span" className="upload-icon">
                  <CloudUploadOutlinedIcon />
                </Box>
                <Box className="upload-copy">
                  <Typography component="p" className="upload-title">
                    {isDragging
                      ? 'Drop the file here'
                      : 'Click to upload or drag and drop'}
                  </Typography>
                  <Typography component="p" className="upload-note">
                    No file chosen
                  </Typography>
                </Box>
                <Box component="span" className="choose-btn">
                  Choose File
                </Box>
              </Box>
            )}
            {errors.file ? (
              <Typography component="p" className="field-error">
                {errors.file.message}
              </Typography>
            ) : (
              <Typography component="p" className="field-helper">
                Allowed formats: PDF, DOC, DOCX, JPG, PNG (Max: 10MB)
              </Typography>
            )}
          </Grid>
          <Grid size={12}>
            <Controller
              name="shareWithPatient"
              control={control}
              render={({ field }) => (
                <Box className="visibility-box">
                  <CustomSwitch
                    size="small"
                    checked={field.value}
                    onChange={field.onChange}
                    ariaLabel="Show to patient"
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
              )}
            />
          </Grid>
        </Grid>

        <Box className="modal-footer">
          <Button
            className="footer-btn"
            variant="outlined"
            startIcon={<CloseIcon fontSize="small" />}
            onClick={handleClear}
            disabled={isPending}
          >
            Clear
          </Button>
          <Button
            className="footer-btn"
            variant="contained"
            disableElevation
            startIcon={<FileUploadOutlinedIcon fontSize="small" />}
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? 'Uploading...' : 'Upload Document'}
          </Button>
        </Box>
      </UploadMedicalRecordModalWrapper>
    </CustomModal>
  );
}

export default memo(UploadMedicalRecordModal);
