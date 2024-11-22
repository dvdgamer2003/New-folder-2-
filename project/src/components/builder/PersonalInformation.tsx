import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useResumeStore } from '../../store/useResumeStore';
import { generateContent } from '../../services/ai';
import toast from 'react-hot-toast';

type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
};

export default function PersonalInformation() {
  const { resume, updateResume } = useResumeStore();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<PersonalInfo>({
    defaultValues: resume.personalInfo,
  });

  const watchedFields = watch();

  const handleAISuggestion = async (field: keyof PersonalInfo) => {
    const currentValue = watchedFields[field];
    if (!currentValue) {
      toast.error('Please enter some text first');
      return;
    }

    setLoading(true);
    try {
      let prompt = '';
      switch (field) {
        case 'title':
          prompt = `Suggest a professional title based on: ${currentValue}`;
          break;
        case 'location':
          prompt = `Format this location professionally: ${currentValue}`;
          break;
        default:
          prompt = `Improve this ${field} professionally: ${currentValue}`;
      }

      const suggestion = await generateContent(prompt);
      if (suggestion) {
        setValue(field, suggestion);
        const updatedPersonalInfo = {
          ...resume.personalInfo,
          [field]: suggestion,
        };
        updateResume({ ...resume, personalInfo: updatedPersonalInfo });
        toast.success(`${field} updated with AI suggestion`);
      }
    } catch (error) {
      toast.error('Failed to get AI suggestion');
      console.error('AI suggestion error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: PersonalInfo) => {
    updateResume({ ...resume, personalInfo: data });
    toast.success('Personal information saved!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        {/* Full Name */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            {...register('fullName')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="John Doe"
          />
        </div>

        {/* Professional Title with AI */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Title
          </label>
          <div className="relative">
            <input
              type="text"
              {...register('title')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Senior Software Engineer"
            />
            <button
              type="button"
              onClick={() => handleAISuggestion('title')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-purple-600 hover:text-purple-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Enter your current role and click the sparkle for AI suggestions
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Location with AI */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              {...register('location')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="San Francisco Bay Area"
            />
            <button
              type="button"
              onClick={() => handleAISuggestion('location')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-purple-600 hover:text-purple-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Enter your location and click the sparkle for professional formatting
          </p>
        </div>
      </div>
    </form>
  );
}
