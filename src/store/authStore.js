import { create } from 'zustand';

const authStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,
  login: (user, token) => {
    set({ isLoggedIn: true, user, token });
    localStorage.setItem('token', token);
    console.log('login: Storing token in localStorage:', token);
  },
  logout: () => {
    set({ isLoggedIn: false, user: null, token: null });
    localStorage.removeItem('token');
  },
  checkAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ isLoggedIn: true, token });
    }
  },
}));

export default authStore;