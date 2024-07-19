import type { Button as IButton } from "@/interfaces/page.ts";
import ContactForm from "./ContactForm.tsx";
import { Button } from "./ui/button.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog.tsx";

export interface Props {
  isOpen: boolean;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const fields = [
  { id: 1, label: "Email", placeholder: "Twój adres email" },
  {
    id: 2,
    label: "Wiadomość",
    placeholder: "Napisz w jakiej sprawie chcesz się z nami skontaktować",
  },
];

const formButton: IButton = {
  content: "Wyślij",
  size: "default",
  variant: "secondary",
  id: 1,
  href: "",
};

export default function FormDialog({ isOpen, toggleModal }: Props) {
  return (
    <Dialog onOpenChange={toggleModal} open={isOpen}>
      <DialogContent className="h-dvh w-full gap-6 overflow-y-auto rounded-none p-2 py-5 shadow-green sm:h-auto sm:gap-12 sm:rounded-md md:w-fit md:p-10">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-2xl">Formularz Kontaktowy</DialogTitle>
          <DialogDescription className="text-black">
            Jesteśmy gotowi odpowiedzieć na Twoje pytania, omówić projekty i
            zrealizować Twoje wizje. Nie czekaj, daj nam znać, jak możemy Ci
            pomóc!
          </DialogDescription>
        </DialogHeader>
        <ContactForm fullWidth={true} fields={fields} button={formButton} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" fullwidth={true}>
              Zamknij
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
