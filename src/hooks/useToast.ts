import useToastStore from '../store/toastStore';

interface UseToastReturn {
  addToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning', duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
}

const useToast = (): UseToastReturn => {
  const addToast = useToastStore((state) => state.addToast);
  return {
    addToast,
    showSuccess: (message: string, duration?: number) => addToast(message, 'success', duration),
    showError: (message: string, duration?: number) => addToast(message, 'error', duration),
    showInfo: (message: string, duration?: number) => addToast(message, 'info', duration),
    showWarning: (message: string, duration?: number) => addToast(message, 'warning', duration),
  };
};

export default useToast;