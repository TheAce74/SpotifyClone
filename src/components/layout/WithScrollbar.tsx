"use client";

import { cn } from "@/lib/utils";
import {
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
  DragEvent,
} from "react";

type WithScrollbarProps = PropsWithChildren & {
  className?: string;
};

export default function WithScrollbar({
  children,
  className,
}: WithScrollbarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState(20);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const ariaValueNow = scrollTop;
  const ariaValueMin = 0;
  const ariaValueMax = containerRef.current
    ? containerRef.current.scrollHeight - containerRef.current.clientHeight
    : 0;

  const showScrollbar =
    containerRef.current && contentRef.current
      ? containerRef.current.clientHeight - 30 < contentRef.current.clientHeight
      : false;

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const newThumbHeight = (clientHeight / scrollHeight) * clientHeight;
      setThumbHeight(newThumbHeight);
      setScrollRatio((scrollHeight - clientHeight) / clientHeight);
      setScrollTop((scrollTop / scrollHeight) * clientHeight);
    }
  };

  const handleShowScrollbar = () => {
    scrollbarRef.current?.classList.remove("opacity-0");
  };

  const handleHideScrollbar = () => {
    const timeout = setTimeout(() => {
      scrollbarRef.current?.classList.add("opacity-0");
      clearTimeout(timeout);
    }, 500);
  };

  const handleDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text/plain", "");
    event.dataTransfer.effectAllowed = "move";
    const img = new Image();
    img.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    event.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrag = (event: DragEvent) => {
    if (containerRef.current && event.clientY !== 0) {
      const { scrollHeight, clientHeight } = containerRef.current;
      const deltaY =
        event.clientY -
        containerRef.current.getBoundingClientRect().top -
        thumbHeight / 2;
      const newScrollTop = (deltaY / clientHeight) * scrollHeight;
      containerRef.current.scrollTop = newScrollTop;
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDragEnter = (event: DragEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);
      container.addEventListener("mouseenter", handleShowScrollbar);
      container.addEventListener("mouseleave", handleHideScrollbar);
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("mouseenter", handleShowScrollbar);
        container.removeEventListener("mouseleave", handleHideScrollbar);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-1/2 overflow-y-auto", className)}
      id="scroll-container"
    >
      <div ref={contentRef}>{children}</div>
      {showScrollbar && (
        <div
          className="absolute right-0 top-0 h-full max-h-full opacity-0 transition-all duration-300 md:w-3"
          ref={scrollbarRef}
        >
          <div
            className="w-full bg-neutral-200/30 transition-colors hover:bg-neutral-200/60"
            style={{
              height: `${thumbHeight}px`,
              transform: `translateY(${scrollTop * scrollRatio * 3}px)`,
            }}
            role="scrollbar"
            aria-valuenow={ariaValueNow}
            aria-valuemin={ariaValueMin}
            aria-valuemax={ariaValueMax}
            aria-orientation="vertical"
            aria-controls="scroll-container"
            draggable
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
          />
        </div>
      )}
    </div>
  );
}
