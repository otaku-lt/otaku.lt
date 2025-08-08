import React from 'react';
import { Calendar } from 'lucide-react';

interface FormData {
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

interface SimpleFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

type HTMLInputWithPicker = HTMLInputElement & { showPicker?: () => void };

const SimpleForm: React.FC<SimpleFormProps> = ({ 
  formData, 
  handleInputChange 
}) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Event Source URL *
          </label>
          <input
            type="url"
            name="sourceUrl"
            value={formData.sourceUrl}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
            placeholder="https://facebook.com/events/123... or https://instagram.com/p/... or Discord link"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Link to the original event source (Facebook, Instagram, Discord announcement, website, etc.)
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleForm;
