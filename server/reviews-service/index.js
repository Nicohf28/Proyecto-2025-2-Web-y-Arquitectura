// server/reviews-service/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Base de reseñas muy simple
// clave = placeId
const REVIEWS = {
  r2: {
    placeId: 'r2',
    avg: 4.6,
    count: 128,
    comments: [
      { user: 'Ana', text: 'La pasta al dente, deliciosa.' },
      { user: 'Julián', text: 'Buen vino y servicio.' }
    ]
  },
  p5: {
    placeId: 'p5',
    avg: 4.2,
    count: 89,
    comments: [
      { user: 'Laura', text: 'Excelente para hacer deporte y caminar.' }
    ]
  },
  o3: {
    placeId: 'o3',
    avg: 4.8,
    count: 342,
    comments: [
      { user: 'Carlos', text: 'La vista de Bogotá es impresionante.' }
    ]
  }
};
    
// GET /reviews/:placeId
app.get('/reviews/:placeId', (req, res) => {
  const data = REVIEWS[req.params.placeId] || { placeId: req.params.placeId, avg: null, count: 0, comments: [] };
  res.json(data);
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`reviews-service on http://localhost:${PORT}`);
});
