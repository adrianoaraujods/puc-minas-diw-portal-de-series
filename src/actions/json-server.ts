"use server";

import type { Author } from "@/lib/shema";

const SERVER_URL = "http://localhost:8080";
const USER_ID = 1;

export async function getAuthorData() {
  try {
    const res = await fetch(`http://localhost:8080/users/1`);

    let author: Author | null = null;

    if (res.ok) {
      author = await res.json();
    }

    return author;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getFavoritesIds() {
  const ids: number[] = [];

  try {
    const res = await fetch(`${SERVER_URL}/favorites?userId=${USER_ID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();

      if (Array.isArray(data)) {
        data.forEach((favorite) => {
          if ("mediaId" in favorite && typeof favorite.mediaId === "number") {
            ids.push(favorite.mediaId);
          }
        });
      }
    }
  } catch (error) {
    console.error(error);
  }

  return ids;
}

export async function isFavorited(mediaId: number) {
  try {
    const res = await fetch(
      `${SERVER_URL}/favorites?userId=${USER_ID}&mediaId=${mediaId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) {
      const data = await res.json();

      if (data && Array.isArray(data) && data.length > 0) {
        return "mediaId" in data[0] && data[0].mediaId === mediaId;
      }
    }

    return false;
  } catch (error) {
    console.error(error);

    return false;
  }
}

export async function favoriteMedia(mediaId: number) {
  try {
    const alreadyFavorited = await isFavorited(mediaId);

    if (alreadyFavorited) return true;

    const res = await fetch(`${SERVER_URL}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: USER_ID, mediaId }),
    });

    return res.ok;
  } catch (error) {
    console.error(error);

    return false;
  }
}

export async function unfavoriteMedia(mediaId: number) {
  try {
    const res = await fetch(
      `${SERVER_URL}/favorites?userId=${USER_ID}&mediaId=${mediaId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) {
      const data = await res.json();

      if (
        data &&
        Array.isArray(data) &&
        data.length > 0 &&
        "mediaId" in data[0] &&
        "id" in data[0] &&
        data[0].mediaId === mediaId
      ) {
        return (
          await fetch(`${SERVER_URL}/favorites/${data[0].id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          })
        ).ok;
      }
    }
  } catch (error) {
    console.error(error);

    return false;
  }
}
