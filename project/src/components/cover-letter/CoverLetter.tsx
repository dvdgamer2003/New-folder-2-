import { generatePDF } from '../../utils/pdfGenerator';
import React from 'react';
import CoverLetterGenerator from '../builder/CoverLetterGenerator';
import { Button } from '../ui/button';

export function CoverLetter() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cover Letter Generator</h1>
        <Button variant="outline" onClick={() => generatePDF('cover-letter')}>
          Download PDF
        </Button>
      </div>
      <div id="cover-letter" className="bg-white rounded-lg shadow-lg p-6">
        <CoverLetterGenerator />
      </div>
    </div>
  );
}

export default CoverLetter;
