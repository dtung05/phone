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

  return (
    <div className="fixed top-5 right-5 z-50">
      <div className={type === true ? "bg-green-500" : "bg-red-500"}>
        {message}
      </div>
    </div>
  );
};
export default Toast;
