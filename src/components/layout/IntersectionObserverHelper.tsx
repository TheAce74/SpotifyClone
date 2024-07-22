"use client";

import DesktopHeader from "@/components/ui/DesktopHeader";
import { PropsWithChildren } from "react";
import { useIntersection } from "@mantine/hooks";

type IntersectionObserverHelperProps = PropsWithChildren;

export default function IntersectionObserverHelper({
  children,
}: IntersectionObserverHelperProps) {
  const { ref, entry } = useIntersection({
    root:
      typeof document !== "undefined"
        ? document.getElementById("intersection-root")
        : null,
    threshold: 0,
    rootMargin: "-200px 0px 0px 0px",
  });

  return (
    <>
      <DesktopHeader intersecting={entry?.isIntersecting ?? true} />
      <div>{children}</div>
      <div ref={ref} className="absolute top-96" />
    </>
  );
}
