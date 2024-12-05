"use client";

import * as React from "react";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  SearchIcon,
} from "lucide-react";

import type { Table } from "@tanstack/react-table";

import { Genre, Media } from "@/lib/shema";
import { formatDateToInput } from "@/lib/utils";

import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";

import {
  FiltersParams,
  filtersSchema,
  initialFiltersParams,
  SORT_KEYS,
  SORT_KEYS_LABELS,
} from "./_table";

export default function FiltersSidebar({
  table,
  genresList,
  params,
  setParams,
}: {
  genresList: Genre[];
  table: Table<Media>;
  params: FiltersParams;
  setParams: React.Dispatch<React.SetStateAction<FiltersParams>>;
}) {
  const { order, sort } = params;

  React.useEffect(() => {
    table.setSorting([{ id: sort, desc: order === "desc" }]);
  }, [order, sort, table]);

  return (
    <Sidebar
      variant="floating"
      side="right"
      className="right-8 top-16 h-fit pl-4"
    >
      <SidebarContent className="p-4">
        <GenresFilter
          params={params}
          setParams={setParams}
          genresList={genresList}
        />

        <DateFilter params={params} setParams={setParams} />

        <PageSelection table={table} params={params} setParams={setParams} />
      </SidebarContent>
    </Sidebar>
  );
}

export function GenresFilter({
  params: { genres, combine },
  genresList,
  setParams,
}: {
  params: FiltersParams;
  genresList: Genre[];
  setParams: React.Dispatch<React.SetStateAction<FiltersParams>>;
}) {
  return (
    <div className="grid w-full gap-4 border-b pb-8">
      <div className="flex items-center justify-between">
        <Text variant="bold">Gêneros e Categorias</Text>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            if ((genres && genres.length > 0) || combine) {
              setParams((prev) => ({
                ...prev,
                combine: undefined,
                genres: undefined,
              }));
            }
          }}
        >
          Limpar
        </Button>
      </div>

      <div className="flex max-w-96 flex-wrap gap-2">
        {genresList.map(({ id, name }) => (
          <Button
            className={"rounded-full"}
            variant={genres && genres.includes(id) ? "secondary" : "outline"}
            key={`genre:${id}`}
            onClick={() => {
              setParams((prev) => {
                const genres = [...(prev.genres || [])];

                return {
                  ...prev,
                  genres: genres.includes(id)
                    ? genres.filter((i) => i !== id)
                    : [...genres, id],
                };
              });
            }}
          >
            {name}
          </Button>
        ))}
      </div>

      <div className="ml-4 flex items-center gap-2">
        <Label htmlFor="combine">Combinar ?</Label>
        <Switch
          id="combine"
          onCheckedChange={() => {
            setParams((prev) => {
              return { ...prev, combine: !prev.combine ? "true" : undefined };
            });
          }}
        />
      </div>
    </div>
  );
}

