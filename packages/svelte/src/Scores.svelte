<script lang="ts">
  import { parties, scores, total_cumule } from './lib/memoire';
  import TableScores from './TableScores.svelte';

  let partie = $total_cumule.length - 1;

  $: cumule = $total_cumule[Math.min(partie, $total_cumule.length - 1)]
</script>

<h2 class="text-3xl font-bold mb-4">Scores cumulés</h2>

<div class="container flex flex-col p-4 gap-4">
  <TableScores scores={cumule} partie={$parties[partie]} />
  <div class="form-control w-full">
    <label class="label" for="parties_selecteur">
      <span class="label-text">{`Partie n°${partie + 1}`}</span>
    </label>
    <input
      name="parties_selecteur"
      type="range"
      min={0}
      max={$total_cumule.length - 1}
      bind:value={partie}
      class="range range-sm"
    />
  </div>
</div>
