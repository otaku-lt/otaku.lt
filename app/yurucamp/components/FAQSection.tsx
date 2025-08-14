'use client';

import { useState, useEffect } from 'react';
import { FAQItem } from '@/types/yurucamp';

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch FAQ data from the API
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('/api/yurucamp/faq');
        if (!response.ok) {
          throw new Error('Failed to fetch FAQ data');
        }
        const data = await response.json();
        setFaqs(data);
      } catch (err) {
        console.error('Error loading FAQ data:', err);
        setError('Failed to load FAQ data. Please try again later.');
        // Fallback to default FAQs if API fails
        setFaqs([
          {
            question: "What should I bring?",
            answer: "We'll provide camping equipment, but bring personal items, cosplay, comfortable clothes, and toiletries. Full packing list will be sent to registered participants."
          },
          {
            question: "Is food included?",
            answer: "Yes! All meals are included in the registration fee. We'll have vegetarian and vegan options available."
          },
          {
            question: "What if it rains?",
            answer: "We have covered areas and backup indoor activities. The event will proceed rain or shine!"
          },
          {
            question: "Are there age restrictions?",
            answer: "18+ only for this edition. Future family-friendly editions may be organized."
          },
          {
            question: "Can I bring my own tent?",
            answer: "Absolutely! Personal tents are welcome. We'll also have shared tents available."
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-500/50 text-red-100 p-4 rounded-lg">
          <p className="font-semibold">Error loading FAQ</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : faqs.length > 0 ? (
        faqs.map((faq, index) => (
          <div key={index} className="bg-card-dark/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border-dark/50 hover:border-green-500/30 transition-colors">
            <h3 className="text-lg font-bold mb-3 text-foreground-dark">{faq.question}</h3>
            <div className="text-muted-foreground-dark" dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </div>
        ))
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No FAQs available at the moment. Please check back later.
        </div>
      )}
    </div>
  );
}
