export interface FAQItem {
  question: string;
  answer: string;
}

export interface ScheduleEvent {
  zone: string;
  activity: string;
}

export interface ScheduleTimeslot {
  time: string;
  events: ScheduleEvent[];
}

export interface ScheduleDay {
  day: string;
  date: string;
  timeslots: ScheduleTimeslot[];
}
