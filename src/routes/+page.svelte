<script lang="ts">
  import CurrentlyPlaying from "$lib/components/CurrentlyPlaying.svelte";
  import Queued from "$lib/components/Queued.svelte";
  import RecentlyPlayed from "$lib/components/RecentlyPlayed.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Dropdown from "$lib/components/ui/dropdown-menu";
  import { MediaQuery } from "svelte/reactivity";

  let small = new MediaQuery("(max-width: 640px)");
  let displaying = $state<"recent" | "queue">("recent");
</script>

<main class="flex flex-col items-center m-16">
  <CurrentlyPlaying />
  <div class="h-1 m-4 w-full rounded"></div>
  {#if small.current}
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button variant="outline" class="p-6">
          <h2 class="text-2xl font-bold text-center">
            {displaying == "recent" ? "Recently Played" : "Queued Tracks"}
          </h2>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item
          disabled={displaying == "recent"}
          onclick={() => (displaying = "recent")}
        >
          <h2 class="text-2xl font-bold">Recently Played</h2>
        </Dropdown.Item>
        <Dropdown.Item
          disabled={displaying == "queue"}
          onclick={() => (displaying = "queue")}
        >
          <h2 class="text-2xl font-bold">Queued Tracks</h2>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>

    <div class="mt-4">
      <RecentlyPlayed hidden={displaying == "queue"} />
      <Queued hidden={displaying == "recent"} />
    </div>
  {:else}
    <div class="grid grid-cols-2">
      <RecentlyPlayed />
      <Queued />
    </div>
  {/if}
</main>
