export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
};

export const notifications: NotificationItem[] = [
  {
    id: 'appt-rahul',
    title: 'New appointment',
    message: 'Rahul Sharma booked a visit today at 4:30 PM.',
    time: '5m ago',
    unread: true,
  },
  {
    id: 'lab-meera',
    title: 'Lab report ready',
    message: 'Meera Iyer’s blood panel is ready to review.',
    time: '22m ago',
    unread: true,
  },
  {
    id: 'cancel-arjun',
    title: 'Appointment cancelled',
    message: 'Arjun Patel cancelled the 6:00 PM slot.',
    time: '1h ago',
    unread: false,
  },
  {
    id: 'followup-nisha',
    title: 'Follow-up due',
    message: 'Nisha Rao is due for a follow-up this week.',
    time: '3h ago',
    unread: false,
  },
];
