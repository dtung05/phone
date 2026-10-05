import { Outlet } from "react-router";
import Header from "../components/common/layout/Header";
import Footer from "../components/common/layout/Footer";
import { useSelector } from "react-redux";
import Toast from "../components/common/feedback/Toast";


export default function Customer() {
  const toast = useSelector((state) => state.toast);
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      {toast.message && <Toast />}
    </div>
  );
}
