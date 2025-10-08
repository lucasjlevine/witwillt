<script lang="ts">
  import { getTopTracks } from "$lib/spotify.remote";
  import * as ToggleGroup from "$lib/components/ui/toggle-group";
  import { cn } from "$lib/utils";

  let { hidden = false } = $props();

  let time_range = $state<"short_term" | "medium_term" | "long_term">(
    "short_term"
  );

  let topTracks = $derived(getTopTracks({ time_range }));
</script>

<main class="flex flex-col items-center" {hidden}>
  <h1 class="text-4xl font-bold mb-4 max-sm:hidden">Top Tracks</h1>
  {#await topTracks}
    <p>Loading...</p>
  {:then data}
    <ToggleGroup.Root variant="outline" type="single" bind:value={time_range}>
      <ToggleGroup.Item
        value="short_term"
        class="cursor-pointer"
        disabled={time_range === "short_term"}
      >
        <span class={cn("m-2", time_range === "short_term" ? "font-black" : "")}
          >Short Term</span
        >
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="medium_term"
        class="cursor-pointer"
        disabled={time_range === "medium_term"}
      >
        <span
          class={cn("m-2", time_range === "medium_term" ? "font-black" : "")}
          >Medium Term</span
        >
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="long_term"
        class="cursor-pointer"
        disabled={time_range === "long_term"}
      >
        <span class={cn("m-2", time_range === "long_term" ? "font-black" : "")}
          >Long Term</span
        >
      </ToggleGroup.Item>
    </ToggleGroup.Root>
    {#if data?.items?.length}
      <ol class="space-y-4 mt-4">
        {#each data.items as track, index}
          <li class="flex items-center space-x-4">
            <span class="text-xl font-bold w-8 text-center">{index + 1}</span>
            <img
              src={track.album.images[0].url}
              alt={track.name}
              class="w-24 h-24"
            />
            <div>
              <p class="font-semibold text-2xl">{track.name}</p>
              <p class="text-lg text-gray-600">
                {track.artists
                  .map((artist: { name: any }) => artist.name)
                  .join(", ")}
              </p>
            </div>
          </li>
        {/each}
      </ol>
    {:else}
      <p>No top tracks found.</p>
    {/if}
  {/await}
</main>
