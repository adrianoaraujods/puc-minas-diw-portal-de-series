"use client";

import * as React from "react";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FilterIcon } from "lucide-react";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";

import { RESULTS_LENGHT } from "@/lib/constants";
import { Genre, Media, MediaResponse } from "@/lib/shema";

import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MediaCard } from "@/components/layout/media-card";

import FiltersSidebar, {
  OrderSelect,
  PageSelection,
  SearchBar,
} from "./_filters-sidebar";
import { filtersSchema, initialFiltersParams, tableColumns } from "./_table";

export default function List({
  query,
  genres,
}: {
  query: Promise<MediaResponse>;
  genres: Promise<Genre[]>;
}) {
  const { results, total_pages, total_results } = React.use(query);
  const genresList = React.use(genres);

  const [params, setParams] = useSearchParamsState(
    initialFiltersParams,
    filtersSchema
  );

  const columns = React.useMemo<ColumnDef<Media>[]>(() => tableColumns, []);
  const data = React.useMemo(() => results, [results]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    manualPagination: true,
    pageCount: total_pages,

    state: { columnFilters, sorting },
    initialState: {
      pagination: { pageIndex: params.page, pageSize: RESULTS_LENGHT },
    },

    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,

    getRowId: (row, i) =>
      `${i}:${row.name.toLocaleLowerCase().replaceAll(" ", "-")}`,
  });

  return (
    <SidebarProvider defaultOpen>
      <main className="flex w-full flex-col gap-6 px-8 py-4">
        <div className="grid w-full gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <SearchBar params={params} setParams={setParams} />

            <div className="flex flex-wrap items-center gap-2">
              {table.getRowCount() > 0 && (
                <Text>
                  {((params.page - 1) * RESULTS_LENGHT + 1).toLocaleString()}-
                  {(params.page * RESULTS_LENGHT).toLocaleString()} de{" "}
                  {total_results.toLocaleString()}
                </Text>
              )}

              <OrderSelect params={params} setParams={setParams} />

              <SidebarTrigger asChild>
                <Button size="icon" variant="secondary" className="p-0">
                  <FilterIcon className="!size-6" />

                  <span className="sr-only">Abrir Painel de Filtros</span>
                </Button>
              </SidebarTrigger>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {table.getRowCount() > 0 ? (
              table
                .getRowModel()
                .rows.map(({ id, original }) => (
                  <MediaCard key={id} media={original} />
                ))
            ) : (
              <Text>Nenhum resultado Encontrado</Text>
            )}
          </div>

          <div className="w-fit">
            <PageSelection
              params={params}
              setParams={setParams}
              table={table}
            />
          </div>
        </div>
      </main>

      <FiltersSidebar
        genresList={genresList}
        table={table}
        params={params}
        setParams={setParams}
      />
    </SidebarProvider>
  );
}
