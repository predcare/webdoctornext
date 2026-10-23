'use client';

import { EMR_RECORD_CATEGORIES } from '@/components/Modules/PatientsModule/constants/patients.constants';
import TabSectionCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/TabSectionCard';
import MedicalRecordRow from '@/components/Modules/PatientsModule/PatientDetails/MedicalRecords/MedicalRecordRow';
import UploadMedicalRecordModal from '@/components/Modules/PatientsModule/PatientDetails/Modal/UploadMedicalRecordModal';
import { queryClient } from '@/components/Providers/ReactQueryProvider';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { useDebounce } from '@/hooks/commons/useDebounce';
import {
  useMyPatientEmrs,
  useShareEmrDocument,
} from '@/hooks/react-query/patients/patients.hooks';
import { PatientsQueryKeys } from '@/hooks/react-query/query.keys';
import {
  _toTitleCase,
  formatDate,
  openInNewTab,
} from '@/lib/commons/common.utils';
import { showInDevelopment, showSuccessToast } from '@/lib/commons/toast';
import { PatientTabContentWrapper } from '@/styles/CustomStyled/PatientTabContentWrapper';
import { useAlertStore } from '@/zustand/stores/useAlertStore';
import CloseIcon from '@mui/icons-material/Close';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { memo, useState } from 'react';

const headList = [
  'Document Title',
  'Type',
  'Uploaded By',
  'Upload Date',
  'Visibility',
  'Actions',
];

interface IMedicalRecordProps {
  patientId: string;
}

function MedicalRecordsTab({ patientId }: IMedicalRecordProps) {
  const [uploadMedicalRecordModalOpen, setUploadMedicalRecordModalOpen] =
    useState(false);

  const [updatingDocId, setUpdatingDocId] = useState<number | null>(null);

  const [filterStates, setFilterStates] = useState({
    search: '',
    category: '',
    startDate: '',
    endDate: '',
  });
  const debounceSearch = useDebounce(filterStates.search, 500);

  const {
    data: medicalRecords,
    isPending: medicalRecordsPending,
    refetch,
  } = useMyPatientEmrs({
    patientId: patientId,
    category: filterStates?.category || '',
    endDate: filterStates?.endDate || '',
    search: debounceSearch,
    startDate: filterStates?.startDate || '',
  });
  const { mutate: shareEmrDocument } = useShareEmrDocument();
  const showConfirm = useAlertStore((state) => state.showConfirm);

  const hasActiveFilters = Boolean(
    filterStates.search.trim() ||
    (filterStates.category && filterStates.category !== 'all') ||
    filterStates.startDate ||
    filterStates.endDate,
  );

  const handleResetOrRefresh = async () => {
    if (hasActiveFilters) {
      setFilterStates({
        search: '',
        category: '',
        startDate: '',
        endDate: '',
      });
    } else {
      await refetch();
    }
  };

  const handleToggleVisibility = (docId: number, visible: boolean) => {
    setUpdatingDocId(docId);
    showConfirm({
      title: 'Toggle Visibility',
      message: visible
        ? 'Are you sure you want to make this document visible to the patient?'
        : 'Are you sure you want to hide this document from the patient?',
      onConfirm: () => {
        shareEmrDocument(
          { docId, body: { visible_to_patient: visible } },
          {
            onSuccess: async (res) => {
              if (!res?.success) return;
              showSuccessToast(
                visible
                  ? 'Document is now visible to patient'
                  : 'Document hidden from patient',
              );
              await queryClient.invalidateQueries({
                queryKey: [PatientsQueryKeys.EmrRecords],
              });
            },
            onSettled: () => setUpdatingDocId(null),
          },
        );
      },
      onCancel: () => setUpdatingDocId(null),
    });
  };

  return (
    <PatientTabContentWrapper>
      <TabSectionCard
        title="Medical Records"
        icon={<FolderOutlinedIcon />}
        actionLabel="Add Record"
        actionOnClick={() => setUploadMedicalRecordModalOpen(true)}
      >
        <Box className="record-filters">
          <Box className="filter-field">
            <Typography component="p" className="filter-label">
              Search by Title
            </Typography>
            <TextField
              className="filter-input"
              placeholder="Search document title..."
              value={filterStates.search}
              onChange={(e) =>
                setFilterStates((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </Box>
          <Box className="filter-field">
            <Typography component="p" className="filter-label">
              Filter by Category
            </Typography>
            <Select
              className="filter-select"
              value={filterStates.category || 'all'}
              onChange={(e) =>
                setFilterStates((prev) => ({
                  ...prev,
                  category: e.target.value === 'all' ? '' : e.target.value,
                }))
              }
            >
              <MenuItem value="all">All Categories</MenuItem>
              {EMR_RECORD_CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box className="filter-field">
            <Typography component="p" className="filter-label">
              From Date
            </Typography>
            <CustomInput
              className="filter-input"
              type="date"
              value={filterStates.startDate}
              onChange={(e) =>
                setFilterStates((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
            />
          </Box>
          <Box className="filter-field">
            <Typography component="p" className="filter-label">
              To Date
            </Typography>
            <TextField
              className="filter-input"
              type="date"
              value={filterStates.endDate}
              onChange={(e) =>
                setFilterStates((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
            />
          </Box>
          <IconButton
            className="reset-btn"
            aria-label={hasActiveFilters ? 'Clear filters' : 'Reset filters'}
            onClick={handleResetOrRefresh}
          >
            {hasActiveFilters ? (
              <CloseIcon fontSize="small" />
            ) : (
              <RefreshIcon fontSize="small" />
            )}
          </IconButton>
        </Box>

        <CustomTable
          className="tab-table wide records-table"
          headList={headList}
          zebraStriping={false}
          isLoading={medicalRecordsPending}
          isEmpty={!medicalRecordsPending && !medicalRecords?.length}
          emptyText="No medical records found"
        >
          {medicalRecords?.map((record) => (
            <MedicalRecordRow
              key={record.id}
              title={record.title || record.document_type}
              fileName={record.document_path?.split('/').pop() || ''}
              fileSize={record.file_size}
              description={record.description}
              documentType={record.document_type}
              uploadedBy={
                record.owner_type === 'doctor'
                  ? record.doctor_name || 'Doctor'
                  : _toTitleCase(record.owner_type || '')
              }
              uploadedFrom={_toTitleCase(record.created_from || '')}
              uploadDate={formatDate(record.created_at)}
              uploadTime={formatDate(record.created_at, 'hh:mm A')}
              isVisible={!!record.visible_to_patient}
              isVisibilityUpdating={updatingDocId === record.id}
              onToggleVisibility={(visible) =>
                handleToggleVisibility(record.id, visible)
              }
              onView={() => openInNewTab(record.document_url)}
              onDownload={() => openInNewTab(record.document_url)}
              onDelete={showInDevelopment}
            />
          ))}
        </CustomTable>
      </TabSectionCard>

      {uploadMedicalRecordModalOpen && (
        <UploadMedicalRecordModal
          open={uploadMedicalRecordModalOpen}
          patientId={patientId}
          onClose={() => setUploadMedicalRecordModalOpen(false)}
        />
      )}
    </PatientTabContentWrapper>
  );
}

export default memo(MedicalRecordsTab);
