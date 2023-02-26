<script lang="ts">
  import Select from './Select.svelte';
  import { joueurs } from './lib/memoire';

  export let label: string;
  export let name: string;
  export let value: number = -1;
</script>

<Select {label} {name} bind:value>
  <option value="-1" />
  {#each $joueurs as joueur, index}
    <option value={index}>
      {joueur}
    </option>
  {/each}
</Select>
