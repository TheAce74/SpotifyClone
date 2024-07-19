"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useRef } from "react";
import { useOverlayScrollbars } from "overlayscrollbars-react";

type WithScrollbarProps = PropsWithChildren & {
  className?: string;
};

export default function WithScrollbar({
  children,
  className,
}: WithScrollbarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [initialize] = useOverlayScrollbars({
    options: {
      scrollbars: {
        autoHide: "leave",
        autoHideDelay: 500,
      },
    },
  });

  useEffect(() => {
    if (containerRef.current) {
      initialize(containerRef.current);
    }
  }, [initialize]);

  return (
    <div ref={containerRef} className={cn("h-1/2 overflow-y-auto", className)}>
      {children}
    </div>
  );
}
