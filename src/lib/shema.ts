import { z } from "zod";

export const mediaBase = z.object({
  id: z.number(),
  name: z.string(),
  genre_ids: z.array(z.number()),
  overview: z.string().nullable(),

  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  first_air_date: z.string().nullable(),

  popularity: z.number(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const mediaSchema = mediaBase
  .refine(({ backdrop_path, poster_path }) => !(!backdrop_path && !poster_path))
  .transform((media) => ({
    ...media,
    overview: media.overview === "" ? undefined : media.overview,
  }));

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const castSchema = z.object({
  adult: z.boolean(),
  gender: z.union([z.literal(1), z.literal(2)]),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  popularity: z.number(),
  profile_path: z.string(),
  roles: z.array(
    z.object({
      character: z.string(),
      episode_count: z.number(),
    })
  ),
});

export const mediaDetailsSchema = mediaBase
  .extend({
    created_by: z.array(
      z.object({
        credit_id: z.string(),
        gender: z.union([z.literal(0), z.literal(1), z.literal(2)]),
        id: z.number(),
        name: z.string(),
        profile_path: z.string().nullable(),
      })
    ),
    genre_ids: z.undefined(),
    genres: z.array(genreSchema),
    homepage: z.string().nullable(),
    in_production: z.boolean(),
    languages: z.array(z.string()),
    last_air_date: z.string().nullable(),
    networks: z.array(
      z.object({
        id: z.number(),
        logo_path: z.string(),
        name: z.string(),
        origin_country: z.string().nullable(),
      })
    ),
    number_of_episodes: z.number().nullable(),
    number_of_seasons: z.number().nullable(),
    origin_country: z.array(z.string()),
    original_language: z.string(),
    original_name: z.string(),
    production_companies: z
      .array(
        z.object({
          id: z.number(),
          logo_path: z.string().nullable(),
          name: z.string(),
          origin_country: z.string(),
        })
      )
      .nullable(),
    seasons: z
      .array(
        z.object({
          air_date: z.string().nullable(),
          episode_count: z.number(),
          id: z.number(),
          name: z.string(),
          overview: z.string().nullable(),
          poster_path: z.string().nullable(),
          season_number: z.number(),
          vote_average: z.number(),
        })
      )
      .nullable(),
    status: z.string(),
    tagline: z.string().nullable(),
    type: z.string().nullable(),
  })
  .refine(
    ({ backdrop_path, poster_path }) => !(!backdrop_path && !poster_path)
  );

export type Media = z.infer<typeof mediaSchema>;
export type MediaDetails = z.infer<typeof mediaDetailsSchema>;
export type Genre = z.infer<typeof genreSchema>;
export type Cast = z.infer<typeof castSchema>;

export type MediaResponse = {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
};

export type Author = {
  id: 1;
  email: string;
  image: string;
  name: string;
  description: string[];
  course: string;
  class: string;
  socials: {
    instagram: string;
    github: string;
    linkedin: string;
  };
};

export type Favorite = {
  id: number;
  apiId: number;
  ownerId: number;
};
