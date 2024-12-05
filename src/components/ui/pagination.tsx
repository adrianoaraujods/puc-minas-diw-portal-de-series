"use client";

import * as React from "react";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import type { ButtonProps } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

interface PaginationLinkProps extends ButtonProps {
  isActive?: boolean;
}

const PaginationLink = ({
  className,
  isActive,
  size,
  ...props
}: PaginationLinkProps) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    variant={isActive ? "outline" : "ghost"}
    size={size || "icon"}
    className={cn(isActive && "cursor-default hover:bg-transparent", className)}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink aria-label="Anterior" {...props}>
      <ChevronLeftIcon className="size-4" />
    </PaginationLink>
  );
};
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationFirst = ({
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink aria-label="Primeiro" {...props}>
      <ChevronFirstIcon className="size-4" />
    </PaginationLink>
  );
};
PaginationFirst.displayName = "PaginationFirst";

const PaginationNext = ({
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink aria-label="Próximo" {...props}>
      <ChevronRightIcon className="size-4" />
    </PaginationLink>
  );
};
PaginationNext.displayName = "PaginationNext";

const PaginationLast = ({
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink aria-label={"Último"} {...props}>
      <ChevronLastIcon className="size-4" />
    </PaginationLink>
  );
};
PaginationLast.displayName = "PaginationLast";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  return (
    <span
      aria-hidden
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">Mais páginas</span>
    </span>
  );
};
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
};
