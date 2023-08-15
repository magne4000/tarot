import type { Partie } from '@tarot/lib';
import { get, writable } from 'svelte/store';
import { watch } from './storage';

export interface ScoreCol {
  score: number;
  apris: boolean;
  estappele: boolean;
}

export interface ScoreLine {
  scores: ScoreCol[];
  contrat: {
    label: string;
    color: string;
  };
}

export interface PersistedGame {
  scores: number[];
  parties: Partie[];
  joueurs: string[];
  date: Date;
}

export const joueurs = writable(['', '', '']);
export const page = writable<number | 'joueurs' | 'scores' | 'old'>('joueurs');
export const parties = writable<Partie[]>([]);
export const scores = writable<ScoreLine[]>([]);
export const total_cumule = writable<number[][]>([]);
export const old_parties = writable<Partial<PersistedGame>[]>([]);

function creer_partie(): Partie {
  return {
    quiapris: -1,
    avecquelappele: -1,
    quelcontrat: -1,
    pointscomptesattaque: 0,
    nombredeboutsfaits: 0,
    petitmeneauboutpar: -1,
    poignee1annonceepar: -1,
    typedepoignee1: -1,
    poignee2annonceepar: -1,
    typedepoignee2: -1,
    chelemannoncepar: -1,
    chelemrealisepar: -1,
  };
}

export function demarrer() {
  parties.set([creer_partie()]);
  page.set(1);

  watch();
}

export function changer_partie() {
  const scores_len = get(scores).length;
  const parties_len = get(parties).length;

  if (parties_len === scores_len) {
    parties.update((ps) => [...ps, creer_partie()]);
  }

  page.set(scores_len + 1);
}

export function update_score_total() {
  const score_total: number[][] = [];
  const lines = get(scores);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const partie_i = line.scores.map(s => s.score);

    if (i > 0) {
      for (let j = 0; j < line.scores.length; j++) {
        partie_i[j] += score_total[i - 1][j];
      }
    }

    score_total.push(partie_i);
  }

  total_cumule.set(score_total);
}
