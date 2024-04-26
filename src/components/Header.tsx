import type {Navigation, Logo, Button as IButton} from "../interfaces/page";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {useState} from "react";

export interface IHeaderProps {
    logo: Logo;
    navigation: Navigation[];
    cta?: IButton;
}

export default function Header({logo, navigation, cta}: IHeaderProps) {
    const [open, setOpen] = useState(false);

    return (
    <>
        <header className="w-full flex items-center justify-between h-20">
            <img src={import.meta.env.STRAPI_URL + logo.data.attributes.url}  alt=""/>
            <nav className="hidden md:flex items-center justify-center gap-5 bg-secondary rounded-lg px-9 py-2">
                {navigation.map(element => <a key={element.id} href={element.href}>{element.title}</a>)}
            </nav>
            {
               cta ? (
                       <Button variant={cta.variant == "default" ? "default" : cta.variant} className="hidden md:flex" >{cta.content}</Button>
               ) : ""
            }
            <Button variant="outline" size="icon" className="md:hidden" onClick={() => setOpen(prev => !prev)}><Menu className="h-4 w-4" /></Button>
        </header>
        <Sheet open={open} onOpenChange={() => setOpen(prev => !prev)}>
            <SheetTrigger asChild>
            </SheetTrigger>
            <SheetContent side="right" className="h-full flex flex-col items-stretch justify-center">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col items-center sm:items-start justify-center gap-5 py-6">
                    {navigation.map(element => <a className="text-lg" key={element.id} href={element.href}>{element.title}</a>)}
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
    </>
    );
}

