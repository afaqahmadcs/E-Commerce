"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      isLoading = false,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    const baseStyles =
      "relative inline-flex items-center justify-center font-sans tracking-luxury uppercase font-medium transition-all rounded disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const sizeStyles = {
      sm: "px-3.5 py-1.5 text-[10px] tracking-wider",
      md: "px-6 py-3 text-xs tracking-luxury",
      lg: "px-8 py-4 text-xs tracking-luxury sm:text-sm",
    };

    const variantStyles = {
      primary:
        "bg-brand-text hover:bg-brand-dark text-white shadow-sm hover:shadow active:scale-[0.99]",
      secondary:
        "bg-brand-card hover:bg-neutral-200/70 text-brand-text border border-brand-border active:scale-[0.99]",
      outline:
        "bg-transparent border border-brand-border hover:border-brand-text text-brand-text active:scale-[0.99]",
      accent:
        "bg-brand-accent hover:bg-brand-accent-hover text-white shadow-sm hover:shadow active:scale-[0.99]",
      ghost:
        "bg-transparent hover:bg-neutral-200/40 text-brand-text active:scale-[0.99]",
    };

    const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

    if (shouldReduceMotion) {
      return (
        <button
          ref={ref}
          disabled={disabled || isLoading}
          className={combinedClassName}
          {...props}
        >
          {isLoading ? <span className="animate-pulse">PROCESSING...</span> : children}
        </button>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        disabled={disabled || isLoading}
        className={combinedClassName}
        onClick={props.onClick}
        type={props.type}
        id={props.id}
        aria-label={props["aria-label"]}
      >
        {isLoading ? <span className="animate-pulse">PROCESSING...</span> : children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
