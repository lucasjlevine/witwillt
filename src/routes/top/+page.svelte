<script lang="ts">
  import TopArtists from "$lib/components/TopArtists.svelte";
  import TopTracks from "$lib/components/TopTracks.svelte";
</script>

<main class="grid grid-cols-2 max-sm:grid-cols-1 m-16 space-y-16">
  <TopTracks />
  <TopArtists />
</main>
