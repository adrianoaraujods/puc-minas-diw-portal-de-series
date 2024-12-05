"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import type { Author } from "@/lib/shema";

import { Heading, Span, Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import GithubIcon from "@/components/icons/github";
import InstagramIcon from "@/components/icons/instagram";
import LinkedInIcon from "@/components/icons/linkedin";

export default function AuthorSection({
  data,
}: {
  data: Promise<Author | null>;
}) {
  const author = React.use(data);

  return (
    <Section id="author" className="bg-accent text-foreground">
      <Heading className="border-b" element="h2">
        Informações do Aluno
      </Heading>

      {author && (
        <div className="grid gap-8 lg:grid-cols-[auto,1fr]">
          <div className="grid grid-cols-[auto,1fr] gap-4">
            <Image
              className="rounded-full"
              src={author.image}
              alt="Foto do autor"
              height={136}
              width={136}
              priority
            />

            <div className="flex w-fit flex-col gap-2">
              <Text className="border-b">
                <Span variant="bold">Aluno:</Span> {author.name} <br />
                <Span variant="bold">Curso:</Span> {author.course} <br />
                <Span variant="bold">Turma:</Span> {author.class} <br />
              </Text>

              <ul className="flex gap-4">
                <li>
                  <Button variant="ghost" size="icon" className="p-0" asChild>
                    <Link href={author.socials.github}>
                      <GithubIcon className="!size-8" />
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" size="icon" className="p-0" asChild>
                    <Link href={author.socials.instagram}>
                      <InstagramIcon className="!size-8" />
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" size="icon" className="p-0" asChild>
                    <Link href={author.socials.linkedin}>
                      <LinkedInIcon className="!size-8" />
                    </Link>
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid gap-2">
            {author.description.map((paragraph, i) => (
              <Text key={`author:${i}`}>{paragraph}</Text>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

export function AuthorSectionSkeleton() {
  return (
    <Section id="author" className="w-full">
      <Heading className="border-b" element="h2">
        Informações do Aluno
      </Heading>

      <div className="grid w-full gap-8 lg:grid-cols-[auto,1fr]">
        <div className="grid grid-cols-[auto,1fr] gap-4">
          <Skeleton className="size-[136px] rounded-full" />

          <div className="flex flex-col gap-2">
            <div className="grid gap-2 border-b border-muted pb-2">
              <Skeleton className="h-[21px]" />
              <Skeleton className="h-[21px]" />
              <Skeleton className="h-[21px]" />
            </div>

            <div className="flex gap-4">
              <Skeleton className="size-10" />
              <Skeleton className="size-10" />
              <Skeleton className="size-10" />
            </div>
          </div>
        </div>

        <div className="grid w-full">
          <Skeleton className="h-[21px] w-full" />
          <Skeleton className="h-[21px] w-4/5" />
          <Skeleton className="h-[21px] w-4/5" />
          <Skeleton className="h-[21px] w-3/5" />
        </div>
      </div>
    </Section>
  );
}
