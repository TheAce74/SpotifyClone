import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type SidebarSectionProps = PropsWithChildren & {
  id: string;
  className?: string;
};

export default function SidebarSection({
  children,
  id,
  className,
}: SidebarSectionProps) {
  return (
    <section
      id={id}
      className={cn("rounded-lg bg-neutral-800 px-6 py-5", className)}
    >
      {children}
    </section>
  );
}
