import { create } from "zustand";

export const useToggle = create<ToggleStore>((set) => ({
  recruiting: false,
  joined: false,
  updateRecuiting: () => {
    set((state) => ({ recruiting: !state.recruiting }))
  },
  updateJoined: () => {
    set((state) => ({ joined: !state.joined }))
  }
}));

interface ToggleStore {
  recruiting: boolean,
  joined: boolean,
  updateRecuiting: () => void;
  updateJoined: () => void;
}