import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet.tsx";
import type { Button as IButton } from "../interfaces/page.ts";
import type { Navigation } from "../interfaces/header.ts";
import { Button } from "./ui/button.tsx";
import { Menu } from "lucide-react";

interface IMobileMenuProps {
  navigation: Navigation[];
  cta?: IButton;
}

export default function MobileMenu({ navigation, cta }: IMobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="default" className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="h-full flex flex-col items-center justify-between"
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col items-center sm:items-start justify-center gap-8 py-6">
          {navigation.map((element) => (
            <a key={element.id} className="text-2xl" href={element.href}>
              {element.title}
            </a>
          ))}
        </nav>
        <SheetFooter className="flex-col items-center gap-4 w-full">
          {cta ? (
            <Button variant={cta.variant} fullwidth={true}>
              {cta.content}
            </Button>
          ) : (
            ""
          )}
          <SheetClose asChild>
            <Button type="submit" variant="secondary" fullwidth={true}>
              Zamknij
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
