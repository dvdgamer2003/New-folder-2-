import { useState } from 'react';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';
import { downloadPDF } from '@/utils/pdfDownloader';
import { toast } from 'react-hot-toast';

type Step = 'form' | 'preview';

export function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState<Step>('form');
  const [isDownloading, setIsDownloading] = useState(false);
  const { resume } = useResumeStore();

  const steps = {
    form: {
      component: <ResumeForm />,
      next: 'preview',
      prev: null,
      title: 'Fill Details'
    },
    preview: {
      component: <ResumePreview />,
      next: null,
      prev: 'form',
      title: 'Preview & Download'
    }
  };

  const currentStepConfig = steps[currentStep];

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadPDF(resume);
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Failed to download resume. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Progress Steps */}
        <div className="flex justify-center items-center space-x-4">
          {Object.entries(steps).map(([step, config], index) => (
            <div
              key={step}
              className="flex items-center"
            >
              <div
                className={`flex items-center cursor-pointer ${
                  currentStep === step ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => {
                  if (step === 'form' || currentStep === 'preview') {
                    setCurrentStep(step as Step);
                  }
                }}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep === step
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2">{config.title}</span>
              </div>
              {index < Object.entries(steps).length - 1 && (
                <div className="w-24 h-px bg-muted-foreground mx-4" />
              )}
            </div>
          ))}
        </div>

        {/* Current Step Content */}
        <div>{currentStepConfig.component}</div>

        {/* Navigation */}
        <div className="flex justify-between">
          {currentStepConfig.prev && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStepConfig.prev as Step)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <div className="flex-1" />
          <div className="flex gap-2">
            {currentStep === 'preview' && (
              <Button
                variant="default"
                onClick={handleDownload}
                disabled={isDownloading}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? 'Generating PDF...' : 'Download PDF'}
              </Button>
            )}
            {currentStepConfig.next && (
              <Button onClick={() => setCurrentStep(currentStepConfig.next as Step)}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
