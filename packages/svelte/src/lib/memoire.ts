import type { Partie } from '@tarot/lib';
import { get, writable } from 'svelte/store';

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

export const joueurs = writable(['', '', '']);

export const page = writable<number | 'joueurs' | 'scores'>('joueurs');

export const parties = writable<Partie[]>([]);
export const scores = writable<ScoreLine[]>([]);
export const total = writable<number[]>([]);

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
  const score_total: number[] = [];
  const lines = get(scores);

  for (const line of lines) {
    for (let j = 0; j < line.scores.length; j++) {
      if (typeof score_total[j] !== 'number') score_total.push(line.scores[j].score);
      else {
        score_total[j] += line.scores[j].score;
      }
    }
  }

  total.set(score_total);
}
