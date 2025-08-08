'use client';

import React from 'react';
import { Calendar, Clock, Image as ImageIcon, Link as LinkIcon, Send } from 'lucide-react';

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

interface FullFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  uploadMethod: 'url' | 'file';
  setUploadMethod: React.Dispatch<React.SetStateAction<'url' | 'file'>>;
  categories: { value: string; label: string }[];
}

type HTMLInputWithPicker = HTMLInputElement & { showPicker?: () => void };

const FullForm: React.FC<FullFormProps> = ({
  formData,
  handleInputChange,
  setFormData,
  handleImageChange,
  imagePreview,
  setImagePreview,
  uploadMethod,
  setUploadMethod,
  categories
}) => {
  return (
    <>
      {/* Event Details Section */}
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-border/50">
        <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
          <Calendar className="text-pink-600" size={24} />
          Event Details
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
              placeholder="e.g., Anime Convention 2023"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
              placeholder="e.g., Vilnius, Lithuania"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">
                All Day Event
              </label>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  name="isAllDay"
                  checked={formData.isAllDay}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      isAllDay: e.target.checked,
                      startTime: e.target.checked ? "" : "12:00"
                    }));
                  }}
                  className="opacity-0 w-0 h-0 peer"
                />
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-input rounded-full transition-colors peer-checked:bg-primary/80"></span>
                <span className="absolute h-4 w-4 bg-card rounded-full transition-transform top-1 left-1 peer-checked:translate-x-6"></span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Check if this is an all-day event
            </p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">
                Multi-Day Event
              </label>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  name="isMultiDay"
                  checked={formData.isMultiDay}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      isMultiDay: e.target.checked,
                      endDate: e.target.checked ? prev.endDate : prev.startDate
                    }));
                  }}
                  className="opacity-0 w-0 h-0 peer"
                />
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-input rounded-full transition-colors peer-checked:bg-primary/80"></span>
                <span className="absolute h-4 w-4 bg-card rounded-full transition-transform top-1 left-1 peer-checked:translate-x-6"></span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Check if this event spans multiple days
            </p>
          </div>
          
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Date *
                </label>
                <div className="relative">
                  <div className="relative flex items-center">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          startDate: e.target.value,
                          endDate: !prev.isMultiDay ? e.target.value : prev.endDate
                        }));
                      }}
                      required
                      className="w-full pl-4 pr-10 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
                    />
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        const input = document.querySelector('input[name="startDate"]') as HTMLInputWithPicker | null;
                        input?.showPicker?.();
                      }}
                      className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Open date picker"
                    >
                      <Calendar className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Start Time - Only show if not all-day and not multi-day */}
              {!formData.isAllDay && !formData.isMultiDay && (
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Start Time *
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-4 pr-10 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                    />
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        const input = document.querySelector('input[name="startTime"]') as HTMLInputWithPicker | null;
                        input?.showPicker?.();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Open time picker"
                    >
                      <Clock className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* End Date - Only show for multi-day events */}
              {formData.isMultiDay && (
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    End Date *
                  </label>
                  <div className="relative">
                    <div className="relative flex items-center">
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        min={formData.startDate}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-4 pr-10 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
                      />
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.preventDefault();
                          const input = document.querySelector('input[name="endDate"]') as HTMLInputWithPicker | null;
                          input?.showPicker?.();
                        }}
                        className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Open date picker"
                      >
                        <Calendar className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
              placeholder="Describe your event in detail..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Ticket Price
            </label>
            <input
              type="text"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
              placeholder="e.g., 20€ or Free"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Additional Info
            </label>
            <input
              type="text"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
              placeholder="Any additional information..."
            />
          </div>
        </div>
      </div>
      
      {/* Image Upload Section */}
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-border/50">
        <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
          <ImageIcon className="text-green-600" size={24} />
          Event Image
        </h2>
        
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              type="button"
              onClick={() => setUploadMethod('url')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${uploadMethod === 'url' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              Image URL
            </button>
            <button
              type="button"
              onClick={() => setUploadMethod('file')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${uploadMethod === 'file' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              Upload File
            </button>
          </div>
          
          {uploadMethod === 'url' ? (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Image URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => {
                    handleInputChange(e);
                    setImagePreview(e.target.value);
                  }}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                  placeholder="https://example.com/image.jpg"
                />
                <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Direct link to the event image
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Upload Image
              </label>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="relative border-2 border-dashed border-input rounded-lg p-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/50">
                    <input
                      type="file"
                      name="imageFile"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium text-foreground mb-1">Choose an image</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG, or WebP (Max 5MB)</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Max file size: 5MB (JPEG, PNG, WebP)
                  </p>
                </div>
                
                {imagePreview && (
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-2">Preview</p>
                    <div className="border border-input rounded-lg overflow-hidden bg-muted aspect-video flex items-center justify-center">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="object-contain max-h-48"
                        onError={() => setImagePreview(null)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Source & Contact Section */}
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-border/50">
        <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
          <Send className="text-blue-600" size={24} />
          Event Source & Contact
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
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
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Source Description
            </label>
            <textarea
              name="sourceDescription"
              value={formData.sourceDescription}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
              placeholder="Brief description of the source..."
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Contact Email *
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
              placeholder="your.email@example.com"
            />
            <p className="text-sm text-muted-foreground mt-1">
              We'll contact you if we need clarification about the event submission
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullForm;
