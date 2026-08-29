import assert from "node:assert/strict";
import { test } from "node:test";
import { roundToCooking, scaleQuantity } from "./scaling.ts";

const rice = { baseQuantity: 3, unit: "cup", scalesWithServings: true };
const salt = { baseQuantity: 1.5, unit: "tsp", scalesWithServings: false };
const fenugreek = { baseQuantity: 1, unit: "tsp", scalesWithServings: false };

test("linear ingredient scales with servings (rice, base 3 cup / 4 servings)", () => {
  assert.equal(scaleQuantity(rice, 2, 4), 1.5);
  assert.equal(scaleQuantity(rice, 4, 4), 3);
  assert.equal(scaleQuantity(rice, 8, 4), 6);
});

test("non-scaling ingredient is never multiplied (salt, fenugreek)", () => {
  assert.equal(scaleQuantity(salt, 1, 4), 1.5);
  assert.equal(scaleQuantity(salt, 4, 4), 1.5);
  assert.equal(scaleQuantity(salt, 8, 4), 1.5);
  assert.equal(scaleQuantity(fenugreek, 2, 4), 1);
});

test("rounding: does not emit unprecise values like 0.73 tsp", () => {
  const base = { baseQuantity: 2.9, unit: "tsp", scalesWithServings: true };
  const scaled = scaleQuantity(base, 1, 4);
  assert.equal(scaled, 0.75);
  assert.equal(scaled % 0.25, 0);
});

test("rounding: lands on a cooking-sensible increment for cups", () => {
  const veg = { baseQuantity: 0.7, unit: "cup", scalesWithServings: true };
  const scaled = scaleQuantity(veg, 1, 3);
  assert.equal(scaled, 0.25);
  assert.equal(scaled % 0.25, 0);
});

test("roundToCooking rounds to nearest 1/4 tsp", () => {
  assert.equal(roundToCooking(0.726, "tsp"), 0.75);
  assert.equal(roundToCooking(1.1, "tsp"), 1);
  assert.equal(roundToCooking(0.23, "tsp"), 0.25);
});

test("roundToCooking uses whole-unit increments for count-based units", () => {
  assert.equal(roundToCooking(2.6, "piece"), 3);
  assert.equal(roundToCooking(2.4, "sprig"), 2);
});

test("rejects non-positive servings", () => {
  assert.throws(() => scaleQuantity(rice, 0, 4), /selectedServings/);
  assert.throws(() => scaleQuantity(rice, 2, 0), /baseServings/);
});