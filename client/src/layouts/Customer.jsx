import { Outlet } from "react-router";
import Header from "../components/block/Header";
import Footer from "../components/block/Footer";
import { useSelector } from "react-redux";
import Toast from "../components/block/Toast";


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
