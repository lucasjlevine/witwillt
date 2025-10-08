<script lang="ts">
  import { getPlaylists } from "$lib/spotify.remote";

  const limit = 50;

  let playlists = getPlaylists({ limit });
</script>

<main class="w-full">
  <h1 class="text-4xl font-bold mb-4 text-center">Playlists</h1>
  <div class="flex flex-wrap justify-center">
    {#await playlists}
      <p>Loading...</p>
    {:then data}
      {#if data?.items?.length}
        {#each data.items as playlist}
          <div class="flex flex-col items-center m-4">
            <a href={playlist.external_urls.spotify} target="_blank">
              <img
                src={playlist.images[0]?.url}
                alt={playlist.name}
                class="w-48 h-48 mb-4"
              />
            </a>
            <p class="font-semibold text-lg">{playlist.name}</p>
            <p class="text-gray-600">{playlist.tracks.total} tracks</p>
          </div>
        {/each}
      {:else}
        <p>No playlists found.</p>
      {/if}
    {/await}
  </div>
</main>
