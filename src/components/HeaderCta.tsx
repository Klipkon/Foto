import type { Navigation } from "@/interfaces/header.ts";
import type { Button as IButton } from "@/interfaces/page.ts";
import { useState } from "react";
import FormDialog from "./FormDialog.tsx";
import MobileMenu from "./MobileMenu.tsx";
import { Button } from "./ui/button.tsx";

export interface Props {
  cta: IButton;
  navigation: Navigation[];
}

export default function HeaderCta({ cta, navigation }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {cta ? (
        <Button
          variant={cta.variant}
          size={cta.size}
          className="hidden lg:flex"
          onClick={() => setOpen((prev) => !prev)}
        >
          {cta.content}
        </Button>
      ) : (
        ""
      )}
      <MobileMenu navigation={navigation} cta={cta} toggleModal={setOpen} />
      <FormDialog toggleModal={setOpen} isOpen={open} />
    </>
  );
}
