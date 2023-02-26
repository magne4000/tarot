import { get } from 'svelte/store';
import { joueurs } from './memoire';

export function get_nom_joueur(joueur: string | number) {
  return get(joueurs)[typeof joueur === 'number' ? joueur : parseInt(joueur, 10)];
}
