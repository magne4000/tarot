<script lang="ts">
  import { parties, scores, total } from './lib/memoire';
  import TableScores from './TableScores.svelte';

  let partie = $scores.length + 1;

  $: scores_a_afficher = partie === $scores.length + 1 ? $total : $scores[partie - 1].scores.map((s) => s.score);
</script>

<h2 class="text-3xl font-bold mb-4">Scores</h2>

<div class="container flex flex-col p-4 gap-4">
  <TableScores scores={scores_a_afficher} partie={partie === $scores.length + 1 ? undefined : $parties[partie - 1]} />
  <div class="form-control w-full">
    <label class="label" for="parties_selecteur">
      <span class="label-text">{partie === $scores.length + 1 ? 'Total' : `Partie n°${partie}`}</span>
    </label>
    <input
      name="parties_selecteur"
      type="range"
      min={1}
      max={$scores.length + 1}
      bind:value={partie}
      class="range range-sm"
    />
  </div>
</div>
