import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionVariants = cva("mx-auto w-full p-4 py-8", {
  variants: {
    variant: {
      default: "",
      background: "bg-background text-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      primary: "bg-primary text-primary-foreground",
      muted: "bg-muted text-foreground",
    },
    maxWidth: {
      sm: "md:px-[calc((100vw-768px)/2)]",
      md: "lg:px-[calc((100vw-1024px)/2)]",
      lg: "xl:px-[calc((100vw-1280px)/2)]",
      xl: "2xl:px-[calc((100vw-1536px)/2)]",
    },
  },
  defaultVariants: {
    variant: "default",
    maxWidth: "xl",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {
  asChild?: boolean;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, variant, maxWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "section";

    return (
      <Comp
        className={cn(sectionVariants({ variant, maxWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";

export { Section, sectionVariants };
