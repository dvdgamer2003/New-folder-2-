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
import { Loader2, Copy, Check } from 'lucide-react';
import { useTemplateStore } from '@/store/useTemplateStore';
import { toast } from 'react-hot-toast';

interface EmailForm {
  recipientName: string;
  recipientTitle: string;
  company: string;
  purpose: string;
  tone: string;
  additionalContext: string;
}

export default function EmailGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const { register, handleSubmit, watch } = useForm<EmailForm>();
  const { updateDocumentContent } = useTemplateStore();

  const generateEmail = async (data: EmailForm) => {
    setIsGenerating(true);
    try {
      // This would be replaced with actual AI API call
      const prompt = `Write a ${data.tone} email for ${data.purpose} to ${
        data.recipientName
      } (${data.recipientTitle}) at ${
        data.company
      }.\n\nAdditional Context: ${
        data.additionalContext || 'Not specified'
      }`;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse = `Subject: ${data.purpose} - [Your Name]

Dear ${data.recipientName},

I hope this email finds you well. I am writing regarding...

[Rest of the generated email would go here...]

Best regards,
[Your name]`;

      setGeneratedContent(mockResponse);
      updateDocumentContent(mockResponse);
      toast.success('Email generated successfully!');
    } catch (error) {
      console.error('Error generating email:', error);
      toast.error('Failed to generate email. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Email Details</h3>
          <form onSubmit={handleSubmit(generateEmail)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Recipient Name</label>
              <Input {...register('recipientName')} placeholder="Enter recipient's name" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Recipient Title</label>
              <Input {...register('recipientTitle')} placeholder="Enter recipient's title" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <Input {...register('company')} placeholder="Enter company name" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Purpose</label>
              <Select defaultValue="job-application" onValueChange={(value) => register('purpose').onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select email purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job-application">Job Application</SelectItem>
                  <SelectItem value="follow-up">Interview Follow-up</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="thank-you">Thank You</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tone</label>
              <Select defaultValue="professional" onValueChange={(value) => register('tone').onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Additional Context</label>
              <Textarea
                {...register('additionalContext')}
                placeholder="Any additional context or specific points to include"
                className="h-24"
              />
            </div>

            <Button type="submit" disabled={isGenerating} className="w-full">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Email'
              )}
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Generated Email</h3>
            {generatedContent && (
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            )}
          </div>
          <Textarea
            value={generatedContent}
            onChange={(e) => {
              setGeneratedContent(e.target.value);
              updateDocumentContent(e.target.value);
            }}
            placeholder="Your generated email will appear here..."
            className="h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}
