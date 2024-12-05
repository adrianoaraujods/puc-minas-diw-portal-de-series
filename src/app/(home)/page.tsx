import { Suspense } from "react";
import { getAuthorData } from "@/actions/json-server";
import {
  getFavoritesDetails,
  getPopular,
  getRecent,
} from "@/actions/the-movie-db";

import AuthorSection, { AuthorSectionSkeleton } from "./_author";
import FavoritesSection, { FavoritesSectionSkeleton } from "./_favorites";
import PopularSection, { PopularSectionSkeleton } from "./_popular";
import RecentSection, { RecentSectionSkeleton } from "./_recent";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<PopularSectionSkeleton />}>
        <PopularSection data={getPopular()} />
      </Suspense>

      <Suspense fallback={<RecentSectionSkeleton />}>
        <RecentSection data={getRecent()} />
      </Suspense>

      <Suspense fallback={<AuthorSectionSkeleton />}>
        <AuthorSection data={getAuthorData()} />
      </Suspense>

      <Suspense fallback={<FavoritesSectionSkeleton />}>
        <FavoritesSection data={getFavoritesDetails()} />
      </Suspense>
    </main>
  );
}
