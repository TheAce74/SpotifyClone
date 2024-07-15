import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "play";
};

export default function Button({
  children,
  variant,
  type,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      {...otherProps}
      className={cn(buttonVariants({ variant }), className)}
    >
      {children}
    </button>
  );
}

const buttonVariants = cva(
  "hover-effect flex min-w-max items-center justify-center gap-2 rounded-md border-2 border-neutral-100 px-[1em] py-3 text-sm font-semibold hover:scale-105 focus-visible:scale-105 disabled:scale-100 disabled:opacity-60 disabled:brightness-100 sm:gap-4 sm:px-8 sm:text-base",
  {
    variants: {
      variant: {
        primary: "rounded-pill bg-neutral-100 py-[0.4rem] text-neutral-900",
        play: "rounded-circle aspect-square w-12 border-primary bg-primary p-0 text-neutral-900",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);
