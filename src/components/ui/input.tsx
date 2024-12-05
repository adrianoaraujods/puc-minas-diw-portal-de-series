import * as React from "react";
import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex h-10 w-full rounded-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-input bg-background p-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        ghost:
          "bg-transparent p-0 placeholder:text-current focus:bg-background focus:px-2 focus:placeholder:text-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface DebounceInputProps
  extends Omit<InputProps, "onChange" | "onBlur" | "onKeyDown" | "onFocus"> {
  // eslint-disable-next-line no-unused-vars
  onDebounce: (value: string | number | readonly string[] | undefined) => void;
  delay?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
}

function DebounceInput({
  onDebounce,
  id,
  value,
  delay = 500,
  inputRef: propRef,
  ...props
}: DebounceInputProps) {
  const [inputValue, setInputValue] = React.useState(value);
  const debounceTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const inputRef = React.useRef<HTMLInputElement>(null);

  const ref = propRef || inputRef;

  React.useEffect(() => {
    if (id !== undefined) {
      if (localStorage.getItem(id) === "true" && ref.current) {
        ref.current.focus();
      }
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [ref, id]);

  return (
    <Input
      ref={ref}
      value={inputValue}
      onChange={({ target }) => {
        setInputValue(target.value);

        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
          onDebounce(target.value);
        }, delay);
      }}
      onBlur={() => {
        if (id !== undefined) {
          localStorage.removeItem(id);
        }

        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }

        onDebounce(inputValue);
      }}
      onKeyDown={({ key }) => {
        if (key === "Enter") {
          if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
          }

          onDebounce(inputValue);
        }
      }}
      onFocus={() => {
        if (id !== undefined) {
          localStorage.setItem(id, "true");
        }
      }}
      {...props}
    />
  );
}

export { Input, DebounceInput, inputVariants };
