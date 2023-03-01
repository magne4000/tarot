<script lang="ts">
  import type { Partie } from '@tarot/lib';
  import { joueurs } from './lib/memoire';

  export let scores: number[];
  export let partie: Partie | undefined = undefined;

  $: max_score = Math.max(...scores);
  $: max_score_abs = Math.max(...scores.map(Math.abs));
</script>

<table class="w-full overflow-hidden">
  <tbody class="w-full">
    {#each $joueurs as joueur, index}
      <tr class="w-full">
        <th class="w-8">
          {#if max_score === scores[index] && (partie === undefined || partie.quiapris === index)}
            🏆
          {:else if partie?.quiapris === index}
            ⚔
          {:else if partie?.avecquelappele === index}
            🤝
          {/if}
        </th>
        <th class="w-24 text-left">
          {joueur}
        </th>
        <td
          class="h-12 translate-x-0 transition-transform duration-300"
          style={scores[index] >= 0
            ? '--tw-translate-x: 50%;'
            : `--tw-translate-x: ${(1 - Math.abs(scores[index] / max_score_abs)) * 50}%;`}
        >
          <div
            data-tip={scores[index]}
            class={`tooltip transition-all duration-300 pl-2 py-2 ${
              partie === undefined && max_score === scores[index]
                ? 'bg-success text-success-content'
                : partie?.quiapris === index
                ? 'bg-primary text-primary-content'
                : partie?.avecquelappele === index
                ? 'bg-secondary text-secondary-content'
                : 'bg-base-content text-base-100'
            }`}
            class:tooltip-open={Math.abs(scores[index] / max_score_abs) < 0.15}
            class:tooltip-left={scores[index] < 0}
            class:tooltip-right={scores[index] >= 0}
            class:rounded-l-sm={scores[index] < 0}
            class:rounded-r-sm={scores[index] >= 0}
            style={`width: ${Math.abs(scores[index] / max_score_abs) * 50}%;`}
          >
            {scores[index]}
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
