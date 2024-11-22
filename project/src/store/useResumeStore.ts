import { create } from 'zustand';
import type { Resume } from '../types/resume';
import { deleteAccount } from '../lib/firebase';

interface ResumeStore {
  resume: Resume;
  updateResume: (resume: Resume) => void;
  deleteAccount: () => void;
}

const initialResume: Resume = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
  },
  summary: '',
  education: [],
  experience: [],
  skills: [],
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialResume,
  updateResume: (resume) => set({ resume }),
  deleteAccount: async () => {
    await deleteAccount();
  },
}));
