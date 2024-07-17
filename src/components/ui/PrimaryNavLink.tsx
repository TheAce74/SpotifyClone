"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type PrimaryNavLinkProps = {
  path: string;
  text: string;
  icon: ReactNode;
  iconActive: ReactNode;
};

export default function PrimaryNavLink({
  path,
  text,
  icon,
  iconActive,
}: PrimaryNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={cn(
        "mt-6 flex items-center gap-6 font-bold transition-colors duration-500",
        {
          "text-neutral-200 hover:text-neutral-100 focus-visible:text-neutral-100":
            !isActive,
          "text-neutral-100": isActive,
        },
      )}
    >
      <span className="text-2xl">{!isActive ? icon : iconActive}</span>
      <p>{text}</p>
    </Link>
  );
}
