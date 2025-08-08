export interface FormData {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  isAllDay: boolean;
  isMultiDay: boolean;
  location: string;
  category: string;
  ticketPrice: string;
  sourceUrl: string;
  sourceDescription: string;
  contactEmail: string;
  additionalInfo: string;
  imageUrl: string;
  imageFile: File | null;
}
