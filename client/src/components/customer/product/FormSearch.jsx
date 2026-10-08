import React from "react";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FormSearch = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async ({ name }) => {
    if (name?.trim()) {
      navigate(`/products?search=${encodeURIComponent(name.trim())}`);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex h-12 flex-1 max-w-[680px] items-center rounded-xl border border-gray-200/90 bg-[#f8fafc] hover:border-gray-300 focus-within:border-[#009b7a] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#009b7a]/15 transition-all shadow-2xs"
    >
      <div className="pl-4 pr-2 text-gray-400 flex items-center justify-center shrink-0">
        <Search size={20} className="text-[#009b7a]" />
      </div>

      <input
        {...register("name")}
        type="text"
        required
        placeholder="Bạn muốn tìm điện thoại gì?"
        className="h-full flex-1 bg-transparent px-1 text-sm sm:text-[15px] text-gray-900 outline-none placeholder:text-gray-400 placeholder:text-sm"
      />

      <button
        type="submit"
        className="mr-1.5 h-9 px-5 rounded-lg bg-[#009b7a] hover:bg-[#008266] text-white text-sm font-bold transition-all shadow-xs shrink-0 cursor-pointer hidden sm:flex items-center justify-center"
      >
        Tìm kiếm
      </button>
    </form>
  );
};

export default FormSearch;
