import { Search } from "lucide-react";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

const FormSearch = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm({
    mode: "onTouched",
  });
  const onSubmit = async ({ name }) => {
    navigate(`/products?search=${name}`);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-[52px] flex-1 max-w-[755px] items-center rounded-xl border border-gray-200"
    >
      <input
        {...register("name")}
        type="text"
        required
        placeholder="Hôm nay bạn muốn tìm kiếm gì?"
        className="h-full flex-1 rounded-xl px-5 text-sm outline-none placeholder:text-gray-400"
      />
      <button className="flex h-[30px] items-center gap-2 border-l border-gray-200 px-5 text-[#009b7a]">
        <Search size={22} />
        <span className="text-base">Tìm kiếm</span>
      </button>
    </form>
  );
};

export default FormSearch;
