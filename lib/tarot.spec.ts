import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { spyOn } from 'tinyspy';

import type { Joueur } from './tarot.js';
import tarot, {
  Contrat,
  get_chelem,
  get_chelem_calc,
  get_fait_de,
  get_petit,
  get_poignee,
  get_points_appel,
  Poignee,
} from './tarot.js';

test('get_fait_de', () => {
  assert.is(get_fait_de(56, 0), 0);
  assert.is(get_fait_de(51, 1), 0);
  assert.is(get_fait_de(41, 2), 0);
  assert.is(get_fait_de(36, 3), 0);
  assert.is(get_fait_de(0, 3), -36);
  assert.is(get_fait_de(91, 3), 55);
});

test('get_points_appel', () => {
  assert.is(get_points_appel(0, Contrat.Petite), 25);
  assert.is(get_points_appel(10, Contrat.Petite), 35);
  assert.is(get_points_appel(-10, Contrat.Petite), -35);
  assert.is(get_points_appel(0, Contrat.Garde), 50);
  assert.is(get_points_appel(10, Contrat.Garde), 70);
  assert.is(get_points_appel(-10, Contrat.Garde), -70);
  assert.is(get_points_appel(0, Contrat.GardeSans), 100);
  assert.is(get_points_appel(10, Contrat.GardeSans), 140);
  assert.is(get_points_appel(-10, Contrat.GardeSans), -140);
  assert.is(get_points_appel(0, Contrat.GardeContre), 150);
  assert.is(get_points_appel(10, Contrat.GardeContre), 210);
  assert.is(get_points_appel(-10, Contrat.GardeContre), -210);
});

test('get_points_appel', () => {
  const J1: Joueur = 'J1';
  const J2: Joueur = 'J2';
  const J3: Joueur = 'J3';
  assert.is(get_petit(J1, J1, J2, Contrat.Petite), 10);
  assert.is(get_petit(J2, J1, J2, Contrat.Petite), 10);
  assert.is(get_petit(J3, J1, J2, Contrat.Petite), -10);
  assert.is(get_petit(J1, J1, J2, Contrat.Garde), 20);
  assert.is(get_petit(J2, J1, J2, Contrat.Garde), 20);
  assert.is(get_petit(J3, J1, J2, Contrat.Garde), -20);
  assert.is(get_petit(J1, J1, J2, Contrat.GardeSans), 40);
  assert.is(get_petit(J2, J1, J2, Contrat.GardeSans), 40);
  assert.is(get_petit(J3, J1, J2, Contrat.GardeSans), -40);
  assert.is(get_petit(J1, J1, J2, Contrat.GardeContre), 60);
  assert.is(get_petit(J2, J1, J2, Contrat.GardeContre), 60);
  assert.is(get_petit(J3, J1, J2, Contrat.GardeContre), -60);
});

test('get_poignee', () => {
  const J1: Joueur = 'J1';
  assert.is(get_poignee(J1, Poignee.Simple, 10), 20);
  assert.is(get_poignee(J1, Poignee.Double, 10), 30);
  assert.is(get_poignee(J1, Poignee.Triple, 10), 40);
  assert.is(get_poignee(J1, Poignee.Simple, 0), 20);
  assert.is(get_poignee(J1, Poignee.Double, 0), 30);
  assert.is(get_poignee(J1, Poignee.Triple, 0), 40);
  assert.is(get_poignee(J1, Poignee.Simple, -10), -20);
  assert.is(get_poignee(J1, Poignee.Double, -10), -30);
  assert.is(get_poignee(J1, Poignee.Triple, -10), -40);
});

test('get_chelem_calc', () => {
  assert.is(get_chelem_calc(true, false, true, false), 400);
  assert.is(get_chelem_calc(true, false, false, false), -200);
  assert.is(get_chelem_calc(true, false, false, true), -200);
  assert.is(get_chelem_calc(false, true, true, false), 200);
  assert.is(get_chelem_calc(false, true, false, false), 200);
  assert.is(get_chelem_calc(false, true, false, true), -400);
});

test('get_chelem', () => {
  const spy = spyOn(tarot, 'get_chelem_calc');
  const J1: Joueur = 'J1';
  const J2: Joueur = 'J2';
  const J3: Joueur = 'J3';

  assert.is.not(get_chelem(J1, J1, J1, J2), 0);
  assert.equal(spy.calls[0], [true, false, true, false]);

  spy.reset();
  assert.is.not(get_chelem(undefined, J1, J1, J2), 0);
  assert.equal(spy.calls[0], [false, false, true, false]);

  spy.reset();
  assert.is.not(get_chelem(J3, J1, J1, J2), 0);
  assert.equal(spy.calls[0], [false, true, true, false]);

  spy.reset();
  assert.is.not(get_chelem(J1, J3, J1, J2), 0);
  assert.equal(spy.calls[0], [true, false, false, true]);

  spy.reset();
  assert.is.not(get_chelem(undefined, J3, J1, J2), 0);
  assert.equal(spy.calls[0], [false, false, false, true]);

  spy.reset();
  assert.is.not(get_chelem(J3, J3, J1, J2), 0);
  assert.equal(spy.calls[0], [false, true, false, true]);

  spy.reset();
  assert.is.not(get_chelem(J1, undefined, J1, J2), 0);
  assert.equal(spy.calls[0], [true, false, false, false]);

  spy.reset();
  assert.is(get_chelem(undefined, undefined, J1, J2), 0);
  assert.is.not(get_chelem(J3, undefined, J1, J2), 0);
  assert.equal(spy.calls[0], [false, true, false, false]);

  spy.restore();
});

test.run();
