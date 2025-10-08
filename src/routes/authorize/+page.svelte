<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  let { data } = $props();

  const openAuth = () => {
    window.open(data.authorizationUrl, "_blank");
  };
</script>

<div
  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
>
  <h1 class="text-4xl font-bold">Authorize Spotify Access</h1>
  <p>
    Click the button below, sign in when Spotify prompts, and allow the
    requested scopes.
  </p>

  <a href={data.authorizationUrl} class="cursor-pointer">
    <Button class="m-4">Open Spotify authorization</Button>
  </a>
</div>
