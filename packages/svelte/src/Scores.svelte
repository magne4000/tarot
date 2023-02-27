<script lang="ts">
  import { joueurs, parties, scores, total } from './lib/memoire';
  import { formatOrdinals } from './lib/utils';

  $: joueurs_tri = [...$joueurs.keys()]
    .sort((a, b) => {
      return $total[b] - $total[a];
    })
    .map((index) => ({
      joueur: $joueurs[index],
      score: $total[index],
    }));

  function ismax(value: number, values: number[]) {
    return Math.max(...values) === value;
  }
</script>

<h2 class="text-3xl font-bold mb-4">Scores</h2>

<div class="container flex justify-center">
  <div class="stats shadow">
    {#each joueurs_tri as joueur, index}
      <div class="stat">
        <div class="stat-title">{ismax(joueur.score, $total) ? '🏆' : formatOrdinals(index + 1)}</div>
        <div class="stat-value" class:text-primary={ismax(joueur.score, $total)}>{joueur.joueur}</div>
        <div class="stat-desc">
          {joueur.score}
        </div>
      </div>
    {/each}
  </div>
</div>

<p class="text-red-500">TODO: replace table with list of games</p>

<div class="w-full flex md:table">
  <div class="flex flex-col md:table-row min-w-min shrink-0">
    <div class="h-14 p-4 md:table-cell">#</div>
    {#each $joueurs as joueur}
      <div class="h-14 p-4 md:table-cell">{joueur}</div>
    {/each}
  </div>
  <div class="flex flex-row md:table-row-group relative overflow-x-auto overflow-y-hidden">
    {#each $scores as line, index}
      <div class="flex flex-col md:table-row min-w-min shrink-0">
        <div class="h-14 p-4">
          Partie n°{index + 1}
        </div>
        {#each line.scores as col, ind_joueur}
          <div
            class="relative h-14 p-4 md:table-cell"
            class:border={col.apris}
            class:border-success={col.apris && col.score >= 0}
            class:border-error={col.apris && col.score < 0}
          >
            {#if col.apris && col.score >= 0}
              <span class="badge badge-score badge-success">⚔</span>
            {/if}
            {#if col.apris && col.score < 0}
              <span class="badge badge-score badge-error">⚔</span>
            {/if}
            {#if col.estappele}
              <span class="badge badge-score">🤝</span>
            {/if}
            {col.score}
          </div>
        {/each}
      </div>
    {/each}

    <div class="flex flex-col md:table-row min-w-min shrink-0">
      <div class="h-14 p-4 md:table-cell">Total</div>
      {#each $total as score_col}
        <div class="h-14 p-4 relative md:table-cell">
          {#if ismax(score_col, $total)}
            <span class="badge badge-score">🏆</span>
          {/if}
          {score_col}
        </div>
      {/each}
    </div>
  </div>
</div>
