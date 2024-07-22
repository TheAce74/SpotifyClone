import Button from "@/components/ui/Button";
import { ButtonVariants } from "@/lib/types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

type DesktopHeaderProps = { intersecting: boolean };

const links: {
  text: string;
  path: string;
  variant: ButtonVariants;
}[] = [
  {
    text: "Sign up",
    path: "/signup",
    variant: "invisible",
  },
  {
    text: "Log in",
    path: "/login",
    variant: "primary",
  },
];

export default function DesktopHeader({ intersecting }: DesktopHeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // TODO: this should change depending on the theme color of the current page
  const headerBg = (searchParams.get("theme") as string) ?? "#121212";

  return (
    <header
      className="md:flex-starter sticky top-0 hidden bg-neutral-900/50 px-6 py-3 transition-colors duration-500"
      style={{
        backgroundColor: !intersecting ? headerBg : "",
      }}
    >
      <div
        aria-label="navigation buttons"
        className="flex items-center gap-2 text-2xl"
      >
        <button
          disabled
          aria-label="go back"
          className="rounded-circle bg-neutral-900 p-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GoChevronLeft />
        </button>
        <button
          disabled
          aria-label="go forward"
          className="rounded-circle bg-neutral-900 p-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GoChevronRight />
        </button>
      </div>
      <ul className="flex items-center gap-2">
        {links.map((link) => (
          <li key={link.text}>
            <Link
              href={{
                pathname: link.path,
                query: {
                  continue: pathname,
                },
              }}
            >
              <Button
                variant={link.variant}
                className="px-8 py-2 text-base font-bold"
              >
                {link.text}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
