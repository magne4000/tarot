<script lang="ts">
  import { parties, page } from './lib/memoire';
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <span class="normal-case text-xl">Tarot</span>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><button type="button" class="btn btn-ghost" on:click={() => page.set('joueurs')}>Joueurs</button></li>
      <li><button type="button" class="btn btn-ghost" on:click={() => page.set('scores')}>Scores</button></li>
      <li>
        <button type="button" class="btn btn-ghost">
          Parties
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </button>
        <ul class="p-2 bg-base-100">
          {#each $parties as partie, index}
            <li>
              <button type="button" class="btn btn-ghost" on:click={() => page.set(index + 1)}>
                Partie n°{index + 1}
              </button>
            </li>
          {/each}
        </ul>
      </li>
    </ul>
  </div>
</div>
