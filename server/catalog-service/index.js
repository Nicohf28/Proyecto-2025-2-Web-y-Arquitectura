// server/catalog-service/index.js
const express = require('express');
const cors = require('cors');
const all = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

/**
 * GET /places
 * Query params opcionales: type, category, q (búsqueda)
 */
app.get('/places', (req, res) => {
  const { type, category, q } = req.query;
  const query = (q || '').toLowerCase();

  let list = all;

  if (type && type !== 'All') list = list.filter(i => i.type === type);
  if (category && category !== 'All') list = list.filter(i => i.category === category);

  if (query) {
    list = list.filter(i => {
      const hay = `${i.name} ${i.desc} ${(i.tags||[]).join(' ')} ${i.neighborhood || i.location || ''}`.toLowerCase();
      return hay.includes(query);
    });
  }

  res.json({ count: list.length, items: list });
});

/**
 * GET /types
 * GET /categories?type=Restaurante|Parque|...
 */
app.get('/types', (_req, res) => {
  const types = Array.from(new Set(all.map(i => i.type)));
  res.json(types);
});

app.get('/categories', (req, res) => {
  const { type } = req.query;
  const base = type ? all.filter(i => i.type === type) : all;
  const cats = Array.from(new Set(base.map(i => i.category).filter(Boolean)));
  res.json(cats);
});

/**
 * GET /places/:id (detalle básico)
 */
app.get('/places/:id', (req, res) => {
  const item = all.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`catalog-service on http://localhost:${PORT}`);
});
