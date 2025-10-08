<script lang="ts">
  import { MediaQuery } from "svelte/reactivity";
  import { getMe } from "$lib/spotify.remote";
  import { Button } from "$lib/components/ui/button";
  import { Menu } from "lucide-svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  let me = getMe();

  const small = new MediaQuery("(max-width: 640px)");
</script>

<header class="flex items-center justify-between">
  {#if small.current}
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Menu class="m-4" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <a href="/">
            <Button variant="link" class="text-xl p-2 font-bold cursor-pointer"
              >Home</Button
            >
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <a href="/top">
            <Button variant="link" class="text-xl p-2 cursor-pointer"
              >Top</Button
            >
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <a href="/playlists">
            <Button variant="link" class="text-xl p-2 cursor-pointer"
              >Playlists</Button
            >
          </a>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  {:else}
    <nav
      class="flex flex-row max-sm:flex-col items-center max-sm:items-start space-4"
    >
      <a href="/">
        <Button variant="link" class="text-xl p-2 ml-4 font-bold cursor-pointer"
          >Home</Button
        >
      </a>
      <a href="/top">
        <Button variant="link" class="text-xl p-2 cursor-pointer">Top</Button>
      </a>
      <a href="/playlists">
        <Button variant="link" class="text-xl p-2 cursor-pointer"
          >Playlists</Button
        >
      </a>
    </nav>
  {/if}

  {#if small.current}
    <h1 class="text-2xl font-black">WITWILLT?</h1>
  {:else}
    <h1 class="text-4xl font-black m-4 text-center">
      What in the World is Lucas Listening to?
    </h1>
  {/if}
  <div>
    {#await me}
      <p>...</p>
    {:then data}
      {#if data?.display_name}
        <a href={data.external_urls?.spotify} target="_blank">
          <div class="flex flex-row justify-center items-center w-fit m-4">
            <Button
              variant="link"
              class="cursor-pointer p-0 mr-2"
              hidden={small.current}>{data.display_name}</Button
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
