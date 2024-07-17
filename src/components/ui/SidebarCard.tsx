"use client";

import Button from "@/components/ui/Button";

type SidebarCardProps = {
  title: string;
  text: string;
  btn: string;
  handler: "playlist" | "podcast";
};

export default function SidebarCard({
  title,
  text,
  btn,
  handler,
}: SidebarCardProps) {
  const handlePlaylist = () => {};
  const handlePodcast = () => {};

  return (
    <div className="rounded-lg bg-neutral-700 p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm mt-2 mb-5">{text}</p>
      <Button
        onClick={handler === "playlist" ? handlePlaylist : handlePodcast}
        className="!text-sm"
      >
        {btn}
      </Button>
    </div>
  );
}
