export const EVENT_TYPES = [
  { display: 'Sosialt', colorName: 'green' },
  { display: 'Bedpres', colorName: 'red' },
  { display: 'Kurs', colorName: 'blue' },
  { display: 'Utflukt', colorName: 'yellow' },
  { display: 'Ekskursjon', colorName: 'blue' },
  { display: 'Internt', colorName: 'red' },
  { display: 'Annet', colorName: 'purple' },
  { display: 'Realfagskjelleren', colorName: 'orange' }
]

export type MemeType = {
  id: string;
  name: number;
  author: string;
  author_image: string;
  date: string;
  url: string;
  type: 'image' | 'video';
  reactions: {
    name: string;
    count: number;
    url: string;
  }[];
  channel_name: string;
};

export type BlastType = {
  id: string;
  name: number;
  author: string;
  author_image: string;
  date: string;
  text: string;
  channel_name: string;
}

export interface IEventImage {
  id: number;
  name: string;
  timestamp: string;
  description: string;
  thumb: string;
  original: string;
  wide: string;
  lg: string;
  md: string;
  sm: string;
  xs: string;
  tags: string[];
  photographer: string;
  preset: string;
  preset_display: string;
}

export interface IEvent {
  id: number;
  title: string;
  slug: string;
  ingress: string;
  ingress_short: string;
  description: string;
  start_date: string; // ISO date string
  end_date: string;   // ISO date string
  location: string;
  event_type: number;
  event_type_display: string;
  organizer: number;
  author: number | null;
  images: IEventImage[];
  companies: string[];
  is_attendance_event: boolean;
  max_capacity: number;
  waitlist: boolean;
  number_of_seats_taken: number;
  attendee_info: string | null;
  registration_start: string; // ISO date string
  registration_end: string;   // ISO date string
}

export interface IExtraOption {
  id: number;
  choice: string;
  note: string | null;
}

export interface IEventAttendanceDetails {
  id: number;
  max_capacity: number;
  waitlist: boolean;
  guest_attendance: boolean;
  registration_start: string; // ISO date string
  registration_end: string;   // ISO date string
  unattend_deadline: string;  // ISO date string
  automatically_set_marks: boolean;
  rule_bundles: number[];
  number_on_waitlist: number;
  number_of_seats_taken: number;
  has_feedback: boolean;
  has_extras: boolean;
  has_reservation: boolean;
  extras: IExtraOption[];
  payment: number | null;
  feedback: number;
  is_eligible_for_signup: boolean | null;
  is_attendee: boolean | null;
  is_on_waitlist: boolean | null;
  what_place_is_user_on_wait_list: number | null;
}