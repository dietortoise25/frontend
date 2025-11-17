import useToastStore from '../store/toastStore';

const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);
  return {
    addToast,
    showSuccess: (message, duration) => addToast(message, 'success', duration),
    showError: (message, duration) => addToast(message, 'error', duration),
    showInfo: (message, duration) => addToast(message, 'info', duration),
    showWarning: (message, duration) => addToast(message, 'warning', duration),
  };
};

export default useToast;