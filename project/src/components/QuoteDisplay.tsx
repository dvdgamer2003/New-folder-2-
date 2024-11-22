import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

interface QuoteData {
  content: string;
  author: string;
}

export default function QuoteDisplay() {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.quotable.io/random?tags=success,inspirational');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote({
        content: data.content,
        author: data.author
      });
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({
        content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse flex items-center justify-center space-x-2 text-gray-300">
        <Quote className="w-4 h-4" />
        <span>Loading quote...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-gray-300 max-w-2xl mx-auto">
      <Quote className="w-6 h-6 mb-3 opacity-50" />
      <blockquote className="text-base italic mb-2">
        "{quote?.content}"
      </blockquote>
      <cite className="text-sm opacity-75">— {quote?.author}</cite>
    </div>
  );
}
