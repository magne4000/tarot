<script lang="ts">
  import { demarrer, joueurs, parties } from './lib/memoire';

  function addJoueur() {
    joueurs.update((js) => [...js, '']);
  }

  function delJoueur() {
    joueurs.update((js) => {
      js.pop();
      return js;
    });
  }

  $: peut_demarrer = $joueurs.every((j) => j.match(/\S+/));
</script>

<form class="ui form segment" on:submit|preventDefault={demarrer}>
  <h2 class="text-3xl font-bold mb-4">Joueurs</h2>
  <div>
    {#each $joueurs as joueur, i}
      <div class="mb-6">
        <input
          type="text"
          bind:value={joueur}
          name={'joueur-' + (i + 1)}
          placeholder={'Joueur ' + (i + 1)}
          class="input input-bordered w-full"
          autocomplete="off"
        />
      </div>
    {/each}

    <div class="ui error message" />
    {#if $parties.length === 0}
      <div>
        <button type="button" class="btn btn-accent btn-outline" on:click={addJoueur} disabled={$joueurs.length >= 5}>
          Ajouter un joueur
        </button>
        <button type="button" class="btn btn-warning btn-outline" on:click={delJoueur} disabled={$joueurs.length <= 3}>
          Retirer un joueur
        </button>

        <button type="submit" class="btn btn-primary" disabled={!peut_demarrer}>Commencer</button>
      </div>
    {/if}
  </div>
</form>
