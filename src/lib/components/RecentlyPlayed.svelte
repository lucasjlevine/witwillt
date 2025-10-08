<script lang="ts">
  import { getRecentlyPlayed } from "$lib/spotify.remote";

  const limit = 25;

  let recentlyPlayed = getRecentlyPlayed(limit);
</script>

<main>
  {#await recentlyPlayed}
    <p>Loading...</p>
  {:then data}
    <h2 class="text-4xl font-bold mb-4 text-center">Recently Played</h2>
    {#if data?.items?.length}
      <div class="flex flex-col items-start space-y-4">
        {#each data.items as { track, played_at }}
          <li class="flex items-center space-x-4">
            <img
              src={track.album.images[0].url}
              alt={track.name}
              class="w-16 h-"
            />
            <div>
              <p class="font-semibold">{track.name}</p>
              <p class="text-sm text-gray-600">
                {track.artists
                  .map((artist: { name: any }) => artist.name)
                  .join(", ")}
              </p>
              <p class="text-xs text-gray-500">
                Played at {new Date(played_at).toLocaleString()}
              </p>
            </div>
          </li>
        {/each}
      </div>
    {:else}
      <p>No recently played tracks found.</p>
    {/if}
  {:catch error}
    <p>Error loading recently played tracks: {error.message}</p>
  {/await}
</main>
