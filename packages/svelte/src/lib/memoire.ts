import type { Partie } from '@tarot/lib';
import { writable } from 'svelte/store';

export const joueurs = writable(['', '', '']);

export const page = writable<number | 'joueurs' | 'scores'>('joueurs');

export const parties = writable<Partial<Partie>[]>([]);

export function demarrer() {
  parties.set([{}]);
  page.set(1);
}
