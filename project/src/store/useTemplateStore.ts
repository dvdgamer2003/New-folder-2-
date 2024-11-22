import { create } from 'zustand';

export type TemplateStyle = 'minimal' | 'creative' | 'professional' | 'modern' | 'classic';
export type DocumentType = 'resume' | 'coverLetter' | 'email';

interface Template {
  id: string;
  name: string;
  style: TemplateStyle;
  type: DocumentType;
  isATSFriendly: boolean;
  previewUrl: string;
  description: string;
  colors: string[];
}

interface TemplateState {
  selectedTemplateId: string | null;
  selectedType: DocumentType;
  templates: Template[];
  documentContent: string;
  links: { url: string; title: string }[];
  setSelectedTemplate: (id: string) => void;
  setSelectedType: (type: DocumentType) => void;
  updateDocumentContent: (content: string) => void;
  addLink: (url: string, title: string) => void;
  removeLink: (url: string) => void;
  updateLink: (oldUrl: string, newUrl: string, newTitle: string) => void;
}

// Sample templates data
const defaultTemplates: Template[] = [
  {
    id: 'clean-slate',
    name: 'Clean Slate',
    style: 'minimal',
    type: 'resume',
    isATSFriendly: true,
    previewUrl: '/images/clean stage.png',
    description: 'A clean and minimal design perfect for any profession. Highly ATS-friendly.',
    colors: ['#ffffff', '#000000', '#f3f4f6'],
  },
  {
    id: 'ats-pro',
    name: 'ATS Professional',
    style: 'professional',
    type: 'resume',
    isATSFriendly: true,
    previewUrl: '/images/ats.jpeg',
    description: 'Optimized for ATS systems while maintaining a professional look.',
    colors: ['#ffffff', '#1a365d', '#e2e8f0'],
  },
  {
    id: 'minimal-cover',
    name: 'Clean Cover',
    style: 'minimal',
    type: 'coverLetter',
    isATSFriendly: true,
    previewUrl: '/images/clean stage.png',
    description: 'A matching cover letter template for the Clean Slate design.',
    colors: ['#ffffff', '#000000', '#f3f4f6'],
  },
  {
    id: 'pro-email',
    name: 'Professional Email',
    style: 'professional',
    type: 'email',
    isATSFriendly: true,
    previewUrl: '/images/ats.jpeg',
    description: 'A professional email template that matches your resume style.',
    colors: ['#ffffff', '#1a365d', '#e2e8f0'],
  },
];

export const useTemplateStore = create<TemplateState>((set) => ({
  selectedTemplateId: null,
  selectedType: 'resume',
  templates: defaultTemplates,
  documentContent: '',
  links: [],
  setSelectedTemplate: (id) => set({ selectedTemplateId: id }),
  setSelectedType: (type) => set({ selectedType: type }),
  updateDocumentContent: (content) => set({ documentContent: content }),
  addLink: (url, title) =>
    set((state) => ({
      links: [...state.links, { url, title }],
    })),
  removeLink: (url) =>
    set((state) => ({
      links: state.links.filter((link) => link.url !== url),
    })),
  updateLink: (oldUrl, newUrl, newTitle) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.url === oldUrl ? { url: newUrl, title: newTitle } : link
      ),
    })),
}));
