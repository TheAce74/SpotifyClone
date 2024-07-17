import Button from "@/components/ui/Button";
import LibraryIcon from "@/components/ui/LibraryIcon";
import Logo from "@/components/ui/Logo";
import PrimaryNavLink from "@/components/ui/PrimaryNavLink";
import SidebarCard from "@/components/ui/SidebarCard";
import SidebarSection from "@/components/layout/SidebarSection";
import Link from "next/link";
import { GoGlobe, GoHome, GoHomeFill, GoPlus } from "react-icons/go";
import { PiMagnifyingGlass, PiMagnifyingGlassFill } from "react-icons/pi";

const primaryNav = [
  {
    text: "Home",
    path: "/",
    icon: <GoHome />,
    iconActive: <GoHomeFill />,
  },
  {
    text: "Search",
    path: "/search",
    icon: <PiMagnifyingGlass />,
    iconActive: <PiMagnifyingGlassFill />,
  },
];

const footerLinks = [
  {
    text: "Legal",
    path: "/legal",
  },
  {
    text: "Safety & Privacy Center",
    path: "/safetyandprivacy",
  },
  {
    text: "Privacy Policy",
    path: "/legal/privacy-policy",
  },
  {
    text: "Cookies",
    path: "/cookies/privacy-policy",
  },
  {
    text: "About Ads",
    path: "/legal/privacy-policy#s3",
  },
  {
    text: "Accessibility",
    path: "/accessibility",
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 z-10 hidden md:flex md:h-[calc(100dvh_-_6.5rem)] md:flex-col">
      <SidebarSection id="navigation">
        <Logo iconClass="w-6" textClass="text-base" />
        <nav>
          <ul id="primary-navigation-desktop">
            {primaryNav.map((link) => (
              <li key={link.text}>
                <PrimaryNavLink {...link} />
              </li>
            ))}
          </ul>
        </nav>
      </SidebarSection>
      <SidebarSection id="library" className="mt-3 flex-1 overflow-y-hidden">
        <header className="flex-starter pb-4">
          <button className="flex items-center gap-3 font-bold text-neutral-200 transition-colors duration-500 hover:text-neutral-100 focus-visible:text-neutral-100">
            <LibraryIcon className="aspect-square w-6 fill-current" />
            <h2>Your Library</h2>
          </button>
          <button className="rounded-circle p-1 text-2xl text-neutral-200 transition-colors duration-500 hover:bg-neutral-200/10 hover:text-neutral-100 focus-visible:bg-neutral-200/10 focus-visible:text-neutral-100 active:bg-neutral-900">
            <GoPlus />
          </button>
        </header>
        <div className="h-[45%] overflow-y-auto">
          <SidebarCard
            title="Create your first playlist"
            text="It's easy, we'll help you"
            btn="Create playlist"
            handler="playlist"
          />
          <SidebarCard
            title="Let's find some podcasts to follow"
            text="we'll keep you updated on new episodes"
            btn="Browse podcasts"
            handler="podcast"
          />
        </div>
        <footer className="py-8">
          <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            {footerLinks.map((link) => (
              <Link
                key={link.text}
                href={link.path}
                className="hover-effect text-neutral-200"
              >
                {link.text}
              </Link>
            ))}
          </div>
          <Button variant="inverted" className="!gap-1 !px-4 !text-sm">
            <GoGlobe />
            <p>English</p>
          </Button>
        </footer>
      </SidebarSection>
    </aside>
  );
}
