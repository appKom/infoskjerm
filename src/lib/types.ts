export const EVENT_TYPES = new Map([
  [1, { display: 'Sosialt', color: 'rgb(67, 177, 113)', colorName: 'green' }],
  [2, { display: 'Bedpress', color: 'rgb(235, 83, 110)', colorName: 'red' }],
  [3, { display: 'Kurs', color: 'rgb(18, 125, 189)', colorName: 'blue' }],
  [4, { display: 'Utflukt', color: 'rgb(253, 189, 71)', colorName: 'yellow' }],
  [5, { display: 'Ekskursjon', color: 'rgb(42, 198, 249)', colorName: 'blue' }],
  [6, { display: 'Internt', color: 'rgb(231, 94, 59)', colorName: 'red' }],
  [7, { display: 'Annet', color: 'rgb(179, 107, 205)', colorName: 'purple' }],
  [8, { display: 'Realfagskjelleren', color: 'rgb(231, 94, 59)', colorName: 'red' }]
]);

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
  }[]
};

export type BlastType = {
  id: string;
  name: number;
  author: string;
  author_image: string;
  date: string;
  text: string;
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
  payment: any | null; // Adjust type based on expected structure if needed
  feedback: number;
  is_eligible_for_signup: boolean | null;
  is_attendee: boolean | null;
  is_on_waitlist: boolean | null;
  what_place_is_user_on_wait_list: number | null;
}