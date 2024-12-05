"use server";

import type { Cast, Genre, MediaDetails, MediaResponse } from "@/lib/shema";

import { RESULTS_LENGHT, RESULTS_MAX_PAGES } from "@/lib/constants";
import {
  castSchema,
  genreSchema,
  mediaDetailsSchema,
  mediaSchema,
} from "@/lib/shema";

import { FiltersParams } from "@/app/explorer/_table";

import { getFavoritesIds } from "./json-server";

export async function getPopular(): Promise<MediaResponse> {
  const response: MediaResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
  };

  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=pt-BR",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.THE_MOVIE_DB_TOKEN}`,
        },
      }
    );

    if (res.ok) {
      const data: unknown = await res.json();

      if (typeof data === "object" && data) {
        if ("results" in data && Array.isArray(data.results)) {
          data.results.forEach((movie: unknown) => {
            const parse = mediaSchema.safeParse(movie);

            if (parse.success && parse.data) response.results.push(parse.data);
          });
        }

        if ("page" in data) {
          response.page = Number(data.page) || 1;
        }

        if ("total_results" in data) {
          response.total_results = Math.min(
            RESULTS_MAX_PAGES * RESULTS_LENGHT,
            Number(data.total_results) || response.results.length
          );
        }

        if ("total_pages" in data) {
          response.total_pages = Math.min(
            RESULTS_MAX_PAGES,
            Number(data.total_pages) || response.results.length
          );
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  return response;
}

export async function getRecent(): Promise<MediaResponse> {
  const response: MediaResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
  };

  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/tv/day?language=pt-BR",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.THE_MOVIE_DB_TOKEN}`,
        },
      }
    );

    if (res.ok) {
      const data: unknown = await res.json();

      if (typeof data === "object" && data) {
        if ("results" in data && Array.isArray(data.results)) {
          data.results.forEach((movie: unknown) => {
            const parse = mediaSchema.safeParse(movie);

            if (parse.success && parse.data) response.results.push(parse.data);
          });
        }

        if ("page" in data) {
          response.page = Number(data.page) || 1;
        }

        if ("total_results" in data) {
          response.total_results = Math.min(
            RESULTS_MAX_PAGES * RESULTS_LENGHT,
            Number(data.total_results) || response.results.length
          );
        }

        if ("total_pages" in data) {
          response.total_pages = Math.min(
            RESULTS_MAX_PAGES,
            Number(data.total_pages) || response.results.length
          );
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  return response;
}

export async function getFavoritesDetails() {
  const details: MediaDetails[] = [];
  try {
    const favorites = await getFavoritesIds();

    for (const id of favorites) {
      const data = await getById(id);

      if (data) details.push(data);
    }
  } catch (error) {
    console.error(error);
  }

  return details;
}

export async function getById(id: number): Promise<MediaDetails | null> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=pt-BR`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.THE_MOVIE_DB_TOKEN}`,
        },
      }
    );

    if (res.ok) {
      const data: unknown = await res.json();

      if (typeof data === "object" && data) {
        const parse = mediaDetailsSchema.safeParse(data);

        if (parse.success && parse.data) return parse.data;
      }
    }

    return null;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getGenres(): Promise<Genre[]> {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/tv/list?language=pt-BR",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.THE_MOVIE_DB_TOKEN}`,
      },
    }
  );

  const genres: Genre[] = [];

  if (res.ok) {
    const data: unknown = await res.json();

    Object(data).genres.forEach((movie: unknown) => {
      const parse = genreSchema.safeParse(movie);

      if (parse.success && parse.data) genres.push(parse.data);
    });
  }

  return genres;
}

export async function getCast(id: number): Promise<Cast[] | null> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=pt-BR`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.THE_MOVIE_DB_TOKEN}`,
        },
      }
    );

    const cast: Cast[] = [];

    if (res.ok) {
      const data: unknown = await res.json();

      if (
        typeof data === "object" &&
        data &&
        "cast" in data &&
        Array.isArray(data.cast)
      ) {
        data.cast.forEach((person: unknown) => {
          const parse = castSchema.safeParse(person);

          if (parse.success && parse.data) cast.push(parse.data);
        });
      }
    }

    return cast;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getQuery({
  order,
  page,
  sort,
  finalDate,
  genres,
  combine,
  initialDate,
  name,
}: FiltersParams) {
  const response: MediaResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
  };

  try {
    let query: string;

    if (name) {
      query = `https://api.themoviedb.org/3/search/tv?language=pt-BR&query=${name}&page=${page}&sort_by=${sort}.${order}`;
    } else {
      const genresString =
        Array.isArray(genres) && genres.length > 0
          ? `&with_genres=${genres.join(!combine ? "%7C" : "%2C")}`
          : !genres
            ? ""
            : `&with_genres=${genres}`;

      const dateString =
        (finalDate ? `&air_date.lte=${finalDate}` : "") +
        (initialDate ? `&first_air_date.gte=${initialDate}` : "");

      query = `https://api.themoviedb.org/3/discover/tv?language=pt-BR&page=${page}&sort_by=${sort}.${order}${genresString}${dateString}`;
    }

    const res = await fetch(query, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.THE_MOVIE_DB_TOKEN}`,
      },
    });

    if (res.ok) {
      const data: unknown = await res.json();

      if (typeof data === "object" && data) {
        if ("results" in data && Array.isArray(data.results)) {
          data.results.forEach((movie: unknown) => {
            const parse = mediaSchema.safeParse(movie);

            if (parse.success && parse.data) response.results.push(parse.data);
          });
        }

        if ("page" in data) {
          response.page = Number(data.page) || 1;
        }

        if ("total_results" in data) {
          response.total_results = Math.min(
            RESULTS_MAX_PAGES * RESULTS_LENGHT,
            Number(data.total_results) || response.results.length
          );
        }

        if ("total_pages" in data) {
          response.total_pages = Math.min(
            RESULTS_MAX_PAGES,
            Number(data.total_pages) || response.results.length
          );
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  return response;
}
