// src/api/client.js
const CATALOG_BASE = import.meta.env.VITE_CATALOG_API;
const REVIEWS_BASE = import.meta.env.VITE_REVIEWS_API;

export async function fetchPlaces({ type = 'All', category = 'All', q = '' } = {}) {
  const url = new URL(`${CATALOG_BASE}/places`);
  if (type) url.searchParams.set('type', type);
  if (category) url.searchParams.set('category', category);
  if (q) url.searchParams.set('q', q);

  const r = await fetch(url);
  if (!r.ok) throw new Error('Error al cargar lugares');
  return r.json(); // { count, items }
}

export async function fetchTypes() {
  const r = await fetch(`${CATALOG_BASE}/types`);
  if (!r.ok) throw new Error('Error al cargar tipos');
  return r.json(); // []
}

export async function fetchCategories(type) {
  const url = new URL(`${CATALOG_BASE}/categories`);
  if (type) url.searchParams.set('type', type);
  const r = await fetch(url);
  if (!r.ok) throw new Error('Error al cargar categorías');
  return r.json(); // []
}

export async function fetchReviews(placeId) {
  const r = await fetch(`${REVIEWS_BASE}/reviews/${placeId}`);
  if (!r.ok) throw new Error('Error al cargar reseñas');
  return r.json(); // { placeId, avg, count, comments: [] }
}
