"use client";

import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { FiSearch } from "react-icons/fi";
import MobileHeaderMenu from "@/components/ui/MobileHeaderMenu";
import { useSearchParams } from "next/navigation";

export default function MobileHeader() {
  const searchParams = useSearchParams();

  // TODO: this should change depending on the theme color of the current page
  const headerBg = (searchParams.get("theme") as string) ?? "#121212";

  return (
    <header
      className="flex-starter sticky top-0 z-10 px-4 py-2 transition-colors md:hidden"
      style={{
        backgroundColor: headerBg,
      }}
    >
      <Logo />
      <div className="flex-starter gap-5">
        <button className="hover-effect text-xl">
          <FiSearch />
        </button>
        <a href="https://open.spotify.com/?go=1&sp_cid=ffa22879ca5adfc280c0f8c3332616ab&utm_source=spotify_web_player&utm_medium=mobile&fallback=getapp&nd=1&signupPrompt=1&dlsi=982fdfeaadc04abf#login">
          <Button>Open App</Button>
        </a>
        <MobileHeaderMenu />
      </div>
    </header>
  );
}
