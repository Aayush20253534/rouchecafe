import assert from "node:assert/strict";
import test from "node:test";
import { parseStoredCart, updateCartQuantity } from "../src/lib/cart-storage";

const ids = new Set(["cappuccino", "croissant"]);
test("invalid saved cart structures do not crash hydration", () => {
  assert.deepEqual(parseStoredCart(null, ids), {});
  assert.deepEqual(parseStoredCart("{invalid", ids), {});
  assert.deepEqual(parseStoredCart("[]", ids), {});
  assert.deepEqual(parseStoredCart('"x"', ids), {});
});

test("only known products and positive integers are retained", () => {
  assert.deepEqual(parseStoredCart('{"cappuccino":2,"croissant":0,"unknown":4}', ids), { cappuccino: 2 });
  assert.deepEqual(parseStoredCart('{"cappuccino":2.5,"croissant":100}', ids), {});
});

test("quantity changes clamp at 99 and delete at zero", () => {
  assert.deepEqual(updateCartQuantity({}, "cappuccino", 1, ids), { cappuccino: 1 });
  assert.deepEqual(updateCartQuantity({ cappuccino: 98 }, "cappuccino", 10, ids), { cappuccino: 99 });
  assert.deepEqual(updateCartQuantity({ cappuccino: 2 }, "cappuccino", -2, ids), {});
  const current = { cappuccino: 1 };
  assert.equal(updateCartQuantity(current, "unknown", 1, ids), current);
  assert.equal(updateCartQuantity(current, "cappuccino", 0, ids), current);
});
