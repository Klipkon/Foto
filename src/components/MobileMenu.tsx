import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import type {Button as IButton} from "../interfaces/page";
import type {Navigation} from "../interfaces/header";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

interface IMobileMenuProps {
    navigation: Navigation[],
    cta?: IButton
}

export default function MobileMenu({navigation, cta}: IMobileMenuProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden"><Menu className="h-4 w-4" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="h-full flex flex-col items-stretch justify-center">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col items-center sm:items-start justify-center gap-5 py-6">
                    {navigation.map(element => <a key={element.id} className="text-lg" href={element.href}>{element.title}</a>)}
                </nav>
                <SheetFooter className="flex justify-center sm:justify-start">
                    {
                        cta ? (
                            <Button variant={cta.variant == "default" ? "default" : cta.variant}>{cta.content}</Button>
                    ) : ""
                    }
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}