/*
  A tela deve ter uma Seção 2 - Cards de séries novas
  - Deve apresentar um grupo de cards com informações (pelo menos, imagem, nome e detalhes) das séries mais recentes
  - Os dados das séries devem ser obrigatoriamente obtidos a partir da API The Movie DB.
  - Ao clicar em uma série, deve direcionar o usuário para a Tela de Detalhes da Série
  - ORIENTAÇÃO: use componente do bootstrap (detalhes no link)
*/

import * as React from "react";

import type { MediaResponse } from "@/lib/shema";

import { Heading } from "@/components/typography/text";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Section } from "@/components/ui/section";
import { MediaCard, MediaCardSkeleton } from "@/components/layout/media-card";

export default function RecentSection({
  data,
}: {
  data: Promise<MediaResponse>;
}) {
  const { results: recent } = React.use(data);

  return (
    <Section id="recent">
      <Heading className="border-b" element="h2">
        Novas Séries
      </Heading>

      <ScrollArea>
        <div className="flex gap-4 px-1 pb-4 pt-1">
          {recent.map((media) => (
            <MediaCard key={`Recent:${media.id}`} media={media} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Section>
  );
}

export function RecentSectionSkeleton() {
  return (
    <Section id="recent">
      <Heading className="border-b" element="h2">
        Novas Séries
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
