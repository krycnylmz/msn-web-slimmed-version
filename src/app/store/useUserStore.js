import {create} from 'zustand';

const useUserStore = create((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));

export default useUserStore;
