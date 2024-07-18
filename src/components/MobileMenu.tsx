import { Menu } from "lucide-react";
import type { Navigation } from "../interfaces/header.ts";
import type { Button as IButton } from "../interfaces/page.ts";
import { Button } from "./ui/button.tsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet.tsx";

interface IMobileMenuProps {
  navigation: Navigation[];
  cta?: IButton;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenu({
  navigation,
  cta,
  toggleModal,
}: IMobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="default" className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex h-full flex-col items-center justify-between"
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col items-center justify-center gap-8 py-6 sm:items-start">
          {navigation.map((element) => (
            <a key={element.id} className="text-2xl" href={element.href}>
              {element.title}
            </a>
          ))}
        </nav>
        <SheetFooter className="w-full flex-col items-center gap-4">
          {cta ? (
            <Button
              fullwidth={true}
              variant={cta.variant}
              size={cta.size}
              onClick={() => toggleModal((prev) => !prev)}
            >
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
