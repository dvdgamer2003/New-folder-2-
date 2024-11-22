import { create } from 'zustand';

interface ProfileState {
  message: string;
}

export const useProfileStore = create<ProfileState>((set) => ({
  message: 'Feature coming soon',
  setMessage: (message: string) => set({ message }),
}));
