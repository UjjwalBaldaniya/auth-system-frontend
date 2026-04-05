"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type InputProps = {
  name: string;
  placeholder?: string;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  error?: { message?: string };
  icon?: boolean;
};

export default function Input({
  name,
  placeholder,
  type = "text",
  register,
  error,
  icon,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-4 relative">
      <input
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full px-4 py-2 bg-white border text-gray-700 rounded-lg outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
        }`}
      />

      {icon && isPassword && (
        <span
          className="absolute right-3 top-3 cursor-pointer text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
