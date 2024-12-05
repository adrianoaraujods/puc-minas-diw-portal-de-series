"use client";

import * as React from "react";
import Image from "next/image";

import type { Cast } from "@/lib/shema";

import { Heading, Text } from "@/components/typography/text";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Section } from "@/components/ui/section";

export default function Cast({
  mediaCast,
}: {
  mediaCast: Promise<Cast[] | null>;
}) {
  const cast = React.use(mediaCast);

  if (!cast) {
    return null;
  }

  return (
    <Section>
      <Heading element="h2" className="border-b">
        Elenco
      </Heading>

      <ScrollArea>
        <div className="flex gap-4">
          {cast.map(({ id, name, profile_path, roles }) => (
            <Card
              key={id}
              className="w-[160px] select-none overflow-hidden shadow-lg"
            >
              <CardContent className="p-0">
                <Image
                  className="h-[240px] object-cover"
                  src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                  alt={`${name} Banner`}
                  width={160}
                  height={240}
                />
              </CardContent>

              <CardFooter className="grid pt-2">
                <Heading className="line-clamp-2" size="lg" variant="bold">
                  {name}
                </Heading>

                <Text
                  className="line-clamp-3"
                  size="md"
                  variant="muted"
                  asChild
                >
                  <ul>
                    {roles.map(({ character }, i) => (
                      <li key={`${id}:${i}`}>
                        {character} <br />
                      </li>
                    ))}
                  </ul>
                </Text>
              </CardFooter>
            </Card>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Section>
  );
}
