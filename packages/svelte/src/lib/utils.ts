import { Contrat, Poignee } from '@tarot/lib';
import { get } from 'svelte/store';
import { joueurs } from './memoire';

export function get_nom_joueur(joueur: string | number) {
  return get(joueurs)[typeof joueur === 'number' ? joueur : parseInt(joueur, 10)];
}

const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });

const suffixes = new Map([
  ['one', 'st'],
  ['two', 'nd'],
  ['few', 'rd'],
  ['other', 'th'],
]);

export function formatOrdinals(n: number) {
  const rule = pr.select(n);
  const suffix = suffixes.get(rule);
  return `${n}${suffix}`;
}

export function contrat_str(contrat: Contrat | number | string) {
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

export function poignee_str(contrat: Poignee | number | string) {
  switch (contrat) {
    case Poignee.Double:
    case String(Poignee.Double):
      return 'Poignée Double';
    case Poignee.Simple:
    case String(Poignee.Simple):
      return 'Poignée Simple';
    case Poignee.Triple:
    case String(Poignee.Triple):
      return 'Poignée Triple';
  }
}
