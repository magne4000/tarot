<script lang="ts">
  import FormControl from './FormControl.svelte';
  import JoueurSelect from './JoueurSelect.svelte';
  import { joueurs, page } from './lib/memoire';

  export let n: number;

  let quiapris: string;
  let avecquelappele: string;
  let quelcontrat: number;
  let pointscomptesattaque = 0;
  let nombredeboutsfaits = 0;
  let petitmeneauboutpar: string;
  let poignee1annonceepar: string;
  let typedepoignee1: number;
  let poignee2annonceepar: string;
  let typedepoignee2: number;
  let chelemannoncepar: string;
  let chelemrealisepar: string;

  function mise_a_jour_defense(e: Event) {
    pointscomptesattaque = 91 - parseInt((e.target as HTMLInputElement).value, 10);
  }

  function calcul_score_partie() {}
</script>

<form class:hidden={$page !== n} on:submit|preventDefault={calcul_score_partie}>
  <h2 class="text-3xl font-bold">Partie n°{n}</h2>
  <!-- Qui à pris ? -->
  <JoueurSelect label="Qui à pris ?" name="quiapris" bind:value={quiapris} />
  <!-- Qui est appelé ? -->
  {#if $joueurs.length === 5}
    <JoueurSelect label="Qui est appelé ?" name="avecquelappele" bind:value={avecquelappele} />
  {/if}

  <!-- Quel contrat ? -->
  <FormControl label="Quel contrat ?" name="quelcontrat">
    <select class="select" name="quelcontrat" bind:value={quelcontrat}>
      <option value="">Contrat</option>
      <option value="1">Petite</option>
      <option value="2">Garde</option>
      <option value="4">Garde sans</option>
      <option value="6">Garde contre</option>
    </select>
  </FormControl>
  <!-- Points comptés attaque -->
  <FormControl label="Points comptés attaque" name="pointscomptesattaque">
    <input
      class="input"
      autocomplete="off"
      placeholder="91"
      type="number"
      min="0"
      max="91"
      name="pointscomptesattaque"
      bind:value={pointscomptesattaque}
    />
  </FormControl>
  <FormControl label="Points comptés défense" name="pointscomptesdefense">
    <input
      class="input"
      autocomplete="off"
      placeholder="91"
      type="number"
      min="0"
      max="91"
      name="pointscomptesdefense"
      value={91 - pointscomptesattaque}
      on:input={mise_a_jour_defense}
    />
  </FormControl>
  <!-- Nombre de bouts faits ? -->
  <FormControl label="Nombre de bouts faits ?" name="nombredeboutsfaits">
    <input
      class="input"
      autocomplete="off"
      placeholder="3"
      type="number"
      min="0"
      max="3"
      name="nombredeboutsfaits"
      bind:value={nombredeboutsfaits}
    />
  </FormControl>
  <!-- Petit mené au bout par ? -->
  <JoueurSelect label="Petit mené au bout par ?" name="petitmeneauboutpar" bind:value={petitmeneauboutpar} />
  <!-- Poignée 1 annoncée par ? -->
  <JoueurSelect label="Poignée 1 annoncée par ?" name="poignee1annonceepar" bind:value={poignee1annonceepar} />
  <!-- Type de poignée 1 ? -->
  <FormControl label="Type de poignée 1 ?" name="typedepoignee1">
    <select class="select" name="typedepoignee1" bind:value={typedepoignee1}>
      <option value="">Poignee</option>
      <option value="20">Simple</option>
      <option value="30">Double</option>
      <option value="40">Triple</option>
    </select>
  </FormControl>
  <JoueurSelect label="Poignée 2 annoncée par ?" name="poignee2annonceepar" bind:value={poignee2annonceepar} />
  <!-- Type de poignée 2 ? -->
  <FormControl label="Type de poignée 2 ?" name="typedepoignee2">
    <select class="select" name="typedepoignee2" bind:value={typedepoignee2}>
      <option value="">Poignee</option>
      <option value="20">Simple</option>
      <option value="30">Double</option>
      <option value="40">Triple</option>
    </select>
  </FormControl>
  <!-- Chelem annoncé par ? -->
  <JoueurSelect label="Chelem annoncé par ?" name="chelemannoncepar" bind:value={chelemannoncepar} />
  <!-- Chelem réalisé par ? -->
  <JoueurSelect label="Chelem réalisé par ?" name="chelemrealisepar" bind:value={chelemrealisepar} />

  <div class="ui error message" />
  <div class="sticky bottom-0 right-0 flex justify-end">
    <button type="submit" class="btn btn-primary">Valider</button>
  </div>
</form>
