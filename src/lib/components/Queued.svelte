<script lang="ts">
  import { getQueuedTracks } from "$lib/spotify.remote";

  let { hidden = false } = $props();

  let queuedTracks = getQueuedTracks();
</script>

<main {hidden}>
  {#await queuedTracks}
    <p>Loading...</p>
  {:then data}
    <h1 class="text-4xl font-bold text-center max-sm:hidden">Queued</h1>
    {#if data?.queue?.length === 0}
      <p class="text-gray-600 m-4 text-center">No tracks in the queue.</p>
    {:else}
      <ul class="space-y-4 mt-4">
        {#each data.queue as track, index (track.uri)}
          <li class="flex items-center space-x-4">
            <span class="text-gray-500 w-6 text-right">{index + 1}.</span>
            <img
              src={track.album.images[2].url}
              alt={track.name}
              class="w-12 h-12"
            />
            <div>
              <p class="font-semibold">{track.name}</p>
              <p class="text-sm text-gray-600">
                {track.artists
                  .map((artist: { name: any }) => artist.name)
                  .join(", ")}
              </p>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  {/await}
</main>
