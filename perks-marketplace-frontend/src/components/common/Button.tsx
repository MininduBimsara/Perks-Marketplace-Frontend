import React from "react"

function cn(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(" ")
}

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "warning" | "danger" | "success" | "info"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
}

export const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ variant = "primary", size = "md", fullWidth = false, className, ...props }, ref) => {
    let variantStyles = ""
    let sizeStyles = ""

    // Variant styles
    if (variant === "primary") {
      variantStyles = "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border-0"
    } else if (variant === "secondary") {
      variantStyles =
        "bg-transparent text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100"
    } else if (variant === "warning") {
      variantStyles = "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 border-0"
    } else if (variant === "danger") {
      variantStyles = "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border-0"
    } else if (variant === "success") {
      variantStyles = "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 border-0"
    } else if (variant === "info") {
      variantStyles = "bg-cyan-500 text-white hover:bg-cyan-600 active:bg-cyan-700 border-0"
    }

    // Size styles
    if (size === "sm") {
      sizeStyles = "px-3 py-1.5 text-sm rounded-md"
    } else if (size === "md") {
      sizeStyles = "px-4 py-2 text-base rounded-lg"
    } else if (size === "lg") {
      sizeStyles = "px-6 py-3 text-lg rounded-lg"
    }

    const baseStyles =
      "font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    const widthStyles = fullWidth ? "w-full" : ""

    return <button ref={ref} className={cn(baseStyles, variantStyles, sizeStyles, widthStyles, className)} {...props} />
  },
)

CustomButton.displayName = "CustomButton"
/**
 * import { CustomButton } from '@/components/custom-button';

export default function App() {
  return (
    <>
      <CustomButton variant="primary" size="md">
        Click Me
      </CustomButton>

      
      <CustomButton variant="secondary" size="lg">
        Secondary
      </CustomButton>

      
      <CustomButton variant="danger" size="sm">
        Delete
      </CustomButton>

      
      <CustomButton variant="success" fullWidth>
        Submit
      </CustomButton>
    </>
  );
}
 */