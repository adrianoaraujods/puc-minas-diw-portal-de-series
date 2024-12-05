"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

type Params = Record<string, string | string[] | number | number[]>;

export function useSearchParamsState<StateType extends Params>(
  defaultState: StateType,
  schema: z.ZodType<StateType>
): [StateType, React.Dispatch<React.SetStateAction<StateType>>] {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const state: StateType = React.useMemo(() => {
    const urlParams: Params = {};

    if (schema instanceof z.ZodObject) {
      for (const key in schema.shape) {
        const param = searchParams.getAll(key).map((value) => {
          return isNaN(Number(value)) ? value : Number(value);
        });

        if (param.length === 0) {
          urlParams[key] = defaultState[key];

          continue;
        }

        let parsedParam = schema.partial().safeParse({ [key]: param[0] });

        if (!parsedParam.success) {
          parsedParam = schema.partial().safeParse({ [key]: param });

          if (!parsedParam.success) {
            urlParams[key] = defaultState[key];

            continue;
          }
        }

        const value = parsedParam.data[key];

        if (Array.isArray(value)) {
          urlParams[key] = value.map((arrayValue) =>
            isNaN(Number(arrayValue)) ? arrayValue : Number(arrayValue)
          );
        } else if (value !== undefined && value !== "undefined") {
          urlParams[key] = isNaN(Number(value)) ? value : Number(value);
        }
      }
    }

    return { ...defaultState, ...urlParams };
  }, [defaultState, schema, searchParams]);

  const updateURLSearchParams = React.useCallback(
    (params: StateType) => {
      const newURLParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((arrayValue) =>
            newURLParams.append(key, String(arrayValue))
          );
        } else if (value !== undefined && value !== "undefined") {
          newURLParams.set(key, String(value));
        }
      });

      const newURL = `${pathname}?${newURLParams.toString()}`;
      router.replace(newURL, { scroll: false });
    },
    [pathname, router]
  );

  React.useEffect(() => {
    updateURLSearchParams(state);
  }, [state, updateURLSearchParams]);

  const setState = React.useCallback(
    (value: StateType | ((prevState: StateType) => StateType)) => {
      const newParams = typeof value === "function" ? value(state) : value;

      updateURLSearchParams(newParams);
    },
    [state, updateURLSearchParams]
  );

  return [state, setState];
}
