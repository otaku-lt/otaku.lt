"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, Send, Calendar, Clock, MapPin, Tag, Ticket, Link, Mail, Image as ImageIcon, Upload, X, Calendar as CalendarIcon, ArrowLeft, LayoutGrid } from "lucide-react";
import SimpleForm from "@/components/submit-form/SimpleForm";
import FullForm from "@/components/submit-form/FullForm";
import SuccessScreen from "@/components/submit-form/SuccessScreen";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { SUBMIT_EVENT_CATEGORIES } from '@/config/event-categories';

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

export default function SubmitEventPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    startDate: "",
    startTime: "12:00",
    endDate: "",
    isAllDay: false,
    isMultiDay: false,
    location: "",
    category: "",
    ticketPrice: "",
    sourceUrl: "",
    sourceDescription: "",
    contactEmail: "",
    additionalInfo: "",
    imageUrl: "",
    imageFile: null
  });
  
  // State for form type toggle
  const [formType, setFormType] = useState<'simple' | 'full'>('simple');
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const target = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    setFormData(prev => ({
      ...prev,
      imageFile: file,
      imageUrl: ''
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formDataToSend = new FormData();
      
      // Add all form data to FormData object
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'imageFile') {
          formDataToSend.append(key, value as string);
        }
      });
      
      // Add file if it exists
      if (formData.imageFile) {
        formDataToSend.append('image', formData.imageFile);
      }
      
      const response = await fetch('/api/events', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to submit event: ${response.statusText}`);
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting event:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = SUBMIT_EVENT_CATEGORIES.map(category => ({
    value: category.id,
    label: category.label
  }));

  if (isSubmitted) {
    return <SuccessScreen onReset={() => setIsSubmitted(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ContentPageHeader 
        title={
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Submit an Event
          </span>
        }
        showBackButton={true}
        backHref="/"
        backText="Back to Home"
      />
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Submit an Event <Plus className="w-8 h-8 inline-block align-middle" />
          </h1>
          <div className="mb-8 max-w-md mx-auto">
            <div className="inline-flex rounded-lg border border-border bg-card p-1">
              <button
                type="button"
                onClick={() => setFormType('simple')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${formType === 'simple' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <LayoutGrid size={16} />
                Simple Submission
              </button>
              <button
                type="button"
                onClick={() => setFormType('full')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${formType === 'full' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <CalendarIcon size={16} />
                Full Form
              </button>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {formType === 'simple' 
              ? 'Quickly submit an event with just essential information. Please note that events submitted with minimal details will require manual processing and may take longer to appear.' 
              : 'Provide complete details for your event. Your event will appear faster in the system if filled properly.'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {formType === 'simple' ? (
            <SimpleForm 
              formData={formData}
              handleInputChange={handleInputChange}
            />
          ) : (
            <FullForm 
              formData={formData}
              handleInputChange={handleInputChange}
              setFormData={setFormData}
              handleImageChange={handleFileInputChange}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              uploadMethod={uploadMethod}
              setUploadMethod={setUploadMethod}
              categories={categories}
            />
          )}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto px-8 py-4 rounded-full font-medium text-lg flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'bg-primary/80' : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-600 hover:shadow-lg hover:shadow-pink-500/20'}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Event'}
              {!isSubmitting && <Send size={20} className="text-primary-foreground" />}
            </button>
            
            <p className="text-sm text-muted-foreground text-center">
              Note: Your event will be reviewed before being published.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
