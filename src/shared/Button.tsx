"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
};

export const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  icon,
  disabled = false,
  loading = false,
  loadingText,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 transition font-medium
      ${disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      ${className}`}
    >
      {loading ? (
        <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon && <span className="flex items-center">{icon}</span>
      )}

      {loading ? loadingText || "Loading..." : children}
    </button>
  );
};
