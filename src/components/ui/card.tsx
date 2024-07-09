import * as React from "react";

import { cn } from "@/lib/utils.ts";

export type shadowColor =
  | "bg-accent"
  | "bg-green"
  | "bg-cyan"
  | "bg-fuchsia"
  | "bg-ocean-green"
  | "bg-orange";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  featured?: boolean;
  shadowcolor?: shadowColor;
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) =>
    props.hover ? (
      <div className="relative group h-full" ref={ref}>
        <div
          className={cn(
            props.featured
              ? "bg-secondary shadow-accent border-none"
              : "bg-card",
            "rounded-xl border-1 border-black text-card-foreground px-[25px] py-[30px] lg:px-[30px] h-full -translate-x-[3px] -translate-y-[3px] group-hover:-translate-x-[6px] group-hover:-translate-y-[6px] transition-transform",
            className
          )}
          {...props}
        />
        <div
          className={cn(
            `${props.shadowcolor ?? "bg-black"}`,
            "absolute top-0 left-0 w-full h-full z-[-1] rounded-xl"
          )}
        ></div>
      </div>
    ) : (
      <div
        ref={ref}
        className={cn(
          props.featured ? "bg-secondary shadow-accent border-none" : "bg-card",
          "rounded-xl border-1 border-black text-card-foreground px-[25px] py-[30px] lg:px-[30px] h-full",
          className
        )}
        {...props}
      />
    )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl lg:text-[32px] font-semibold lg:leading-10",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm lg:text-base text-card-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col justify-between gap-4", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
