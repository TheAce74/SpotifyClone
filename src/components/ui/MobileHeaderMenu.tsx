import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const first = [
  {
    text: "Log in",
    path: "/login",
  },
  {
    text: "Sign up",
    path: "/signup",
  },
];

const second = [
  {
    text: "Premium",
    path: "/premium",
  },
  {
    text: "Help",
    path: "/support",
  },
  {
    text: "Download",
    path: "/download",
  },
  {
    text: "Privacy",
    path: "/legal/privacy-policy",
  },
  {
    text: "Terms",
    path: "/legal/end-user-agreement",
  },
];

export default function MobileHeaderMenu() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", disableContextMenu);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  return (
    <>
      <button
        className="hover-effect text-2xl"
        aria-controls="primary-navigation-mobile"
        aria-expanded={openMenu}
        aria-label="open menu"
        onClick={() => setOpenMenu(true)}
      >
        <AiOutlineMenu />
      </button>
      <nav
        id="primary-navigation-mobile"
        className={cn(
          "fixed inset-0 z-20 bg-neutral-900 px-8 py-6 font-bold transition-all duration-500",
          {
            "translate-x-full opacity-0": !openMenu,
            "translate-x-0 opacity-100": openMenu,
          },
        )}
      >
        <button
          className="ml-auto block w-max text-2xl"
          onClick={() => setOpenMenu(false)}
          aria-label="close menu"
        >
          <AiOutlineClose />
        </button>
        <ul>
          {first.map((link) => (
            <li key={link.text}>
              <Link
                href={{
                  pathname: link.path,
                  query: {
                    continue: pathname,
                  },
                }}
                className="block py-2 text-2xl transition-transform hover:-translate-x-2 focus-visible:-translate-x-2"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mb-6 mt-8 h-[0.1rem] w-3 bg-neutral-100" />
        <ul>
          {second.map((link) => (
            <li key={link.text}>
              <Link
                href={link.path}
                target="_blank"
                className="block py-2 transition-transform hover:-translate-x-2 focus-visible:-translate-x-2"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
