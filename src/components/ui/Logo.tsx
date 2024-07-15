import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" title="Spotify" className="flex items-center gap-2">
      <Image
        src="/logo-white.svg"
        width={800}
        height={800}
        alt="logo"
        priority
        className="aspect-square w-10"
      />
      <p className="text-xl font-bold">Spotify</p>
    </Link>
  );
}
