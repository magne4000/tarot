<script context="module">
  import { parse } from './lib/storage';
  parse();
</script>

<script lang="ts">
  import Joueurs from './Joueurs.svelte';
  import Partie from './Partie.svelte';
  import Header from './Header.svelte';
  import Scores from './Scores.svelte';
  import { parties, page } from './lib/memoire';
  import Old from './Old.svelte';
</script>

<main class="h-full">
  <Header />
  <div class="px-4 pb-4">
    {#if $page === 'joueurs'}
      <div class="container max-w-xl mx-auto">
        <Joueurs />
      </div>
    {/if}

    {#if $page === 'scores'}
      <div class="container max-w-xl mx-auto">
        <Scores />
      </div>
    {/if}

    {#if $page === 'old'}
      <div class="container max-w-xl mx-auto">
        <Old />
      </div>
    {/if}

    <div class="container max-w-xl mx-auto">
      {#each $parties as partie, index}
        {#if $page === index + 1}
          <Partie n={index + 1} />
        {/if}
      {/each}
    </div>
  </div>
</main>
