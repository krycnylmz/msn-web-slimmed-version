import { create } from "zustand";

import { jwtDecode } from "jwt-decode";
const useUserStore = create((set) => ({
  token: null,
  user: null,
  setToken: (token) => {
    set({ token });
    if (token) {
      const decodedUser = jwtDecode(token);
      set({ user: decodedUser });
    } else {
      set({ user: null });
    }
  },
  setUser: (user) => set({ user }),
}));

export default useUserStore;
