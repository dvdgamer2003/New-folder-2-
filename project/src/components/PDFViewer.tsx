import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from './ui/button';
import { Download, Eye } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfBlob?: Blob;
  mode?: 'preview' | 'download' | 'both';
}

export function PDFViewer({ pdfBlob, mode = 'both' }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { resume } = useResumeStore();

  const handleDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  const handleDownload = useCallback(() => {
    if (!resume) {
      toast.error('No resume data available');
      return;
    }

    try {
      // Create new PDF document
      const doc = new jsPDF();
      let yPos = 20;

      // Personal Information
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      if (resume.personalInfo?.fullName) {
        doc.text(resume.personalInfo.fullName, 20, yPos);
        yPos += 10;
      }

      // Title
      if (resume.personalInfo?.title) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text(resume.personalInfo.title, 20, yPos);
        yPos += 10;
      }

      // Contact Information
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const contactInfo = [];
      if (resume.personalInfo?.email) contactInfo.push(resume.personalInfo.email);
      if (resume.personalInfo?.phone) contactInfo.push(resume.personalInfo.phone);
      if (resume.personalInfo?.location) contactInfo.push(resume.personalInfo.location);
      
      if (contactInfo.length > 0) {
        doc.text(contactInfo.join(' | '), 20, yPos);
        yPos += 15;
      }

      // Summary
      if (resume.summary) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Professional Summary', 20, yPos);
        yPos += 7;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        const summaryLines = doc.splitTextToSize(resume.summary, 170);
        doc.text(summaryLines, 20, yPos);
        yPos += (summaryLines.length * 7) + 10;
      }

      // Experience
      if (resume.experience && resume.experience.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Professional Experience', 20, yPos);
        yPos += 7;

        resume.experience.forEach((exp) => {
          // Company and Position
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.text(exp.company, 20, yPos);
          
          // Dates
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(11);
          const dateText = `${exp.startDate} - ${exp.endDate || 'Present'}`;
          const dateWidth = doc.getTextWidth(dateText);
          doc.text(dateText, 190 - dateWidth, yPos);
          yPos += 5;

          // Position and Location
          doc.setFont('helvetica', 'normal');
          doc.text(`${exp.position} | ${exp.location}`, 20, yPos);
          yPos += 7;

          // Description
          if (exp.description) {
            doc.setFontSize(10);
            const descriptionLines = doc.splitTextToSize(exp.description, 160);
            doc.text(descriptionLines, 25, yPos);
            yPos += (descriptionLines.length * 5);
          }
          
          yPos += 10;
        });
      }

      // Education
      if (resume.education && resume.education.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Education', 20, yPos);
        yPos += 7;

        resume.education.forEach((edu) => {
          // School
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.text(edu.school, 20, yPos);
          
          // Dates
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(11);
          const dateText = `${edu.startDate} - ${edu.endDate || 'Present'}`;
          const dateWidth = doc.getTextWidth(dateText);
          doc.text(dateText, 190 - dateWidth, yPos);
          yPos += 5;

          // Degree and Field
          doc.setFont('helvetica', 'normal');
          doc.text(`${edu.degree} in ${edu.field}`, 20, yPos);
          yPos += 10;
        });
      }

      // Skills
      if (resume.skills && resume.skills.length > 0) {
        yPos += 5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Skills', 20, yPos);
        yPos += 7;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        const skillsText = resume.skills.join(' • ');
        const skillsLines = doc.splitTextToSize(skillsText, 170);
        doc.text(skillsLines, 20, yPos);
      }

      // Save PDF using a direct method
      const fileName = resume.personalInfo?.fullName 
        ? `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';

      // Create a download link
      const pdfOutput = doc.output('blob');
      const downloadUrl = window.URL.createObjectURL(pdfOutput);
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(downloadUrl);

      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download resume');
    }
  }, [resume]);

  // Preview Section Component
  const PreviewSection = () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {pdfBlob && (
          <Document
            file={pdfBlob}
            onLoadSuccess={handleDocumentLoadSuccess}
            className="pdf-document"
          >
            <Page 
              pageNumber={pageNumber} 
              width={Math.min(window.innerWidth * 0.8, 800)}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        )}
      </div>

      {numPages && numPages > 1 && (
        <div className="flex items-center justify-center space-x-4 mt-4">
          <Button 
            variant="outline" 
            size="icon" 
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
          >
            {'<'}
          </Button>
          <span className="text-sm text-gray-600">Page {pageNumber} of {numPages}</span>
          <Button 
            variant="outline" 
            size="icon" 
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
          >
            {'>'}
          </Button>
        </div>
      )}
    </div>
  );

  // Download Section Component
  const DownloadSection = () => (
    <div className="flex justify-center mt-6">
      <Button 
        onClick={handleDownload}
        className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
      >
        <Download className="w-4 h-4" />
        Download PDF
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      {/* Show preview section if mode is 'preview' or 'both' */}
      {(mode === 'preview' || mode === 'both') && <PreviewSection />}
      
      {/* Show download section if mode is 'download' or 'both' */}
      {(mode === 'download' || mode === 'both') && <DownloadSection />}
    </div>
  );
}
