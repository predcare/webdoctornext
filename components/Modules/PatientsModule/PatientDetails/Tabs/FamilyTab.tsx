'use client';

import TabSectionCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/TabSectionCard';
import FamilyMemberRow from '@/components/Modules/PatientsModule/PatientDetails/Family/FamilyMemberRow';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { useMyPatientFamilyMembers } from '@/hooks/react-query/patients/patients.hooks';
import { capitalize, formatDate, getAge } from '@/lib/commons/common.utils';
import { PatientTabContentWrapper } from '@/styles/CustomStyled/PatientTabContentWrapper';
import type { IPatientFamilyMember } from '@/typescripts/interfaces/patients.interfaces';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import { memo } from 'react';

const headList = [
  'Member',
  'Contact',
  'Age / DOB',
  'Gender',
  'Blood Group',
  'Address',
];

interface IFamilyTabProps {
  patientId: string;
}

function FamilyTab({ patientId }: IFamilyTabProps) {
  const { data: familyMemberList, isPending: familyMemberListPending } =
    useMyPatientFamilyMembers({
      patientId,
    });

  return (
    <PatientTabContentWrapper>
      <TabSectionCard
        title="Family Members"
        icon={<FamilyRestroomOutlinedIcon />}
      >
        <CustomTable
          className="tab-table family-table"
          headList={headList}
          zebraStriping={false}
          isLoading={familyMemberListPending}
          isEmpty={!familyMemberListPending && !familyMemberList?.length}
          emptyText="No family members found"
          emptyDescription="Family members linked to this patient will appear here."
        >
          {familyMemberList?.map((member: IPatientFamilyMember) => (
            <FamilyMemberRow
              key={member.patient_record_id || member.user_id}
              patientId={member.patient_id || '-'}
              name={member.name}
              relation={capitalize(member.relation || '')}
              profileImage={member.profile_image}
              email={member.email}
              phone={member.phone_number || member.phone}
              alternateNumber={member.alternate_phone || ''}
              address={member.address}
              dateOfBirth={formatDate(member.date_of_birth)}
              age={getAge(member.date_of_birth, { large: true })}
              gender={capitalize(member.gender || '')}
              bloodGroup={member.blood_type || ''}
            />
          ))}
        </CustomTable>
      </TabSectionCard>

      {/* <AddFamilyMemberModal
        open={addFamilyMemberModalOpen}
        onClose={() => setAddFamilyMemberModalOpen(false)}
      /> */}
    </PatientTabContentWrapper>
  );
}

export default memo(FamilyTab);
