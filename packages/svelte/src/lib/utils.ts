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
