<script lang="ts">
  import { joueurs, parties, scores, total } from './lib/memoire';

  function ismax(value: number, values: number[]) {
    return Math.max(...values) === value;
  }
</script>

<h2 class="text-3xl font-bold mb-4">Scores</h2>

<table class="table table-zebra w-full">
  <thead>
    <tr>
      <th>#</th>
      {#each $joueurs as joueur}
        <th>{joueur}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each $scores as line, index}
      <tr>
        <td>
          Partie n°{index + 1}
        </td>
        {#each line.scores as col, ind_joueur}
          <td
            class:border={col.apris}
            class:border-success={col.apris && col.score >= 0}
            class:border-error={col.apris && col.score < 0}
          >
            <div class="relative w-full h-full">
              {#if col.apris && col.score >= 0}
                <span class="badge badge-lg badge-success absolute -right-4 -top-4 rounded-none rounded-bl-md">⚔</span>
              {/if}
              {#if col.apris && col.score < 0}
                <span class="badge badge-lg badge-error absolute -right-4 -top-4 rounded-none rounded-bl-md">⚔</span>
              {/if}
              {#if col.estappele}
                <span class="badge badge-lg absolute -right-4 -top-4 rounded-none rounded-bl-md">🤝</span>
              {/if}
              {col.score}
            </div>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
  <tfoot>
    <tr>
      <th>Total</th>
      {#each $total as score_col}
        <th>
          <div class="relative w-full h-full">
            {#if ismax(score_col, $total)}
              <span class="badge badge-lg absolute -right-4 -top-4 rounded-none rounded-bl-md">🏆</span>
            {/if}
            {score_col}
          </div>
        </th>
      {/each}
    </tr>
  </tfoot>
</table>
