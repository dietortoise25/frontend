import useToastStore from "../../store/toastStore";

const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <div className="toast toast-end toast-bottom z-9999">
      {toasts.map((toast) => (
        // <div key={toast.id} className={`alert alert-${toast.type}`}>
        //   <span>{toast.message}</span>
        //   <button className="btn btn-sm btn-ghost" onClick={() => removeToast(toast.id)}>✕</button>
        // </div>
        // <div
        //   key={toast.id}
        //   className="toast"
        // >
        <div
          key={toast.id}
          className={`alert alert-${toast.type}`}
        >
          <span>{toast.message}</span>
        </div>
        // </div>
      ))}
    </div>
  );
};

export default ToastContainer;
