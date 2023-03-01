<script lang="ts">
  import type { Partie, Points } from '@tarot/lib';
  import { joueurs } from './lib/memoire';
  import { contrat_str, get_nom_joueur, poignee_str } from './lib/utils';

  export let partie: Partie;
  export let points: Points | undefined = undefined;

  $: poignee1 = partie?.poignee1annonceepar !== -1 && partie?.typedepoignee1 !== -1;
  $: poignee2 = partie?.poignee2annonceepar !== -1 && partie?.typedepoignee2 !== -1;
  $: chelemannoncepar = partie?.chelemannoncepar !== -1;
  $: chelemrealisepar = partie?.chelemrealisepar !== -1;
  $: petitmeneauboutpar = partie?.petitmeneauboutpar !== -1;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div tabindex="0" class="collapse max-w-full rounded-box bg-base-200 shadow">
  <div class="collapse-title w-full overflow-x-hidden px-2 flex divide-x divide-stats">
    <div class="px-2 py-2">
      <div class="stat-title">Qui à pris</div>
      <div class="text-primary font-extrabold text-2xl">
        {partie.quiapris !== -1 ? get_nom_joueur(partie.quiapris) : '-'}
      </div>
      <div class="stat-desc">{partie.quelcontrat !== -1 ? contrat_str(partie.quelcontrat) : '-'}</div>
    </div>

    {#if $joueurs.length === 5}
      <div class="px-2 py-2">
        <div class="stat-title">Appel</div>
        <div class="text-secondary font-extrabold text-2xl">
          {partie.avecquelappele !== -1 ? get_nom_joueur(partie.avecquelappele) : '-'}
        </div>
        {#if typeof points?.appele === 'number'}
          <div class="stat-desc">{points.appele}</div>
        {/if}
      </div>
    {/if}

    <div class="px-2 py-2">
      <div class="stat-title">Score</div>
      <div
        class="font-extrabold text-2xl"
        class:text-success={points?.preneur >= 0}
        class:text-error={points?.preneur < 0}
      >
        {points ? points.preneur : '-'}
      </div>
    </div>
  </div>
  <div class="collapse-content text-sm">
    <ul>
      {#if poignee1}
        <li>
          <span class="font-bold text-info-content dark:text-info">{poignee_str(partie.typedepoignee1)}</span>
          annoncée par
          <span class="font-bold text-info-content dark:text-info">{get_nom_joueur(partie.poignee1annonceepar)}</span>
        </li>
      {/if}
      {#if poignee2}
        <li>
          <span class="font-bold text-info-content dark:text-info">{poignee_str(partie.typedepoignee2)}</span>
          annoncée par
          <span class="font-bold text-info-content dark:text-info">{get_nom_joueur(partie.poignee2annonceepar)}</span>
        </li>
      {/if}
      {#if !poignee1 && !poignee2}
        <li class="opacity-50 line-through">Poignées</li>
      {/if}
      {#if chelemannoncepar && chelemrealisepar && partie.chelemannoncepar === partie.chelemrealisepar}
        <li>
          <span class="font-bold text-info-content dark:text-info">Chelem</span>
          annoncé et réalisé par
          <span class="font-bold text-info-content dark:text-info">{get_nom_joueur(partie.chelemannoncepar)}</span>
        </li>
      {:else if chelemannoncepar && chelemrealisepar}
        <li>
          <span class="font-bold text-info-content dark:text-info">Chelem</span>
          annoncé par
          <span class="font-bold text-error">{get_nom_joueur(partie.chelemannoncepar)}</span>
          et réalisé par
          <span class="font-bold text-info-content dark:text-info">{get_nom_joueur(partie.chelemrealisepar)}</span>
        </li>
      {:else if chelemannoncepar && !chelemrealisepar}
        <li>
          <span class="font-bold text-info-content dark:text-info">Chelem</span>
          annoncé par
          <span class="font-bold text-info-content dark:text-info">{get_nom_joueur(partie.chelemannoncepar)}</span>
          et
          <span class="font-bold text-info-content dark:text-info">non réalisé</span>
        </li>
      {:else if chelemrealisepar && !chelemannoncepar}
        <li>
          <span class="font-bold text-info-content dark:text-info">Chelem</span>
          non annoncé et réalisé par
          <span class="font-bold text-info-content dark:text-info">{get_nom_joueur(partie.chelemrealisepar)}</span>
        </li>
      {:else}
        <li class="opacity-50 line-through">Chelem</li>
      {/if}
      {#if petitmeneauboutpar}
        <li>
          <span class="font-bold text-info-content dark:text-info">Petit mené au bout</span>
          par
          <span class="font-bold text-info-content dark:text-info">{get_nom_joueur(partie.petitmeneauboutpar)}</span>
        </li>
      {:else}
        <li class="opacity-50 line-through">Petit mené au bout</li>
      {/if}
    </ul>
  </div>
</div>

<style>
  .divide-stats > * {
    border-color: hsl(var(--bc) / 0.1);
  }
</style>
