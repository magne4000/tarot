<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Contrat, calculer_points, type Points, type Partie, get_score_joueur } from '@tarot/lib';
  import FormControl from './FormControl.svelte';
  import JoueurSelect from './JoueurSelect.svelte';
  import Select from './Select.svelte';
  import { changer_partie, joueurs, page, parties, scores, update_score_total, type ScoreCol } from './lib/memoire';
  import { get_nom_joueur } from './lib/utils';

  export let n: number;
  let step = 0;
  let loaded = false;
  let points: Points | undefined;

  $: partie = $parties[n - 1];
  $: if (!loaded) {
    points = $scores[n - 1] ? calculer_points($joueurs.length, partie) : undefined;
    loaded = true;
  }

  function mise_a_jour_defense(e: Event) {
    partie.pointscomptesattaque = 91 - parseInt((e.target as HTMLInputElement).value, 10);
  }

  function contrat_str(contrat: Contrat | number | string) {
    switch (contrat) {
      case Contrat.Petite:
      case String(Contrat.Petite):
        return 'Petite';
      case Contrat.Garde:
      case String(Contrat.Garde):
        return 'Garde';
      case Contrat.GardeSans:
      case String(Contrat.GardeSans):
        return 'Garde Sans';
      case Contrat.GardeContre:
      case String(Contrat.GardeContre):
        return 'Garde Contre';
    }
  }

  function change_step(nouveau_step: number) {
    step = nouveau_step;
  }

  $: step0_valid = Boolean(
    partie.quelcontrat !== -1 && partie.quiapris !== -1 && ($joueurs.length === 5 ? partie.avecquelappele !== -1 : true)
  );

  $: if (step === 1) {
    // reactivity
    partie.chelemrealisepar;
    partie.nombredeboutsfaits;
    partie.petitmeneauboutpar;
    partie.pointscomptesattaque;

    calcul_score_partie();
  }

  function calcul_score_partie() {
    const scores_line: ScoreCol[] = [];
    points = calculer_points($joueurs.length, partie as Partie);

    for (let i = 0; i < $joueurs.length; i++) {
      scores_line.push({
        score: get_score_joueur(i, partie.quiapris, partie.avecquelappele, points),
        apris: partie.quiapris === i,
        estappele: partie.avecquelappele === i,
      });
    }

    $scores[n - 1] = {
      scores: scores_line,
      contrat: {
        label: contrat_str(partie.quelcontrat),
        color: points.preneur >= 0 ? 'green' : 'red',
      },
    };

    update_score_total();
  }
</script>

<h2 class="text-3xl font-bold mb-4">Partie n°{n}</h2>

