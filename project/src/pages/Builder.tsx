import { useState } from 'react';
import ResumeForm from '../components/builder/ResumeForm';
import ResumePreview from '../components/builder/ResumePreview';
import ResumePDF from '../components/builder/ResumePDF';
import { Eye, PenSquare, FileDown } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

type View = 'edit' | 'preview' | 'pdf';

export default function Builder() {
  const [view, setView] = useState<View>('edit');
  const { resume } = useResumeStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setView('edit')}
              className={`btn ${
                view === 'edit' ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              <PenSquare className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => setView('preview')}
              className={`btn ${
                view === 'preview' ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
            <button
              onClick={() => setView('pdf')}
              className={`btn ${
                view === 'pdf' ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              <FileDown className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          {view === 'edit' && <ResumeForm />}
          {view === 'preview' && <ResumePreview />}
          {view === 'pdf' && <ResumePDF resume={resume} />}
        </div>
      </div>
    </div>
  );
}