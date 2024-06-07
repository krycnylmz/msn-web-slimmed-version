import {create} from 'zustand';

const useUserStore = create(set => ({
  user: {
    name: '',
    email: '',
    profileImage: ''
  },
  setUser: (newUser) => set({ user: newUser }),
  setToken: (token) => set({ token: token })
}));

export default useUserStore;



