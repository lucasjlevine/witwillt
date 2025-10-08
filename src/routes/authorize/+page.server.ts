import { getAuthorizationUrl } from "$lib/spotify.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const authorizationUrl = await getAuthorizationUrl();
  return { authorizationUrl };
};
