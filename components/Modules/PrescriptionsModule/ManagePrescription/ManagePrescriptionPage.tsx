'use client';

import ConsultationPatientHeader from '@/components/Modules/PrescriptionsModule/ManagePrescription/ConsultationPatientHeader';
import ConsultationWorkspaceTabs from '@/components/Modules/PrescriptionsModule/ManagePrescription/ConsultationWorkspaceTabs';
import {
  clinicalNoteFields,
  followUpReferralFields,
  type ClinicalNoteField,
  type ConsultationTabId,
  type FollowUpReferralField,
} from '@/components/Modules/PrescriptionsModule/ManagePrescription/constants';
import AllergiesConditionsSection from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/AllergiesConditionsSection';
import ClinicalNotesSection from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/ClinicalNotesSection';
import ConsultationActionsBar from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/ConsultationActionsBar';
import FollowUpReferralSection from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/FollowUpReferralSection';
import LabTestsSection from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/LabTestsSection';
import PatientVitalsSection from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/PatientVitalsSection';
import PrescriptionSection from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/PrescriptionSection';
import { prescriptionWorkspace } from '@/resources/mock';
import { ManagePrescriptionWrapper } from '@/styles/CustomStyled/ManagePrescriptionWrapper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const ACTIONS_ID = 'consultation-actions';

const getMainScroller = () =>
  document.querySelector<HTMLElement>('.dashboard-main');

const clinicalNotesByTab: Record<
  ConsultationTabId,
  readonly ClinicalNoteField[] | null
> = {
  prescription: clinicalNoteFields,
  'clinical-notes': ['symptoms', 'examination'],
  diagnosis: ['diagnosis', 'treatment'],
  referrals: null,
};

const followUpByTab: Record<
  ConsultationTabId,
  readonly FollowUpReferralField[] | null
> = {
  prescription: followUpReferralFields,
  'clinical-notes': ['follow-up'],
  diagnosis: null,
  referrals: ['referral'],
};

type ManagePrescriptionPageProps = {
  tab: ConsultationTabId;
};

export default function ManagePrescriptionPage({
  tab: initialTab,
}: ManagePrescriptionPageProps) {
  const pathname = usePathname();
  const [tab, setTab] = useState(initialTab);
  const [showScrollEnd, setShowScrollEnd] = useState(false);
  const showFullForm = tab === 'prescription';
  const clinicalFields = clinicalNotesByTab[tab];
  const followUpFields = followUpByTab[tab];

  const handleTabChange = (nextTab: ConsultationTabId) => {
    setTab(nextTab);
    window.history.replaceState(null, '', `${pathname}?tab=${nextTab}`);
  };

  const scrollToActions = () => {
    document.getElementById(ACTIONS_ID)?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  useEffect(() => {
    const scroller = getMainScroller();
    if (!scroller) return;

    const update = () => {
      const remaining =
        scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
      setShowScrollEnd(remaining > 80);
    };

    update();
    scroller.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      scroller.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [tab]);

  return (
    <ManagePrescriptionWrapper>
      <ConsultationPatientHeader patient={prescriptionWorkspace.patient} />
      <ConsultationWorkspaceTabs tab={tab} onChange={handleTabChange} />
      {showFullForm || tab === 'clinical-notes' ? (
        <AllergiesConditionsSection />
      ) : null}
      {showFullForm || tab === 'clinical-notes' ? (
        <PatientVitalsSection vitals={prescriptionWorkspace.vitals} />
      ) : null}
      {clinicalFields ? <ClinicalNotesSection fields={clinicalFields} /> : null}
      {showFullForm ? <PrescriptionSection /> : null}
      {showFullForm ? <LabTestsSection /> : null}
      {followUpFields ? (
        <FollowUpReferralSection fields={followUpFields} />
      ) : null}
      <ConsultationActionsBar
        id={ACTIONS_ID}
        status={prescriptionWorkspace.status}
      />
      {showScrollEnd ? (
        <IconButton
          type="button"
          className="scroll-to-end"
          aria-label="Scroll to actions"
          onClick={scrollToActions}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      ) : null}
    </ManagePrescriptionWrapper>
  );
}
