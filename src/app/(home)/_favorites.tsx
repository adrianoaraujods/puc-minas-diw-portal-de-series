"use client";

import * as React from "react";

import type { MediaDetails } from "@/lib/shema";

import { Heading } from "@/components/typography/text";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Section } from "@/components/ui/section";
import { MediaCard, MediaCardSkeleton } from "@/components/layout/media-card";

export default function FavoritesSection({
  data,
}: {
  data: Promise<MediaDetails[]>;
}) {
  const favorites = React.use(data);

  if (favorites.length === 0) return null;

  return (
    <Section id="favorites">
      <Heading className="border-b" element="h2">
        Séries Favoritas
      </Heading>

      <ScrollArea>
        <div className="flex gap-4 px-1 pb-4 pt-1">
          {favorites.map((media) => (
            <MediaCard key={`Favorite:${media.id}`} media={media} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Section>
  );
}

export function FavoritesSectionSkeleton() {
  return (
    <Section id="favorites">
      <Heading className="border-b" element="h2">
        Séries Favoritas
      </Heading>

      <div className="overflow-hidden">
        <div className="flex w-fit gap-4 px-1 pb-4 pt-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <MediaCardSkeleton key={`Card-Skeleton:${i}`} />
          ))}
        </div>
      </div>
    </Section>
  );
}
