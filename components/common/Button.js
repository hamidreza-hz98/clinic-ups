import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({
  children,
  variant = "button",
  href = "#",
  outlined = false,
  pill = false,
  type = "button",
  onClick,
  className = "",
}) => {
  const baseStyles =
    "px-4 py-2 font-medium transition-all duration-300 inline-flex items-center justify-center";
  const roundedStyles = pill ? "rounded-full" : "rounded-lg";
  const outlinedStyles = outlined
    ? "border border-primary text-primary bg-transparent hover:bg-surface hover:text-primaryLight"
    : "bg-primary text-surface border-primary hover:bg-surface hover:text-primary hover:border hover:border-primary";

  const finalClassName = twMerge(
    baseStyles,
    roundedStyles,
    outlinedStyles,
    className // this will override previous conflicting styles
  );

  if (variant === "link") {
    return (
      <Link href={href} className={finalClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={finalClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
