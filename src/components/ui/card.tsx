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
      <div className="group relative h-full" ref={ref}>
        <div
          className={cn(
            props.featured
              ? "border-none bg-secondary shadow-accent"
              : "bg-card",
            "h-full -translate-x-[3px] -translate-y-[3px] rounded-xl border-1 border-black px-[25px] py-[30px] text-card-foreground transition-transform group-hover:-translate-x-[6px] group-hover:-translate-y-[6px] lg:px-[30px]",
            className,
          )}
          {...props}
        />
        <div
          className={cn(
            `${props.shadowcolor ?? "bg-black"}`,
            "absolute left-0 top-0 z-[-1] h-full w-full rounded-xl",
          )}
        ></div>
      </div>
    ) : (
      <div
        ref={ref}
        className={cn(
          props.featured ? "border-none bg-secondary shadow-accent" : "bg-card",
          "h-full rounded-xl border-1 border-black px-[25px] py-[30px] text-card-foreground lg:px-[30px]",
          className,
        )}
        {...props}
      />
    ),
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
      "text-2xl font-semibold lg:text-[32px] lg:leading-10",
      className,
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
    className={cn("text-sm text-card-foreground lg:text-base", className)}
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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
