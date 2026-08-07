import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../store/slices/toastSlice";

const Toast = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.toast);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      dispatch(hideToast());
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, dispatch]);

  if (!message) return null;

  const typeClass = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500",
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`rounded-lg px-4 py-3 text-white shadow-lg ${
          typeClass[type] || typeClass.info
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
