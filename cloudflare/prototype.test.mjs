import { test } from 'node:test';
import assert from 'node:assert/strict';

// Run against an already started local Wrangler instance.
const base = process.env.XPHARMA_TEST_URL || 'http://127.0.0.1:8790';
test('health and catalogue', async () => {
  const health = await fetch(`${base}/api/health`);
  assert.equal(health.status, 200);
  assert.equal((await health.json()).status, 'ok');
  const list = await fetch(`${base}/api/products`);
  assert.equal(list.status, 200);
  const { products } = await list.json();
  assert.ok(products.some(product => product.product_id === 'XPH-101'));
  assert.ok(products.every(product => !('stock_quantity' in product)));
  const product = await fetch(`${base}/api/products/XPH-101`);
  assert.equal((await product.json()).product.product_name, 'Blemease Cream');
  assert.equal((await fetch(`${base}/api/products/not-a-product`)).status, 404);
});
