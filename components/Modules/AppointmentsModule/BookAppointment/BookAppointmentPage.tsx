'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import CustomAutocomplete from '@/components/ui/CustomAutocomplete/CustomAutocomplete';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { InPersonIcon, VideoIcon } from '@/components/ui/Icons/appointments';
import { patients, type Patient } from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { BookAppointmentWrapper } from '@/styles/CustomStyled/BookAppointmentWrapper';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import { type ReactNode } from 'react';

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Appointment List', href: projectRoutes.appointments },
  { label: 'Book Appointment' },
];

const backAction = (
  <Button
    className="page-action"
    variant="outlined"
    component={Link}
    href={projectRoutes.appointments}
    startIcon={<ArrowBackIcon fontSize="small" />}
  >
    Back to List
  </Button>
);

const consultationTypes = [
  {
    id: 'in-person',
    label: 'In-person',
    hint: 'At the clinic',
    icon: <InPersonIcon size={22} />,
    active: true,
  },
  {
    id: 'video',
    label: 'Video',
    hint: 'Online consult',
    icon: <VideoIcon size={22} />,
    active: false,
  },
];

const dateCards = [
  {
    id: 'oct-20',
    weekday: 'Tue',
    month: 'Oct',
    dayNumber: '20',
    slots: '96 slots',
    active: false,
  },
  {
    id: 'oct-21',
    weekday: 'Wed',
    month: 'Oct',
    dayNumber: '21',
    slots: '96 slots',
    active: false,
  },
  {
    id: 'oct-22',
    weekday: 'Thu',
    month: 'Oct',
    dayNumber: '22',
    slots: '96 slots',
    active: true,
  },
  {
    id: 'oct-23',
    weekday: 'Fri',
    month: 'Oct',
    dayNumber: '23',
    slots: '96 slots',
    active: false,
  },
  {
    id: 'oct-24',
    weekday: 'Sat',
    month: 'Oct',
    dayNumber: '24',
    slots: '96 slots',
    active: false,
  },
  {
    id: 'oct-25',
    weekday: 'Sun',
    month: 'Oct',
    dayNumber: '25',
    slots: '96 slots',
    active: false,
  },
  {
    id: 'oct-26',
    weekday: 'Mon',
    month: 'Oct',
    dayNumber: '26',
    slots: '96 slots',
    active: false,
  },
  {
    id: 'oct-27',
    weekday: 'Tue',
    month: 'Oct',
    dayNumber: '27',
    slots: '96 slots',
    active: false,
  },
  {
    id: 'oct-28',
    weekday: 'Wed',
    month: 'Oct',
    dayNumber: '28',
    slots: '96 slots',
    active: false,
  },
];

const morningSlots = [
  '09:00 AM to 09:05 AM',
  '09:05 AM to 09:10 AM',
  '09:10 AM to 09:15 AM',
  '09:15 AM to 09:20 AM',
  '09:20 AM to 09:25 AM',
  '09:25 AM to 09:30 AM',
  '09:30 AM to 09:35 AM',
  '09:35 AM to 09:40 AM',
  '09:40 AM to 09:45 AM',
  '09:45 AM to 09:50 AM',
  '09:50 AM to 09:55 AM',
  '09:55 AM to 10:00 AM',
  '10:00 AM to 10:05 AM',
  '10:05 AM to 10:10 AM',
  '10:10 AM to 10:15 AM',
  '10:15 AM to 10:20 AM',
  '10:20 AM to 10:25 AM',
  '10:25 AM to 10:30 AM',
  '10:30 AM to 10:35 AM',
  '10:35 AM to 10:40 AM',
  '10:40 AM to 10:45 AM',
  '10:45 AM to 10:50 AM',
  '10:50 AM to 10:55 AM',
  '10:55 AM to 11:00 AM',
  '11:00 AM to 11:05 AM',
  '11:05 AM to 11:10 AM',
  '11:10 AM to 11:15 AM',
  '11:15 AM to 11:20 AM',
  '11:20 AM to 11:25 AM',
  '11:25 AM to 11:30 AM',
  '11:30 AM to 11:35 AM',
  '11:35 AM to 11:40 AM',
  '11:40 AM to 11:45 AM',
  '11:45 AM to 11:50 AM',
  '11:50 AM to 11:55 AM',
  '11:55 AM to 12:00 PM',
];

