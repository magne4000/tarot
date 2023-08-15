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
      <div class="mb-6" class:input-group={i === $joueurs.length - 1 && $parties.length === 0}>
        <input
          type="text"
          bind:value={joueur}
          name={'joueur-' + (i + 1)}
          placeholder={'Joueur ' + (i + 1)}
          class="input input-bordered w-full text-lg"
          autocomplete="off"
        />
        {#if i === $joueurs.length - 1 && $parties.length === 0}
          {#if $joueurs.length > 3}
            <button type="button" class="btn btn-error btn-outline" on:click={delJoueur}>-</button>
          {/if}
          {#if $joueurs.length < 5}
            <button type="button" class="btn btn-accent btn-outline" on:click={addJoueur}>+</button>
          {/if}
        {/if}
      </div>
    {/each}

    <div class="ui error message" />
    {#if $parties.length === 0}
      <div class="container flex justify-end">
        <button type="submit" class="btn btn-primary" disabled={!peut_demarrer}>Commencer</button>
      </div>
    {/if}
  </div>
</form>
