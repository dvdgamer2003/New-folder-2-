import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useTemplateStore } from '@/store/useTemplateStore';
import { toast } from 'react-hot-toast';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface CoverLetterForm {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  tone: string;
  highlights: string;
  recipientName: string;
  recipientTitle: string;
}

export default function CoverLetterGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<CoverLetterForm>();
  const { updateDocumentContent } = useTemplateStore();

  const generateCoverLetter = async (data: CoverLetterForm) => {
    setIsGenerating(true);
    try {
      const prompt = `Write a ${data.tone} cover letter for a ${data.jobTitle} position at ${
        data.companyName
      }.\n\nJob Description: ${data.jobDescription}\n\nKey Highlights: ${
        data.highlights || 'Not specified'
      }`;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse = `Dear ${data.recipientName || 'Hiring Manager'},

I am writing to express my strong interest in the ${data.jobTitle} position at ${data.companyName}. With my background and skills, I am confident in my ability to make valuable contributions to your team.

[Rest of the generated cover letter would go here...]

Best regards,
[Your name]`;

      setGeneratedContent(mockResponse);
      updateDocumentContent(mockResponse);
      toast.success('Cover letter generated successfully!');
    } catch (error) {
      toast.error('Failed to generate cover letter. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(generateCoverLetter)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input
              id="recipientName"
              placeholder="e.g. John Smith"
              {...register('recipientName')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientTitle">Recipient Title</Label>
            <Input
              id="recipientTitle"
              placeholder="e.g. Hiring Manager"
              {...register('recipientTitle')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              placeholder="e.g. Acme Corp"
              {...register('companyName', { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              placeholder="e.g. Software Engineer"
              {...register('jobTitle', { required: true })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tone">Tone</Label>
          <Select onValueChange={(value) => register('tone').onChange({ target: { value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
              <SelectItem value="confident">Confident</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobDescription">Job Description *</Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here..."
            className="h-32"
            {...register('jobDescription', { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="highlights">Key Highlights</Label>
          <Textarea
            id="highlights"
            placeholder="Enter your key qualifications and achievements..."
            className="h-24"
            {...register('highlights')}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Cover Letter'
          )}
        </Button>
      </form>

      {generatedContent && (
        <Card className="p-4 mt-6">
          <h3 className="text-lg font-semibold mb-2">Generated Cover Letter</h3>
          <div className="whitespace-pre-wrap">{generatedContent}</div>
        </Card>
      )}
    </div>
  );
}
