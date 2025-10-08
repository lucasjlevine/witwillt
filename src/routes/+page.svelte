<script lang="ts">
  import CurrentlyPlaying from "$lib/components/CurrentlyPlaying.svelte";
  import Queued from "$lib/components/Queued.svelte";
  import RecentlyPlayed from "$lib/components/RecentlyPlayed.svelte";
</script>

<main class="flex flex-col items-center m-16">
  <CurrentlyPlaying />
  <div class="h-1 m-4 w-full rounded"></div>
  <div class="grid grid-cols-2">
    <RecentlyPlayed />
    <Queued />
  </div>
</main>
