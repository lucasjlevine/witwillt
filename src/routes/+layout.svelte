<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { getMe } from "$lib/spotify.remote";
  import { Button } from "$lib/components/ui/button";

  let me = getMe();

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<svelte:boundary>
  <header class="flex items-center justify-between">
    <nav class="w-full">
      <a href="/" class="text-xl font-bold p-4 inline-block">Home</a>
      <a href="/top">Top</a>
      <a href="/playlists" class="ml-4">Playlists</a>
    </nav>
    <div>
      {#await me}
        <p>...</p>
      {:then data}
        {#if data?.display_name}
          <a href={data.external_urls?.spotify} target="_blank">
            <div class="flex flex-row justify-center items-center w-fit m-4">
              <Button variant="link" class="cursor-pointer p-0 mr-2"
                >{data.display_name}</Button
              >
              <img
                src={data.images[0]?.url}
                alt="lucaslevine12 profile"
                class="w-10 h-10 rounded-full"
              />
            </div>
          </a>
        {/if}
      {/await}
    </div>
  </header>
  {@render children?.()}

  {#snippet pending()}{/snippet}
</svelte:boundary>
