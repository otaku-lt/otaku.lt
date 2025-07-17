export interface FAQItem {
  question: string;
  answer: string;
}

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface ScheduleDay {
  day: string;
  date: string;
  events: ScheduleItem[];
}
