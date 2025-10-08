<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";

  let { data } = $props();
  let refresh = data?.refresh_token;
  let code = data?.code;
  let error = data?.error;

  console.log(data);
</script>

<div
  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 max-w-screen p-4"
>
  {#if error}
    <h1 class="text-4xl font-bold">Error</h1>
    <pre>${error}</pre>
  {/if}

  {#if !code}
    <h1 class="text-4xl font-bold">No code provided</h1>
    <p>Provide ?code= in the query string.</p>
  {/if}

  {#if !refresh}
    <h1 class="text-4xl font-bold">No refresh token received</h1>
    <p>
      Something went wrong. Make sure your redirect URI is set to
      <code>http://localhost:5173/authorize/callback</code> in your Spotify app settings.
    </p>
  {:else}
    <h1 class="text-4xl font-bold">Authorization complete</h1>
    <p>
      Copy the refresh token below and store it in your environment as <code
        class="wrap-anywhere">SPOTIFY_REFRESH_TOKEN</code
      > (server-only).
    </p>
    <pre
      style="background:#f7f7f7;padding:1rem;border-radius:6px;">{refresh}</pre>
    <p>
      Then restart your server (or set the secret on your host). After that,
      your site can call the Spotify API on your behalf.
    </p>
    <a href="/">
      <Button>Go Back</Button>
    </a>
  {/if}
</div>
