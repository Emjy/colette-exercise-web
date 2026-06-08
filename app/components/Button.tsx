import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const VARIANTS = {
  primary: "bg-clay text-white shadow-sm hover:bg-clay-strong active:translate-y-px",
  secondary: "bg-surface text-ink ring-1 ring-line hover:bg-clay-soft hover:ring-clay/30",
  ghost: "text-clay-ink hover:bg-clay-soft",
} as const;

/** The shared button. Reuse this instead of styling raw <button> elements. */
export function Button({
  variant = "primary",
  type = "submit",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,box-shadow,transform] duration-150 disabled:cursor-not-allowed disabled:opacity-55";

  return <button type={type} className={`${base} ${VARIANTS[variant]} ${className}`} {...props} />;
}
