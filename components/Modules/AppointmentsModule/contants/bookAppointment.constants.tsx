import { InPersonIcon, VideoIcon } from '@/components/ui/Icons/appointments';
import { SlotPeriod } from '@/lib/commons/availability.utils';
import { projectRoutes } from '@/routes';
import { ConsultType } from '@/typescripts/enums';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import type { ReactNode } from 'react';

export type BookingConsultType = ConsultType.IN_PERSON | ConsultType.VIDEO;
export type VisitCategoryId = 'first_visit' | 'regular' | 'follow-up';

export interface IChoiceOption<T extends string> {
  id: T;
  label: string;
  hint: string;
  icon: ReactNode;
}

export interface IVisitCategoryOption extends IChoiceOption<VisitCategoryId> {
  appointmentType: string;
}

export const DATE_WINDOW = 7;
export const PATIENT_PAGE_LIMIT = 15;
export const PATIENT_SEARCH_DEBOUNCE = 500;

export const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Appointment List', href: projectRoutes.appointments },
  { label: 'Book Appointment' },
];

export const consultationTypes: IChoiceOption<BookingConsultType>[] = [
  {
    id: ConsultType.IN_PERSON,
    label: 'In-person',
    hint: 'At the clinic',
    icon: <InPersonIcon size={22} />,
  },
  {
    id: ConsultType.VIDEO,
    label: 'Video',
    hint: 'Online consult',
    icon: <VideoIcon size={22} />,
  },
];

export const visitCategories: IVisitCategoryOption[] = [
  {
    id: 'first_visit',
    label: 'New Visit',
    hint: 'First appointment',
    icon: <PersonAddAltOutlinedIcon />,
    appointmentType: 'first_visit',
  },
  {
    id: 'regular',
    label: 'Regular Checkup',
    hint: 'Routine visit',
    icon: <EventAvailableOutlinedIcon />,
    appointmentType: 'regular_checkup',
  },
  {
    id: 'follow-up',
    label: 'Follow Up',
    hint: 'Return visit',
    icon: <ReplayOutlinedIcon />,
    appointmentType: 'follow_up',
  },
];

export const PERIOD_META: Record<SlotPeriod, { label: string }> = {
  MORNING: { label: 'Morning' },
  AFTERNOON: { label: 'Afternoon' },
  EVENING: { label: 'Evening' },
  NIGHT: { label: 'Night' },
};
