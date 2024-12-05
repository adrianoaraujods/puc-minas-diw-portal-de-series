import { z } from "zod";

import type { ColumnDef } from "@tanstack/react-table";

import { Media } from "@/lib/shema";
import { formatStringForSearch } from "@/lib/utils";

export const tableColumns: ColumnDef<Media>[] = [
  {
    id: "name",
    accessorFn: ({ name }) => formatStringForSearch(name),
    filterFn: ({ original: { name } }, _, filterValue) => {
      return formatStringForSearch(name).includes(
        formatStringForSearch(filterValue)
      );
    },
  },
  {
    accessorKey: "genre_ids",
  },
  {
    accessorKey: "first_air_date",
    filterFn: "inNumberRange",
  },
  {
    accessorKey: "popularity",
  },
  {
    accessorKey: "vote_count",
  },
];

export const SORT_KEYS = [
  "name",
  "first_air_date",
  "popularity",
  "vote_count",
] as const;

export const SORT_KEYS_LABELS: Record<(typeof SORT_KEYS)[number], string> = {
  name: "Nome",
  first_air_date: "Data de Lançamento",
  popularity: "Popularidade",
  vote_count: "Avaliação",
};

export const filtersSchema = z.object({
  order: z.enum(["asc", "desc"]),
  page: z.number(),
  sort: z.enum(SORT_KEYS),

  combine: z.enum(["true"]).optional(),
  name: z.string().optional(),
  initialDate: z.string().optional(),
  finalDate: z.string().optional(),
  genres: z.array(z.number()).optional(),
});

export type FiltersParams = z.infer<typeof filtersSchema>;

export const initialFiltersParams: FiltersParams = {
  page: 1,
  order: "desc",
  sort: "popularity",
};
