<script lang="ts">
  import type { Partie } from '@tarot/lib';
  import { joueurs } from './lib/memoire';

  export let scores: number[];
  export let partie: Partie;

  $: max_score = Math.max(...scores);
  $: max_score_abs = Math.max(...scores.map(Math.abs));
</script>

<table class="w-full overflow-hidden">
  <tbody class="w-full">
    {#each $joueurs as joueur, index}
      <tr class="w-full">
        <th class="w-8">
          {#if max_score === scores[index] && partie.quiapris === index}
            🏆
          {:else if partie.quiapris === index}
            ⚔
          {:else if partie.avecquelappele === index}
            🤝
          {/if}
        </th>
        <th class={`w-24 text-left ${
          partie.quiapris === index ? 'text-primary' :
          partie.avecquelappele === index ? 'text-secondary' :
          ''}`}>
          {joueur}
        </th>
        <td
          class="h-12 translate-x-0 transition-transform duration-300"
          style={scores[index] >= 0
            ? '--tw-translate-x: 50%;'
            : `--tw-translate-x: ${(1 - Math.abs(scores[index] / max_score_abs)) * 50}%;`}
        >
          <div
            class={`relative text-base-content overflow-visible tooltip transition-all duration-300 pl-2 py-2 ${
              scores[index] === max_score
                ? 'bg-success'
                : 'bg-base-content'
            }`}
            class:rounded-l-sm={scores[index] < 0}
            class:rounded-r-sm={scores[index] >= 0}
            style={`width: ${Math.abs(scores[index] / max_score_abs) * 50}%;`}
          >
            <span class="mix-blend-difference">{scores[index]}</span>
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
