import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_API_SCOPE,
  INITIAL_SPOTIFY_REFRESH_TOKEN,
} from "$env/static/private";

const SPOTIFY_REFRESH_TOKEN = {
  token: INITIAL_SPOTIFY_REFRESH_TOKEN,
  get() {
    return this.token;
  },
  set(newToken: string) {
    this.token = newToken;
  },
};

export const refreshAccessToken = async () => {
  if (!SPOTIFY_REFRESH_TOKEN.get()) {
    throw new Error(
      "SPOTIFY_REFRESH_TOKEN is not set. Complete a one-time Authorization Code flow to obtain a refresh token and store it in your environment."
    );
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN.get(),
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Failed to refresh access token: ${response.status} ${text}`
    );
  }

  const data = await response.json();
  return data;
};

export const getUserAccessToken = async () => {
  const data = await refreshAccessToken();
  return data.access_token;
};

export const getAuthorizationUrl = async () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    SPOTIFY_REDIRECT_URI
  )}&scope=${encodeURIComponent(SPOTIFY_API_SCOPE)}`;

  return url;
};

export const exchangeCodeForTokens = async (code: string) => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Failed to exchange code for tokens: ${response.status} ${text}`
    );
  }

  const data = await response.json();
  SPOTIFY_REFRESH_TOKEN.set(data.refresh_token);

  return data;
};
