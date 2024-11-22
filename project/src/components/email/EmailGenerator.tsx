import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EmailGenerator() {
  const [step, setStep] = useState('compose');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    subject: '',
    emailType: 'application',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, emailType: value }));
  };

  const handleCopy = async () => {
    const content = generateEmail();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateEmail = () => {
    const emailTemplates = {
      application: `Dear ${formData.recipientName || 'Hiring Manager'},

${formData.message}

Thank you for considering my application. I look forward to discussing this opportunity further.

Best regards,
[Your Name]`,
      followup: `Dear ${formData.recipientName},

I hope this email finds you well. ${formData.message}

Thank you for your time and consideration.

Best regards,
[Your Name]`,
      networking: `Dear ${formData.recipientName},

${formData.message}

I appreciate your time and look forward to connecting.

Best regards,
[Your Name]`
    };

    return emailTemplates[formData.emailType as keyof typeof emailTemplates];
  };

  const isFormValid = () => {
    return formData.recipientEmail && formData.subject && formData.message;
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Professional Email Generator</h1>
        
        <Tabs value={step} onValueChange={setStep} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="preview">Preview & Copy</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="mt-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="recipientName">Recipient's Name</Label>
                    <Input
                      id="recipientName"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleInputChange}
                      placeholder="Enter recipient's name"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="recipientEmail">Recipient's Email</Label>
                    <Input
                      id="recipientEmail"
                      name="recipientEmail"
                      type="email"
                      value={formData.recipientEmail}
                      onChange={handleInputChange}
                      placeholder="Enter recipient's email"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Enter email subject"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="emailType">Email Type</Label>
                    <Select 
                      value={formData.emailType} 
                      onValueChange={handleEmailTypeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select email type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="application">Job Application</SelectItem>
                        <SelectItem value="followup">Follow-up</SelectItem>
                        <SelectItem value="networking">Networking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="message">Email Content</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your email content here..."
                      className="min-h-[200px]"
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => setStep('preview')} 
                  disabled={!isFormValid()}
                >
                  Continue to Preview
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Preview</h2>
                  <Button onClick={handleCopy}>
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">To: {formData.recipientEmail}</p>
                  <p className="text-sm text-muted-foreground">Subject: {formData.subject}</p>
                </div>
                <div className="p-8 border rounded-lg bg-muted whitespace-pre-wrap font-mono">
                  {generateEmail()}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
