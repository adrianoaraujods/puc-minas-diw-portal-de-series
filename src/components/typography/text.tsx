import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { ArrowUpRightIcon } from "lucide-react";

import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("border-current", {
  variants: {
    roleType: {
      title: "scroll-m-20 font-semibold tracking-tight",
      subtitle: "scroll-m-16 font-extralight text-muted-foreground",
      paragraph:
        "[&:not(:first-child)]:first-letter:ml-[1.5em] [&:not(:last-child)]:mb-[.5em]",
      text: "",
    },
    variant: {
      normal: "font-normal",
      mono: "font-mono",
      italic: "font-extralight italic",
      bold: "font-bold",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
    },
    element: {
      // Must be an HTML Tag

      h1: "mb-4 text-4xl font-extrabold lg:text-5xl",
      h2: "mb-3 text-4xl",
      h3: "mb-2 text-2xl",
      h4: "mb-1 text-xl",
      span: "text-lg",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
  },
  defaultVariants: {
    roleType: "text",
    variant: "normal",
    element: "span",
  },
});

export interface TextProps
  extends React.HTMLAttributes<
      HTMLHeadingElement | HTMLSpanElement | HTMLParagraphElement
    >,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

const Heading = React.forwardRef<
  HTMLHeadingElement | HTMLSpanElement,
  TextProps
>(
  (
    {
      className,
      element = "span",
      roleType = "title",
      size,
      variant,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : String(element);

    return (
      <Comp
        className={cn(
          textVariants({ element, roleType, size, variant, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

const Text = React.forwardRef<HTMLParagraphElement, Omit<TextProps, "element">>(
  ({ className, size, roleType, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";

    return (
      <Comp
        className={cn("", textVariants({ roleType, size, variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  Omit<TextProps, "element">
>(
  (
    {
      className,
      size,
      roleType = "paragraph",
      variant,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "p";

    return (
      <Comp
        className={cn(textVariants({ roleType, size, variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Paragraph.displayName = "Paragraph";

const Span = React.forwardRef<HTMLSpanElement, Omit<TextProps, "element">>(
  (
    { className, size, roleType = "text", variant, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        className={cn(textVariants({ roleType, size, variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Span.displayName = "Span";

const Anchor = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link>
>(({ children, className, target, ...props }, ref) => {
  const linkTarget: React.ComponentProps<typeof Link>["target"] =
    target || "_blank";

  return (
    <>
      <Link
        className={cn(
          textVariants({ size: "md" }),
          `text-link decoration-link group inline-flex no-underline hover:underline`,
          className
        )}
        target={linkTarget}
        ref={ref}
        {...props}
      >
        <span>{children}</span>

        {linkTarget === "_blank" && (
          <ArrowUpRightIcon className="text-link inline size-4" />
        )}
      </Link>
    </>
  );
});
Anchor.displayName = "Anchor";

export { Anchor, Heading, Paragraph, Span, Text, textVariants };
