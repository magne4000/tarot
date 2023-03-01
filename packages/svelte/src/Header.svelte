<script lang="ts">
  import { parties, page, scores, old_parties } from './lib/memoire';

  function onChange(e: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
    e.preventDefault();
    page.set(e.currentTarget.selectedIndex);
    e.currentTarget.selectedIndex = 0;
  }
</script>

<div class="navbar">
  <div class="flex-1">
    <span class="uppercase font-bold tracking-wide">Tarot</span>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      {#if $old_parties.length > 0}
        <li>
          <button type="button" title="Parties précédentes" class="btn btn-ghost" on:click={() => page.set('old')}>
            🕘
          </button>
        </li>
      {/if}

      <li><button type="button" class="btn btn-ghost" on:click={() => page.set('joueurs')}>Joueurs</button></li>
      <li>
        <button type="button" class="btn btn-ghost" disabled={$scores.length === 0} on:click={() => page.set('scores')}>
          Scores
        </button>
      </li>
      <li>
        <select class="btn btn-ghost appearance-none" disabled={$parties.length === 0} on:change={onChange}>
          <option disabled selected>Parties</option>
          {#each $parties as partie, index}
            <option>
              Partie n°{index + 1}
            </option>
          {/each}
        </select>
      </li>
    </ul>
  </div>
</div>
