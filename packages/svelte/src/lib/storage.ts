import type { Unsubscriber } from 'svelte/store';
import {
  parties,
  joueurs,
  scores,
  type PersistedGame,
  old_parties,
  changer_partie,
  update_score_total,
} from './memoire';

const SEP = '|';

let subscriptions: Unsubscriber[] = [];
const unsub = () => {
  subscriptions.forEach((s) => s());
  subscriptions = [];
};

export function del_old_partie(isoDate: string) {
  if (confirm('Supprimer cette partie ?')) {
    const keys = Object.keys(localStorage).filter((key) => key.startsWith(`v2${SEP}${isoDate}`));
    keys.forEach((k) => localStorage.removeItem(k));

    old_parties.update((ops) => {
      return ops.filter((ps) => ps.date?.toISOString() !== isoDate);
    });
  }
}

function load_factory(k1: string) {
  return function persist(k2: string) {
    return JSON.parse(localStorage[`v2${SEP}${k1}${SEP}${k2}`]);
  };
}

export function continue_old_partie(isoDate: string) {
  if (confirm('Reprendre cette partie ?')) {
    // Partie en cours
    if (subscriptions.length > 0) {
      unsub();
    }

    const load = load_factory(isoDate);

    joueurs.set(load('joueurs'));
    parties.set(load('parties'));
    scores.set(load('scores'));

    update_score_total();
    changer_partie();

    watch(isoDate);
  }
}

export function parse() {
  const m = new Map<string, Partial<PersistedGame>>();
  for (const [key, value] of Object.entries(localStorage)) {
    const keyParts = key.split(SEP);

    if (keyParts[0] === 'v2') {
      if (!m.has(keyParts[1])) {
        m.set(keyParts[1], {
          date: new Date(keyParts[1]),
        });
      }
      m.get(keyParts[1])![keyParts[2]] = JSON.parse(value);
    }
  }

  old_parties.set(Array.from(m.values()));
}

function persist_factory(k1: string) {
  const tm: Record<string, number> = {};
  return function persist(k2: string, v: unknown) {
    clearTimeout(tm[k2]);
    tm[k2] = setTimeout(() => {
      localStorage[`v2${SEP}${k1}${SEP}${k2}`] = JSON.stringify(v);
    }, 1000);
  };
}

export function watch(date?: string) {
  unsub();

  const persist = persist_factory(date ?? new Date().toISOString());

  subscriptions.push(
    parties.subscribe((ps) => {
      persist('parties', ps);
    }),

    joueurs.subscribe((js) => {
      persist('joueurs', js);
    }),

    scores.subscribe((sc) => {
      persist('scores', sc);
    })
  );
}
