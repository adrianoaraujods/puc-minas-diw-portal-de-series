import { getGenres, getQuery } from "@/actions/the-movie-db";

import { parseObjectPropertiesToNumber } from "@/lib/utils";

import List from "./_list";
import { initialFiltersParams } from "./_table";

export default async function ExplorerPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = {
    ...initialFiltersParams,
    ...(parseObjectPropertiesToNumber(await searchParams) as object),
  };

  return <List query={getQuery(query)} genres={getGenres()} />;
}
