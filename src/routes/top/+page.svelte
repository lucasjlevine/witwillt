<script lang="ts">
  import TopArtists from "$lib/components/TopArtists.svelte";
  import TopTracks from "$lib/components/TopTracks.svelte";
  import * as Dropdown from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";
  import { MediaQuery } from "svelte/reactivity";

  let small = new MediaQuery("(max-width: 640px)");
  let displaying = $state<"tracks" | "artists">("tracks");
</script>

<main class="flex flex-col items-center justify-center">
  {#if small.current}
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button variant="outline" class="p-6">
          <h2 class="text-2xl font-bold text-center">
            {displaying == "tracks" ? "Top Tracks" : "Top Artists"}
          </h2>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item
          disabled={displaying == "tracks"}
          onclick={() => (displaying = "tracks")}
        >
          <h2 class="text-2xl font-bold">Top Tracks</h2>
        </Dropdown.Item>
        <Dropdown.Item
          disabled={displaying == "artists"}
          onclick={() => (displaying = "artists")}
        >
          <h2 class="text-2xl font-bold">Top Artists</h2>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>

    <div class="my-4">
      <TopTracks hidden={displaying == "artists"} />
      <TopArtists hidden={displaying == "tracks"} />
    </div>
  {:else}
    <div class="grid grid-cols-2 max-sm:grid-cols-1 m-16 space-y-16">
      <TopTracks />
      <TopArtists />
    </div>
  {/if}
</main>
