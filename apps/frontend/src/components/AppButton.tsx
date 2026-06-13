import React, { ButtonHTMLAttributes } from 'react'

type Variant = "primary" | "secondary" | "danger";
type ClassName = ButtonHTMLAttributes<HTMLButtonElement>["className"];


const baseStyle = "w-20 h-10 inline-flex items-center justify-center hover:opacity-50";

const variantStyles: Record<Variant, ClassName> = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-400 text-white",
  danger: "bg-red-500 text-white"
};


/**
 * tailwindの優先順位は以下に従う
 *
 * className > variant > baseStyle
 */
export function AppButton({
  children,
  variant,
  className,
  ...rest
}: {
  children: React.ReactNode,
  variant: Variant,
  className?: ClassName,
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">
) {
  const styleClass = `${baseStyle} ${variantStyles[variant]} ${className ?? ""}`;

  return (
    <button className={styleClass} {...rest}>
      {children}
    </button>
  )
}