export function DateFilter({
  params: { initialDate, finalDate },
  setParams,
}: {
  params: FiltersParams;
  setParams: React.Dispatch<React.SetStateAction<FiltersParams>>;
}) {
  return (
    <div className="grid w-full gap-4 border-b pb-8">
      <div className="flex items-center justify-between">
        <Text variant="bold">Data de Lançamento</Text>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            if (initialDate !== undefined || finalDate !== undefined) {
              setParams((prev) => ({
                ...prev,
                initialDate: undefined,
                finalDate: undefined,
              }));
            }
          }}
        >
          Limpar
        </Button>
      </div>

      <div className="grid w-fit gap-2">
        <div className="grid grid-cols-[1fr,auto] items-center gap-2">
          <Label htmlFor="initialDate">De</Label>
          <Input
            id="initialDate"
            type="date"
            value={(initialDate && formatDateToInput(initialDate)) || ""}
            onChange={({ target: { value } }) => {
              const updated = formatDateToInput(value);

              if (updated !== formatDateToInput(initialDate)) {
                setParams((prev) => ({
                  ...prev,
                  initialDate: updated,
                }));
              }
            }}
          />
        </div>

        <div className="grid grid-cols-[1fr,auto] items-center gap-2">
          <Label htmlFor="finalDate">Até</Label>
          <Input
            id="finalDate"
            type="date"
            value={(finalDate && formatDateToInput(finalDate)) || ""}
            onChange={({ target: { value } }) => {
              const updated = formatDateToInput(value);

              if (updated !== formatDateToInput(finalDate)) {
                setParams((prev) => ({
                  ...prev,
                  finalDate: updated,
                }));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function SearchBar({
  params: { name },
  setParams,
}: {
  params: FiltersParams;
  setParams: React.Dispatch<React.SetStateAction<FiltersParams>>;
}) {
  const [search, setSearch] = React.useState<string>(name || "");

  function handleSearch() {
    if (name !== search) {
      setParams((prev) => ({ ...prev, name: search }));
    }
  }

  return (
    <div className="grid w-full max-w-screen-sm grid-cols-[auto,1fr] gap-4">
      <Button size="icon" variant="secondary" onClick={() => handleSearch()}>
        <SearchIcon />
      </Button>

      <Input
        id="name"
        type="search"
        placeholder="Pesquisar pelo nome..."
        onChange={({ target: { value } }) => setSearch(value)}
        onKeyDown={({ key }) => key === "Enter" && handleSearch()}
        value={search}
      />
    </div>
  );
}

export function PageSelection({
  table,
  params: { page },
  setParams,
}: {
  table: Table<Media>;
  params: FiltersParams;
  setParams: React.Dispatch<React.SetStateAction<FiltersParams>>;
}) {
  const {
    pagination: { pageIndex },
  } = table.getState();
  const lastPage = table.getPageCount();

  const [{ page: currentPage }] = useSearchParamsState(
    initialFiltersParams,
    filtersSchema
  );

  React.useEffect(() => {
    const maxPage = Math.min(page, table.getPageCount());

    table.setPageIndex(maxPage);

    setParams((prev) => ({ ...prev, page: maxPage }));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, setParams, table]);

  return lastPage <= 1 ? null : (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            disabled={pageIndex === 1}
            onClick={() => setParams((prev) => ({ ...prev, page: 1 }))}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            disabled={pageIndex === 1}
            onClick={() =>
              setParams((prev) => ({ ...prev, page: currentPage - 1 }))
            }
          />
        </PaginationItem>

        {currentPage - 2 > 0 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage - 1 > 0 && (
          <PaginationItem>
            <PaginationLink
              onClick={() =>
                setParams((prev) => ({ ...prev, page: currentPage - 1 }))
              }
            >
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>

        {lastPage >= currentPage + 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() =>
                setParams((prev) => ({ ...prev, page: currentPage + 1 }))
              }
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {lastPage >= currentPage + 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            disabled={lastPage === currentPage}
            onClick={() =>
              setParams((prev) => ({ ...prev, page: currentPage + 1 }))
            }
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLast
            disabled={lastPage === currentPage}
            onClick={() => setParams((prev) => ({ ...prev, page: lastPage }))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function OrderSelect({
  params,
  setParams,
}: {
  params: FiltersParams;
  setParams: React.Dispatch<React.SetStateAction<FiltersParams>>;
}) {
  function handleClick(
    sort: FiltersParams["sort"],
    order: FiltersParams["order"]
  ) {
    if (sort !== params.sort || order !== params.order) {
      setParams((prev) => ({ ...prev, sort, order }));
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Text size="xs" variant="muted">
            Ordenar por:
          </Text>

          {SORT_KEYS_LABELS[params.sort]}

          {params.order === "desc" ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_KEYS.map((key, i) => (
          <div key={key}>
            {i !== 0 && <DropdownMenuSeparator />}

            <DropdownMenuItem
              className="relative flex justify-between gap-2 pl-8"
              onClick={() => handleClick(key, "desc")}
            >
              {params.order === "desc" && params.sort === key && (
                <CheckIcon className="absolute left-1 size-5" />
              )}

              {SORT_KEYS_LABELS[key]}

              <ArrowDownIcon className="size-5" />
            </DropdownMenuItem>

            <DropdownMenuItem
              className="relative flex justify-between gap-2 pl-8"
              onClick={() => handleClick(key, "asc")}
            >
              {params.order === "asc" && params.sort === key && (
                <CheckIcon className="absolute left-1 size-5" />
              )}

              {SORT_KEYS_LABELS[key]}

              <ArrowUpIcon className="size-5" />
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
