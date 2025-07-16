import { Event } from "./event";

export interface FeaturedEventProps {
  event: Event | null;
  className?: string;
}

export const formatEventDate = (dateString: string, endDateString?: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  };
  
  const startDate = new Date(dateString);
  let formattedDate = startDate.toLocaleDateString('en-US', options);
  
  if (endDateString) {
    const endDate = new Date(endDateString);
    const endOptions: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric' 
    };
    formattedDate += ` - ${endDate.toLocaleDateString('en-US', endOptions)}`;
  }
  
  return formattedDate;
};
