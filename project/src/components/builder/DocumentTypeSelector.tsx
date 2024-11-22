import { DocumentType, useTemplateStore } from '../../store/useTemplateStore';
import { FileText, Mail, FileCheck } from 'lucide-react';

const documentTypes: { type: DocumentType; label: string; icon: any }[] = [
  { type: 'resume', label: 'Resume', icon: FileCheck },
  { type: 'coverLetter', label: 'Cover Letter', icon: FileText },
  { type: 'email', label: 'Professional Email', icon: Mail },
];

export default function DocumentTypeSelector() {
  const { selectedType, setSelectedType } = useTemplateStore();

  return (
    <div className="flex space-x-4 mb-8">
      {documentTypes.map(({ type, label, icon: Icon }) => (
        <button
          key={type}
          onClick={() => setSelectedType(type)}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            selectedType === type
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Icon className="w-5 h-5 mr-2" />
          {label}
        </button>
      ))}
    </div>
  );
}
