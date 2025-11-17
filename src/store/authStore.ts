import { create } from 'zustand';
import type { User } from '../types/api';

interface AuthStore {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

const authStore = create<AuthStore>((set) => ({
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