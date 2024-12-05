"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Heading, Text } from "@/components/typography/text";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Skeleton } from "../ui/skeleton";

export type MediaCard = {
  id: number;
  name: string;
  backdrop_path: string | null;
  poster_path: string | null;
  first_air_date: string | null;
};

export function MediaCard({
  media: { first_air_date, name, id, poster_path, backdrop_path },
}: {
  media: MediaCard;
}) {
  return (
    <Card
      key={`Card:${id}`}
      className="w-[192px] select-none overflow-hidden shadow-lg focus-within:ring focus-within:ring-ring"
    >
      <CardContent className="p-0">
        <Link className="focus:outline-none" href={`/detalhes/${id}`}>
          <Image
            className="h-[286px] w-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${poster_path || backdrop_path}`}
            alt={`${name} Banner`}
            style={{ height: "auto" }}
            width={192}
            height={286}
            priority
          />
        </Link>
      </CardContent>

      <CardFooter className="grid pt-2">
        <Heading className="line-clamp-2">{name}</Heading>

        {first_air_date && (
          <Text variant="italic">
            {new Date(first_air_date).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "short",
              year: "2-digit",
            })}
          </Text>
        )}
      </CardFooter>
    </Card>
  );
}

export function MediaCardSkeleton() {
  return <Skeleton className="h-[404px] w-[192px]" />;
}
