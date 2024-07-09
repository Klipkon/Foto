import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils.ts";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-white text-black border-[1px] border-black",
      ghost:
        "bg-background border-1 border-white hover:bg-black hover:text-white hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)]",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullwidth?: boolean;
  fontbold?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          className,
          props.fullwidth ? "w-full" : "w-fit",
          "text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative group"
        )}
        ref={ref}
        {...props}
      >
        <div
          className={cn(
            buttonVariants({ variant, size }),
            variant == "ghost"
              ? ""
              : "group-hover:-translate-x-[3px] group-hover:-translate-y-[3px]",
            props.fullwidth ? "w-full" : "w-fit",
            props.fontbold ? "font-bold" : "font-medium",
            "rounded-md inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative transition-transform"
          )}
        >
          {props.children}
        </div>
        <div
          className={cn(
            variant == "default" ? "bg-accent" : "bg-black",
            variant == "ghost" ? "hidden" : "block",
            "w-full h-full absolute top-0 left-0 z-[-1] rounded-md"
          )}
        ></div>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
