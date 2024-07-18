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
    <div className="mb-4 rounded-lg bg-neutral-700 p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="mb-5 mt-2 text-sm">{text}</p>
      <Button onClick={handler === "playlist" ? handlePlaylist : handlePodcast}>
        {btn}
      </Button>
    </div>
  );
}
