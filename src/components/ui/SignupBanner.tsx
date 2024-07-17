"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignupBanner() {
  const pathname = usePathname();

  return (
    <Link
      href={{
        pathname: "/signup",
        query: {
          continue: pathname,
        },
      }}
      className="md:flex-starter z-10 mx-3 hidden rounded-lg bg-gradient-to-r from-[#af2896] to-[#509bf5] px-6 py-3"
    >
      <div className="font-semibold">
        <h3 className="text-sm">Preview of Spotify</h3>
        <p>
          Sign up to get unlimited songs and podcasts with occasional ads. No
          credit card needed.
        </p>
      </div>
      <Button>Sign up free</Button>
    </Link>
  );
}