const afternoonSlots = [
  '12:00 PM to 12:05 PM',
  '12:05 PM to 12:10 PM',
  '12:10 PM to 12:15 PM',
  '12:15 PM to 12:20 PM',
  '12:20 PM to 12:25 PM',
  '12:25 PM to 12:30 PM',
  '12:30 PM to 12:35 PM',
  '12:35 PM to 12:40 PM',
  '12:40 PM to 12:45 PM',
  '12:45 PM to 12:50 PM',
  '12:50 PM to 12:55 PM',
  '12:55 PM to 01:00 PM',
  '01:00 PM to 01:05 PM',
  '01:05 PM to 01:10 PM',
  '01:10 PM to 01:15 PM',
  '01:15 PM to 01:20 PM',
  '01:20 PM to 01:25 PM',
  '01:25 PM to 01:30 PM',
  '01:30 PM to 01:35 PM',
  '01:35 PM to 01:40 PM',
  '01:40 PM to 01:45 PM',
  '01:45 PM to 01:50 PM',
  '01:50 PM to 01:55 PM',
  '01:55 PM to 02:00 PM',
  '02:00 PM to 02:05 PM',
  '02:05 PM to 02:10 PM',
  '02:10 PM to 02:15 PM',
  '02:15 PM to 02:20 PM',
  '02:20 PM to 02:25 PM',
  '02:25 PM to 02:30 PM',
  '02:30 PM to 02:35 PM',
  '02:35 PM to 02:40 PM',
  '02:40 PM to 02:45 PM',
  '02:45 PM to 02:50 PM',
  '02:50 PM to 02:55 PM',
  '02:55 PM to 03:00 PM',
  '03:00 PM to 03:05 PM',
  '03:05 PM to 03:10 PM',
  '03:10 PM to 03:15 PM',
  '03:15 PM to 03:20 PM',
  '03:20 PM to 03:25 PM',
  '03:25 PM to 03:30 PM',
  '03:30 PM to 03:35 PM',
  '03:35 PM to 03:40 PM',
  '03:40 PM to 03:45 PM',
  '03:45 PM to 03:50 PM',
  '03:50 PM to 03:55 PM',
  '03:55 PM to 04:00 PM',
];

const eveningSlots = [
  '04:00 PM to 04:05 PM',
  '04:05 PM to 04:10 PM',
  '04:10 PM to 04:15 PM',
  '04:15 PM to 04:20 PM',
  '04:20 PM to 04:25 PM',
  '04:25 PM to 04:30 PM',
  '04:30 PM to 04:35 PM',

  '04:35 PM to 04:40 PM',
  '04:40 PM to 04:45 PM',
  '04:45 PM to 04:50 PM',
  '04:50 PM to 04:55 PM',
  '04:55 PM to 05:00 PM',
];

const slotGroups = [
  {
    id: 'morning',
    label: 'Morning',
    range: '(9:00 AM - 12:00 PM)',
    slots: morningSlots,
  },
  {
    id: 'afternoon',
    label: 'Afternoon',
    range: '(12:00 PM - 4:00 PM)',
    slots: afternoonSlots,
  },
  {
    id: 'evening',
    label: 'Evening',
    range: '(4:00 PM - 12:00 AM)',
    slots: eveningSlots,
  },
];

const selectedSlot = '09:15 AM to 09:20 AM';

