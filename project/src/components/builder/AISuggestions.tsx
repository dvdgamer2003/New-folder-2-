import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateContent } from '../../services/ai';
import toast from 'react-hot-toast';

interface AISuggestionsProps {
  type: 'summary' | 'experience' | 'skills' | 'education';
  context?: string;
  onSuggestion: (content: string) => void;
}

export default function AISuggestions({ type, context, onSuggestion }: AISuggestionsProps) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const content = await generateContent({ type, context });
      onSuggestion(content);
      toast.success('Content generated successfully!');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Using smart templates instead of AI generation');
      // The service will automatically use fallback content
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="flex items-center space-x-2 text-sm text-purple-600 hover:text-purple-700 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Sparkles className="w-4 h-4" />
      )}
      <span>Smart Generate</span>
    </button>
  );
}
