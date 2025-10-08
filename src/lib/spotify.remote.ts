import { query } from "$app/server";
import { getUserAccessToken } from "./spotify.server";
import * as z from "zod";

export const getMe = query(async () => {
  const token = await getUserAccessToken();

  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch user profile: ${response.status} ${text}`);
  }

  return response.json();
});

export const getCurrentlyPlaying = query(async () => {
  const token = await getUserAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 204) {
    // Nothing currently playing
    return null;
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Failed to fetch currently playing: ${response.status} ${text}`
    );
  }

  return response.json();
});

export const getQueuedTracks = query(async () => {
  const token = await getUserAccessToken();

  const response = await fetch("https://api.spotify.com/v1/me/player/queue", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch queue: ${response.status} ${text}`);
  }

  return response.json();
});

export const getRecentlyPlayed = query(
  z.number().max(100).min(0).default(10),
  async (limit: number) => {
    const token = await getUserAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Failed to fetch recently played: ${response.status} ${text}`
      );
    }

    const data = await response.json();

    return data;
  }
);

export const getTopTracks = query(
  z.object({
    limit: z.number().min(1).max(50).default(10),
    offset: z.number().min(0).default(0),
    time_range: z
      .enum(["short_term", "medium_term", "long_term"])
      .default("short_term"),
  }),
  async (params) => {
    const token = await getUserAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?limit=${params.limit}&offset=${params.offset}&time_range=${params.time_range}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Failed to fetch most listened tracks: ${response.status} ${text}`
      );
    }

    const data = await response.json();

    return data;
  }
);

export const getTopArtists = query(
  z.object({
    limit: z.number().min(1).max(50).default(10),
    offset: z.number().min(0).default(0),
    time_range: z
      .enum(["short_term", "medium_term", "long_term"])
      .default("short_term"),
  }),
  async (params) => {
    const token = await getUserAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?limit=${params.limit}&offset=${params.offset}&time_range=${params.time_range}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Failed to fetch most listened artists: ${response.status} ${text}`
      );
    }

    const data = await response.json();

    return data;
  }
);

export const getPlaylists = query(
  z.object({
    limit: z.number().min(1).max(50).default(10),
    offset: z.number().min(0).default(0),
  }),
  async (params) => {
    const token = await getUserAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/me/playlists?limit=${params.limit}&offset=${params.offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch playlists: ${response.status} ${text}`);
    }

    const data = await response.json();

    return data;
  }
);
