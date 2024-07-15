import MobileHeader from "@/components/ui/MobileHeader";
import { PageSearchParams } from "@/lib/types";

type HomeProps = PageSearchParams;

export default function Home({ searchParams }: HomeProps) {
  return (
    <main>
      <MobileHeader searchParams={searchParams} />
    </main>
  );
}
