<script lang="ts">
  import { old_parties } from './lib/memoire';
  import { del_old_partie, continue_old_partie } from './lib/storage';

  const dateFormatter = Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' });
</script>

<h2 class="text-3xl font-bold mb-4">Parties précédentes</h2>

<ul>
  {#each $old_parties as partie}
    <li class="h-20 flex bg-base-100 hover:bg-base-200">
      <div class="flex p-4 flex-col justify-between flex-1">
        <div class="">
          {#each partie.joueurs as joueur}
            <span class="text-primary font-bold p-1">{joueur}</span>
          {/each}
        </div>
        <div class="flex justify-between">
          <span class="text-sm p-1">{dateFormatter.format(partie.date)}</span>
          <span class="text-sm p-1">
            {partie.parties.length}
            {partie.parties.length > 1 ? 'parties' : 'partie'}
          </span>
        </div>
      </div>
      <div class="flex justify-center items-center gap-2 pr-4">
        <button class="btn btn-error" on:click={() => del_old_partie(partie.date.toISOString())}>🗑</button>
        <button class="btn btn-primary" on:click={() => continue_old_partie(partie.date.toISOString())}>
          Reprendre
        </button>
      </div>
    </li>
  {/each}
</ul>
