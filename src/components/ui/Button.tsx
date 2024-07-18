import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "play" | "inverted";
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
  "hover-effect flex min-w-max items-center justify-center gap-2 rounded-md border border-neutral-100 px-[1em] py-3 text-sm font-semibold hover:scale-105 hover:font-bold focus-visible:scale-105 focus-visible:font-bold disabled:scale-100 disabled:opacity-60 disabled:brightness-100",
  {
    variants: {
      variant: {
        primary: "rounded-pill bg-neutral-100 py-[0.4rem] text-neutral-900",
        play: "aspect-square w-12 rounded-circle border-primary bg-primary p-0 text-neutral-900",
        inverted: "rounded-pill py-[0.4rem]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);
