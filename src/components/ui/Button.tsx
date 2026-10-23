"use client";

/**
 * Shared button primitive.
 *
 * Every action on the site goes through this component so height, radius,
 * type treatment, focus ring and press feedback stay identical. Colour only
 * ever comes from design tokens.
 */

import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "onBrand"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretches the button to the width of its container. */
  fullWidth?: boolean;
}

const BASE =
  "inline-flex select-none items-center justify-center gap-2 rounded-control font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

/**
 * The focus ring colour follows the surface the button sits on: brand green on
 * light surfaces, white on the green call-to-action band.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark focus-visible:outline-brand",
  secondary:
    "border border-line bg-white text-ink hover:border-muted/50 hover:text-brand focus-visible:outline-brand",
  ghost:
    "text-ink hover:bg-surface hover:text-brand focus-visible:outline-brand",
  onBrand:
    "bg-white text-brand-dark hover:bg-brand-light focus-visible:outline-white",
  danger:
    "border border-line bg-white text-muted hover:border-danger hover:text-danger focus-visible:outline-brand",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${
          fullWidth ? "w-full" : ""
        } ${className}`}
        {...props}
      />
    );
  },
);
