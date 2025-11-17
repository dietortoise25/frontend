import { create } from "zustand";
import type { Toast } from "../types/api";

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type'], duration?: number) => void;
  removeToast: (id: string) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type = "info", duration = 3000) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type: type as Toast['type'], duration };
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export default useToastStore;
