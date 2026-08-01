const Toast = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.toast);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hidToast());
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="fixed top-5 right-5 z-50">
      <div className={type === true ? "bg-green-500" : "bg-red-500"}>
        {message}
      </div>
    </div>
  );
};
export default Toast;
