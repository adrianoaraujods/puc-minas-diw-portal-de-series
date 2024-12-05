"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { favoriteMedia, unfavoriteMedia } from "@/actions/json-server";
import { HeartIcon, HeartOffIcon } from "lucide-react";

import { MediaDetails } from "@/lib/shema";

import { Heading, Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default function Details({
  isFavorited,
  mediaDetails,
}: {
  isFavorited: Promise<boolean>;
  mediaDetails: Promise<MediaDetails | null>;
}) {
  const [favorited, setFavorited] = React.useState(React.use(isFavorited));
  const media = React.use(mediaDetails);

  if (!media) {
    return null;
  }

  const {
    id,
    name,
    backdrop_path,
    poster_path,
    genres,
    first_air_date,
    overview,
    tagline,
    created_by,
    production_companies,
  } = media;

  return (
    <Section
      className="relative mt-8 overflow-hidden border-y bg-background/80 p-0 text-foreground"
      maxWidth="lg"
    >
      <Image
        className="absolute left-1/2 -z-[1] size-full -translate-x-1/2 object-cover blur"
        src={`https://image.tmdb.org/t/p/original/${backdrop_path || poster_path}`}
        alt={`${name} Banner`}
        width={720}
        height={0}
        priority
      />

      <div className="grid items-center gap-4 p-8 md:grid-cols-[1fr,2fr]">
        <Image
          className="mx-auto mb-auto aspect-[2/3] rounded-lg border object-cover max-md:max-h-[40svh] max-md:w-fit"
          src={`https://image.tmdb.org/t/p/original/${poster_path || backdrop_path}`}
          alt={`${name} Banner`}
          width={384}
          height={576}
          priority
        />

        <div className="flex w-full flex-col gap-2">
          <div className="grid w-full grid-cols-[1fr,auto] justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Heading element="h1" className="mb-0">
                {name}
              </Heading>

              {first_air_date && (
                <Heading className="mb-0 text-4xl">
                  ({new Date(first_air_date).getFullYear()})
                </Heading>
              )}
            </div>

            {favorited ? (
              <Button
                variant="secondary"
                onClick={() => {
                  unfavoriteMedia(id);

                  setFavorited(false);
                }}
              >
                <HeartOffIcon />

                <Text>Remover</Text>
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => {
                  favoriteMedia(id);

                  setFavorited(true);
                }}
              >
                <HeartIcon />

                <Text>Salvar</Text>
              </Button>
            )}
          </div>

          <Heading element="h2" size="md">
            {genres.map(({ id, name }, i) => (
              <Link
                key={`genre:${id}`}
                className="text-primary"
                href={`/explorer?genres=${id}`}
              >
                {`${i > 0 ? ", " : ""}${name}`}
              </Link>
            ))}
          </Heading>

          {tagline && <Heading variant="italic">{tagline}</Heading>}

          {overview && (
            <div>
              <Heading variant="bold">Sinopse</Heading>
              <Text className="line-clamp-6">{overview}</Text>
            </div>
          )}

          <div className="flex gap-4">
            {created_by && created_by.length > 0 && (
              <div>
                <Heading variant="bold">Criado por</Heading>

                <Text>{created_by.map(({ name }) => name).join(", ")}</Text>
              </div>
            )}

            {production_companies && production_companies.length > 0 && (
              <div>
                <Heading variant="bold">Produzido por</Heading>

                <Text>
                  {production_companies.map(({ name }) => name).join(", ")}
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
