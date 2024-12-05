import { isFavorited } from "@/actions/json-server";
import { getById, getCast } from "@/actions/the-movie-db";

import Cast from "./_cast";
import Details from "./_details";

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id) || 0;

  return (
    <main>
      <Details isFavorited={isFavorited(id)} mediaDetails={getById(id)} />

      <Cast mediaCast={getCast(id)} />
    </main>
  );
}
