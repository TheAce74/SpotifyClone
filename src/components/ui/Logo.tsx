import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  iconClass?: string;
  textClass?: string;
};

export default function Logo({ iconClass, textClass }: LogoProps) {
  return (
    <Link href="/" title="Spotify" className="flex items-center gap-1">
      <Image
        src="/logo-white.svg"
        width={800}
        height={800}
        alt="logo"
        priority
        className={cn("aspect-square w-10", iconClass)}
      />
      <p className={cn("text-xl font-bold", textClass)}>Spotify</p>
    </Link>
  );
}
