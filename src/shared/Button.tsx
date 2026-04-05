"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
};

export const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  icon,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 transition font-medium cursor-pointer ${className}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
};
