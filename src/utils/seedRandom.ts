/**
 * mulberry32 — 32-bit seeded PRNG
 *
 * Returns a stateful function that produces pseudo-random floats in [0, 1).
 * Given the same seed, the returned sequence is always identical.
 *
 * Algorithm: mulberry32 by Tommy Ettinger (public domain)
 * https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
 *
 * @param seed  Any integer. Coerced to uint32 internally — negatives and
 *              floats are safe to pass.
 * @returns     A stateful () => number function producing values in [0, 1).
 *
 * Usage:
 *   const rng = seededRandom(20260222);
 *   rng(); // always the same first value for this seed
 *   rng(); // always the same second value, etc.
 */
export function seededRandom(seed: number): () => number {
  // Coerce to uint32 — guards against negatives and floats
  let s = seed >>> 0;

  return function (): number {
    s += 0x6d2b79f5;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
