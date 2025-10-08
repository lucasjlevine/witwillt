<script lang="ts">
  import { Progress } from "$lib/components/ui/progress";
  import { accurateTimeout } from "$lib/utils";
  import { getCurrentlyPlaying, getRecentlyPlayed } from "$lib/spotify.remote";

  let currentlyPlaying = getCurrentlyPlaying();
  let isPlaying = $state(false);
  let progress = $state(0);
  let hasRefreshed = $state(false);
  let currentItem = $state<any>(null);

  // Update local state when data changes
  $effect(() => {
    currentlyPlaying.then((data) => {
      if (data?.item) {
        currentItem = data.item;
        progress = data.progress_ms || 0;
        hasRefreshed = false;
        isPlaying = data.is_playing || false;
      }
    });
  });

  $effect(() => {
    if (!currentItem?.duration_ms) return;

    let cleanup = accurateTimeout(100, () => {
      if (progress < currentItem.duration_ms && isPlaying) {
        progress += 100;
      } else if (!hasRefreshed) {
        hasRefreshed = true;
        currentlyPlaying.refresh();
        setTimeout(() => {
          getRecentlyPlayed(25).refresh();
        }, 1000);
      }
    });

    return cleanup;
  });
</script>

{#await currentlyPlaying}
  <p>Loading...</p>
{:then data}
  <h1 class="text-4xl font-bold">Currently Playing</h1>
  {#if data?.item}
    <img
      src={data.item.album.images[0].url}
      alt={data.item.name}
      class="w-64 h-64 my-4"
    />
    <Progress
      value={progress}
      max={data.item.duration_ms}
      class="w-64 h-[4px]"
    />
    <p class="font-semibold text-2xl">{data.item.name}</p>
    <p class="text-lg text-gray-600">
      {data.item.artists.map((artist: { name: any }) => artist.name).join(", ")}
    </p>
  {:else}
    <div class="w-64 h-64 my-4 bg-gray-700"></div>
    <Progress value={0} max={1} class="w-64 h-[4px]" />
    <p class="font-semibold text-2xl">Nothing</p>
    <p class="text-lg text-gray-600">No One</p>
  {/if}
{:catch error}
  <p>Error loading currently playing track: {error.message}</p>
{/await}
