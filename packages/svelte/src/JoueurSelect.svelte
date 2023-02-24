<script lang="ts">
    import FormControl from './FormControl.svelte';
  import { joueurs } from './lib/memoire';

  export let label: string;
  export let name: string;
  export let value: string = '';
</script>

<FormControl {label} {name}>
  <select class="select" {name} bind:value>
    <option value="">Joueur</option>
    {#each $joueurs as joueur}
      <option value={joueur}>
        {joueur}
      </option>
    {/each}
  </select>
</FormControl>
