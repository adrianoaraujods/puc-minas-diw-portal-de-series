"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import type { MediaResponse } from "@/lib/shema";

import { Heading, Text } from "@/components/typography/text";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselSet,
} from "@/components/ui/carousel";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function PopularSection({
  data,
}: {
  data: Promise<MediaResponse>;
}) {
  const { results: popular } = React.use(data);

  return (
    <Section id="popular">
      <Heading className="border-b" element="h2">
        Séries Populares
      </Heading>

      <Carousel
        className="overflow-hidden rounded-xl text-foreground"
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnFocusIn: true,
            stopOnMouseEnter: true,
            stopOnInteraction: true,
            playOnInit: true,
            stopOnLastSnap: false,
          }),
        ]}
      >
        <CarouselContent className="relative">
          {popular.map(
            ({ id, backdrop_path, name, overview }, i) =>
              i < 5 && (
                <CarouselItem key={`Carousel:${id}`}>
                  <Link href={`/detalhes/${id}`} className="bg-muted">
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute top-0 w-full sm:bottom-[108px] lg:bottom-[164px]">
                        <Image
                          className="!h-full object-cover"
                          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                          alt={`${name} Banner`}
                          width={1536}
                          height={864}
                          priority={i === 0}
                        />
                      </div>

                      <div className="absolute bottom-0 w-full px-8 py-4 sm:h-[108px] sm:pb-12 lg:h-[164px]">
                        <Heading
                          element="h3"
                          className="text-3xl max-sm:drop-shadow-sm"
                        >
                          {name}
                        </Heading>

                        <Text className="line-clamp-2 max-lg:hidden">
                          {overview}
                        </Text>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              )
          )}
        </CarouselContent>

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 max-sm:hidden">
          {popular.map(
            ({ id }, i) =>
              i < 5 && <CarouselSet key={`Carousel-button:${id}`} index={i} />
          )}
        </div>

        <CarouselPrevious className="left-2 max-sm:hidden" />
        <CarouselNext className="right-2 max-sm:hidden" />
      </Carousel>
    </Section>
  );
}

export function PopularSectionSkeleton() {
  return (
    <Section id="popular">
      <Heading className="border-b" element="h2">
        Séries Populares
      </Heading>

      <Skeleton className="aspect-video" />
    </Section>
  );
}
