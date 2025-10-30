import * as React from "react";
/**
 * Lightweight replacement for `@radix-ui/react-slot` to avoid adding the dependency.
 * It expects a single React element child and merges passed props into that child via cloneElement.
 */
type SlotProps = {
  children: React.ReactElement;
} & React.HTMLAttributes<HTMLElement>;

export const Slot = ({ children, ...props }: SlotProps) => {
  return React.isValidElement(children)
    ? React.cloneElement(children, Object.assign({}, props as Record<string, unknown>, children.props))
    : null;
};

/**
 * Minimal local replacement for `class-variance-authority`'s `cva` and VariantProps usage
 * to avoid adding the external dependency and its types.
 */
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

import { cn } from "@/lib/utils";

const _base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const variantMap: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeMap: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

const buttonVariants = (options?: { variant?: ButtonVariant; size?: ButtonSize; className?: string }) => {
  const { variant = "default", size = "default", className } = options || {};
  return cn(_base, variantMap[variant], sizeMap[size], className);
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp: any = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...(props as any)} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };