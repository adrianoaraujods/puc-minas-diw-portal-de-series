import Link from "next/link";
import { MenuIcon, PopcornIcon } from "lucide-react";

import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSelector } from "@/components/layout/theme-selector";

import { Separator } from "../ui/separator";

export type NavigationLink = { href: string; title: string };

const NAVBAR_LINKS: NavigationLink[] = [
  { href: "/#popular", title: "Populares" },
  { href: "/#recent", title: "Novas" },
  { href: "/#author", title: "Autor" },
  { href: "/#favorites", title: "Favoritas" },
  { href: "/explorer", title: "Explorador" },
];

export default function Navbar() {
  return (
    <Section className="sticky top-0 z-10 border-b bg-background py-2" asChild>
      <header>
        <nav className="relative flex justify-between">
          <Button className="px-0 text-lg" variant="ghost" asChild>
            <Link className="" href="/">
              <PopcornIcon className="!size-6" />

              <Text>PUCorn</Text>
            </Link>
          </Button>

          <ul className="flex gap-1 max-md:hidden lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {NAVBAR_LINKS.map(({ href, title }) => (
              <li key={`navbar-link:${href}`}>
                <Button className="text-lg" variant="ghost" asChild>
                  <Link href={href}>{title}</Link>
                </Button>
              </li>
            ))}
          </ul>

          <div className="flex gap-4">
            <ThemeSelector />

            <Sheet>
              <SheetTrigger className="md:hidden" asChild>
                <Button size="icon" variant="outline" className="rounded-full">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Páginas</SheetTitle>
                </SheetHeader>

                <Separator className="my-4" />

                <ul className="grid gap-1">
                  {NAVBAR_LINKS.map(({ href, title }) => (
                    <li key={`navbar-link:${href}`}>
                      <Button className="block text-lg" variant="ghost" asChild>
                        <Link href={href}>{title}</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </Section>
  );
}
