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

export const useAdmin = create<IsAdminStore>((set) => ({
  isAdmin: false,
  adminLoginState: () => {
    set((state) => ({ isAdmin: true }));
  },
  adminLogoutState: () => {
    set((state) => ({ isAdmin: false }));
  }
}));

interface ToggleStore {
  recruiting: boolean,
  joined: boolean,
  updateRecuiting: () => void;
  updateJoined: () => void;
}

interface IsAdminStore {
  isAdmin: boolean;
  adminLoginState: () => void;
}