const visitCategories: {
  id: string;
  label: string;
  hint: string;
  icon: ReactNode;
  active: boolean;
}[] = [
  {
    id: 'new',
    label: 'New Visit',
    hint: 'First appointment',
    icon: <PersonAddAltOutlinedIcon />,
    active: false,
  },
  {
    id: 'regular',
    label: 'Regular Checkup',
    hint: 'Routine visit',
    icon: <EventAvailableOutlinedIcon />,
    active: true,
  },
  {
    id: 'follow-up',
    label: 'Follow Up',
    hint: 'Return visit',
    icon: <ReplayOutlinedIcon />,
    active: false,
  },
];

const sameId = (option: Patient, value: Patient) => option.id === value.id;

type BookAppointmentPageProps = {
  patientId?: string;
};

export default function BookAppointmentPage({
  patientId,
}: BookAppointmentPageProps) {
  const selectedPatient = patients.find((row) => row.id === patientId) ?? null;
  const selectedDate = dateCards.find((row) => row.active);
  const selectedVisit = visitCategories.find((row) => row.active);
  const selectedConsult = consultationTypes.find((row) => row.active);

  return (
    <BookAppointmentWrapper>
      <PageBreadcrumb items={breadcrumbItems} action={backAction} />

      <Box className="book-form" component="form" noValidate>
        <Box className="book-card">
          <Typography component="h3" className="card-title required">
            Select Patient
          </Typography>
          <CustomAutocomplete<Patient>
            name="patient"
            placeholder="Search patient by name, ID or phone"
            options={patients}
            value={selectedPatient}
            startAdornment={<SearchIcon />}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={sameId}
            noOptionsText="No patients found"
            renderOption={(option) => (
              <Box className="option-copy">
                <Typography component="span" className="option-title">
                  {option.name}
                </Typography>
                <Typography component="span" className="option-note">
                  {option.patientCode} · {option.phone}
                </Typography>
              </Box>
            )}
          />
          <Box className="patient-search-foot">
            <Link className="card-link" href={projectRoutes.addPatient}>
              <AddIcon fontSize="inherit" />
              Add New Patient
            </Link>
          </Box>
        </Box>

        {selectedPatient ? (
          <Box className="book-card">
            <Box className="selected-patient">
              <Box className="selected-copy">
                <Typography component="p" className="selected-name">
                  {selectedPatient.name}
                </Typography>
                <Typography component="p" className="selected-meta">
                  <span>ID: {selectedPatient.patientCode}</span>
                  <span>
                    <PhoneOutlinedIcon />
                    {selectedPatient.phone}
                  </span>
                  <span>
                    <MailOutlinedIcon />
                    {selectedPatient.email}
                  </span>
                </Typography>
              </Box>
              <Link
                className="card-link"
                href={projectRoutes.bookAppointment()}
              >
                Change Patient
              </Link>
            </Box>
          </Box>
        ) : null}

        <Box className="book-card">
          <Typography component="h3" className="card-title required">
            Consultation Type
          </Typography>
          <Box className="choice-grid">
            {consultationTypes.map((item) => (
              <Box
                key={item.id}
                className={item.active ? 'choice-card active' : 'choice-card'}
              >
                <Box component="span" className="choice-icon">
                  {item.icon}
                </Box>
                <Box className="choice-copy">
                  <Typography component="span" className="choice-label">
                    {item.label}
                  </Typography>
                  <Typography component="span" className="choice-hint">
                    {item.hint}
                  </Typography>
                </Box>
                {item.active ? (
                  <CheckRoundedIcon className="choice-check" />
                ) : null}
              </Box>
            ))}
          </Box>
        </Box>

        <Box className="book-card">
          <Box className="card-head">
            <Box className="date-heading">
              <Typography component="h3" className="card-title required">
                Select Date
              </Typography>
              <Typography component="p" className="date-month">
                October 2026
              </Typography>
            </Box>
            <Box className="date-nav">
              <IconButton className="calendar-btn" aria-label="Open calendar">
                <CalendarMonthOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton className="nav-btn" aria-label="Previous dates">
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
              <IconButton className="nav-btn" aria-label="Next dates">
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Box className="date-row">
            {dateCards.map((item) => (
              <Box
                key={item.id}
                className={item.active ? 'date-card active' : 'date-card'}
              >
                <Typography component="p" className="weekday">
                  {item.weekday}
                </Typography>
                <Typography component="p" className="day-num">
                  {item.dayNumber}
                </Typography>
                <Typography component="p" className="month">
                  {item.month}
                </Typography>
                <Typography component="span" className="slot-pill">
                  {item.slots}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box className="book-card">
          <Typography component="h3" className="card-title required">
            Select Time Slot
          </Typography>
          {slotGroups.map((group) => (
            <Box key={group.id} className="slot-group">
              <Box className="slot-group-head">
                <Typography component="p" className="slot-label">
                  {group.label}
                </Typography>
                <Typography component="p" className="slot-range">
                  {group.range}
                </Typography>
                <Typography component="span" className="slot-count">
                  {group.slots.length} slots
                </Typography>
              </Box>
              <Box className="slot-list">
                {group.slots.map((slot) => (
                  <Box
                    key={slot}
                    component="span"
                    className={
                      slot === selectedSlot ? 'slot-chip active' : 'slot-chip'
                    }
                  >
                    {slot}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box className="book-card">
          <Typography component="h3" className="card-title">
            Visit Category
          </Typography>
          <Box className="choice-grid three">
            {visitCategories.map((item) => (
              <Box
                key={item.id}
                className={item.active ? 'choice-card active' : 'choice-card'}
              >
                <Box component="span" className="choice-icon">
                  {item.icon}
                </Box>
                <Box className="choice-copy">
                  <Typography component="span" className="choice-label">
                    {item.label}
                  </Typography>
                  <Typography component="span" className="choice-hint">
                    {item.hint}
                  </Typography>
                </Box>
                {item.active ? (
                  <CheckRoundedIcon className="choice-check" />
                ) : null}
              </Box>
            ))}
          </Box>
        </Box>

        <Box className="book-card">
          <CustomInput
            multiline
            minRows={3}
            name="reason"
            inputLabelName="Reason to Visit"
            placeholder="Please describe the reason for visit..."
          />
        </Box>

        <Box className="summary-card">
          <Typography component="h3" className="summary-title">
            Booking Summary
          </Typography>
          <Box className="summary-grid">
            <Box className="summary-item">
              <Typography component="p" className="summary-label">
                Patient
              </Typography>
              <Typography
                component="p"
                className={
                  selectedPatient ? 'summary-value' : 'summary-value muted'
                }
              >
                {selectedPatient?.name ?? 'Not selected'}
              </Typography>
            </Box>
            <Box className="summary-item">
              <Typography component="p" className="summary-label">
                Consultation Type
              </Typography>
              <Typography component="p" className="summary-value">
                {selectedConsult?.label}
              </Typography>
            </Box>
            <Box className="summary-item">
              <Typography component="p" className="summary-label">
                Date
              </Typography>
              <Typography component="p" className="summary-value">
                {selectedDate
                  ? `${selectedDate.weekday}, ${selectedDate.month} ${selectedDate.dayNumber}`
                  : 'Not selected'}
              </Typography>
            </Box>
            <Box className="summary-item">
              <Typography component="p" className="summary-label">
                Time Slot
              </Typography>
              <Typography component="p" className="summary-value">
                {selectedSlot}
              </Typography>
            </Box>
            <Box className="summary-item">
              <Typography component="p" className="summary-label">
                Visit Category
              </Typography>
              <Typography component="p" className="summary-value">
                {selectedVisit?.label}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="confirm-wrap">
          <Button
            className="confirm-btn"
            variant="contained"
            type="button"
            disabled
            disableElevation
          >
            Confirm Booking
          </Button>
        </Box>
      </Box>
    </BookAppointmentWrapper>
  );
}
