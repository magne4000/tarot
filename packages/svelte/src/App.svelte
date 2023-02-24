<script lang="ts">
  import Joueurs from './Joueurs.svelte';
  import Partie from './Partie.svelte';
  import Header from './Header.svelte';
  import { parties, page } from './lib/memoire';
</script>

<main>
  <Header />
  <div class="container max-w-xl mx-auto" class:hidden={$page !== 'joueurs'}>
    <Joueurs />
  </div>
  <div class="container max-w-xl mx-auto">
    {#each $parties as partie, index}
      <Partie n={index + 1} />
    {/each}
  </div>
</main>
