import { exchangeCodeForTokens } from "$lib/spotify.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const code = url.searchParams.get("code");

  if (!code) {
    return { code: null };
  }

  try {
    const tokens = await exchangeCodeForTokens(code);
    const refresh = tokens.refresh_token;
    return { refresh_token: refresh, code };
  } catch (error: any) {
    return { error: error.message, code };
  }
};
