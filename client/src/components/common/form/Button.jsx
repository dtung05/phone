import React from "react";
import { Link } from "react-router-dom";
// đồng bộ nút bấm
const baseStyles =
  "inline-flex items-center justify-center gap-1.5 font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

const variants = {
  //nút chính
  primary:
    "bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm shadow-emerald-600/15 border border-transparent",
  // nút phụ
  secondary:
    "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg shadow-2xs",

  //nút màu nhạt
  soft: "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 rounded-lg",
  //nút cảnh báo
  danger:
    "bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 border border-rose-200 rounded-lg",
  // nút tối màu
  dark: "bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-xs border border-transparent",
};

const sizes = {
  xs: "px-2.5 py-1 text-xs",
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-xs",
  lg: "px-4.5 py-2.5 text-sm",
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon,
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  ...props
}) => {
  const sizeClass = sizes[size] || sizes.md;
  const variantClass = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeClass} ${variantClass} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        Icon && <Icon size={size === "lg" ? 16 : 14} className="shrink-0" />
      )}
      {children && <span>{children}</span>}
    </button>
  );
};

export const ButtonLink = ({
  to,
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon,
  ...props
}) => {
  const sizeClass = sizes[size] || sizes.md;
  const variantClass = variants[variant] || variants.primary;

  return (
    <Link
      to={to}
      className={`${baseStyles} ${sizeClass} ${variantClass} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === "lg" ? 16 : 14} className="shrink-0" />}
      {children && <span>{children}</span>}
    </Link>
  );
};

export default Button;