<div class="container flex justify-center">
  <div class="stats shadow bg-base-200">
    <div class="stat">
      <div class="stat-title">Qui à pris</div>
      <div class="stat-value text-primary">
        {partie.quiapris !== -1 ? get_nom_joueur(partie.quiapris) : '-'}
      </div>
      <div class="stat-desc">{partie.quelcontrat ? contrat_str(partie.quelcontrat) : '-'}</div>
    </div>

    {#if $joueurs.length === 5}
      <div class="stat">
        <div class="stat-title">Appel</div>
        <div class="stat-value text-secondary">
          {partie.avecquelappele !== -1 ? get_nom_joueur(partie.avecquelappele) : '-'}
        </div>
        {#if typeof points?.appele === 'number'}
          <div class="stat-desc">{points.appele}</div>
        {/if}
      </div>
    {/if}

    <div class="stat">
      <div class="stat-title">Score</div>
      <div class="stat-value" class:text-success={points?.preneur >= 0} class:text-error={points?.preneur < 0}>
        {points ? points.preneur : '-'}
      </div>
    </div>
  </div>
</div>

<form on:submit|preventDefault={calcul_score_partie} class="container relative">
  {#if step === 0}
    <div class="container absolute top-0 left-0" transition:fly|local={{ duration: 300, x: -200 }}>
      <div class="grid gap-4 grid-cols-2">
        <!-- Qui à pris ? -->
        <JoueurSelect label="Qui à pris ?" name="quiapris" bind:value={partie.quiapris} />
        <!-- Quel contrat ? -->
        <Select label="Quel contrat ?" name="quelcontrat" bind:value={partie.quelcontrat}>
          <option value={-1} />
          <option value={1}>Petite</option>
          <option value={2}>Garde</option>
          <option value={4}>Garde sans</option>
          <option value={6}>Garde contre</option>
        </Select>
      </div>

      <!-- Qui est appelé ? -->
      {#if $joueurs.length === 5}
        <JoueurSelect label="Qui est appelé ?" name="avecquelappele" bind:value={partie.avecquelappele} />
      {/if}

      <details class="mt-3 rounded-lg hover:outline-summary outline-2">
        <summary class="label-text p-1 cursor-pointer">Annonces</summary>
        <div class="grid gap-4 grid-cols-2">
          <!-- Poignée 1 annoncée par ? -->
          <JoueurSelect
            label="Poignée 1 annoncée par ?"
            name="poignee1annonceepar"
            bind:value={partie.poignee1annonceepar}
          />
          <!-- Type de poignée 1 ? -->
          <Select label="Type de poignée 1 ?" name="typedepoignee1" bind:value={partie.typedepoignee1}>
            <option value={-1} />
            <option value={20}>Simple</option>
            <option value={30}>Double</option>
            <option value={40}>Triple</option>
          </Select>
        </div>

        <div class="grid gap-4 grid-cols-2">
          <!-- Poignée 2 annoncée par ? -->
          <JoueurSelect
            label="Poignée 2 annoncée par ?"
            name="poignee2annonceepar"
            bind:value={partie.poignee2annonceepar}
          />
          <!-- Type de poignée 2 ? -->
          <Select label="Type de poignée 2 ?" name="typedepoignee2" bind:value={partie.typedepoignee2}>
            <option value={-1} />
            <option value={20}>Simple</option>
            <option value={30}>Double</option>
            <option value={40}>Triple</option>
          </Select>
        </div>

        <!-- Chelem annoncé par ? -->
        <JoueurSelect label="Chelem annoncé par ?" name="chelemannoncepar" bind:value={partie.chelemannoncepar} />
      </details>

      <div class="mt-4 flex justify-end">
        <button type="button" class="btn btn-primary" disabled={!step0_valid} on:click={() => change_step(1)}>
          Finaliser
        </button>
      </div>
    </div>
  {/if}

  {#if step === 1}
    <div class="container absolute top-0 left-0" transition:fly|local={{ duration: 300, x: 200 }}>
      <div class="grid gap-4 grid-cols-2">
        <!-- Points comptés attaque -->
        <FormControl label="Points comptés attaque" name="pointscomptesattaque">
          <input
            class="input input-bordered"
            autocomplete="off"
            placeholder="91"
            type="number"
            min="0"
            max="91"
            name="pointscomptesattaque"
            bind:value={partie.pointscomptesattaque}
          />
        </FormControl>
        <FormControl label="Points comptés défense" name="pointscomptesdefense">
          <input
            class="input input-bordered"
            autocomplete="off"
            placeholder="91"
            type="number"
            min="0"
            max="91"
            name="pointscomptesdefense"
            value={91 - partie.pointscomptesattaque}
            on:input={mise_a_jour_defense}
          />
        </FormControl>
      </div>
      <!-- Nombre de bouts faits ? -->
      <FormControl label="Nombre de bouts faits ?" name="nombredeboutsfaits">
        <input
          class="input input-bordered"
          autocomplete="off"
          placeholder="3"
          type="number"
          min="0"
          max="3"
          name="nombredeboutsfaits"
          bind:value={partie.nombredeboutsfaits}
        />
      </FormControl>
      <div class="flex flex-row">
        <!-- Petit mené au bout par ? -->
        <div class="basis-1/2">
          <JoueurSelect
            label="Petit mené au bout par ?"
            name="petitmeneauboutpar"
            bind:value={partie.petitmeneauboutpar}
          />
        </div>

        <div class="divider divider-horizontal mt-[2.25rem]" />
        <!-- Chelem réalisé par ? -->
        <div class="basis-1/2">
          <JoueurSelect label="Chelem réalisé par ?" name="chelemrealisepar" bind:value={partie.chelemrealisepar} />
        </div>
      </div>

      <div class="sticky bottom-0 right-0 mt-4 flex justify-end gap-2">
        <button type="button" class="btn" on:click={() => change_step(0)}>Précédent</button>
        {#if $scores[n - 1]}
          <button type="button" class="btn btn-primary" on:click={changer_partie}>Valider</button>
        {/if}
      </div>
    </div>
  {/if}

  <div class="ui error message" />
</form>
