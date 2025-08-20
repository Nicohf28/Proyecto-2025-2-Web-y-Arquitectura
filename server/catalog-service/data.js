// server/catalog-service/data.js
module.exports = [
  // Restaurantes - Italianos
  { id: 'r1', type: 'Restaurante', category: 'Italianos', name: 'La Fabbrica', neighborhood: 'Zona T', tags: ['Italiano','Pasta','Reservas'], desc: 'Auténtica cocina italiana; pastas hechas a mano, ambiente elegante.' },
  { id: 'r2', type: 'Restaurante', category: 'Italianos', name: 'Trattoria Italia', neighborhood: 'Chapinero', tags: ['Italiano','Familia'], desc: 'Trattoria acogedora con menú tradicional y buenos vinos.' },
  // Restaurantes - Caseros
  { id: 'r3', type: 'Restaurante', category: 'Caseros', name: 'Restaurante Sol y Luna', neighborhood: 'Modelia', tags: ['Casero','Familiar'], desc: 'Comida de hogar, porciones generosas, buen precio.' },
  { id: 'r4', type: 'Restaurante', category: 'Caseros', name: 'Sazón de Casa', neighborhood: 'Teusaquillo', tags: ['Casero','Mercado'], desc: 'Sabores caseros con ingredientes locales.' },
  // Restaurantes - Típicos
  { id: 'r5', type: 'Restaurante', category: 'Típicos', name: 'Andrés Carne de Res (El Dorado)', neighborhood: 'Zona Rosa / Aeropuerto', tags: ['Típico','Fiesta'], desc: 'Experiencia gastronómica y de entretenimiento, platos grandes y música.' },
  { id: 'r6', type: 'Restaurante', category: 'Típicos', name: 'La Puerta Falsa', neighborhood: 'Centro Histórico', tags: ['Típico','Historia'], desc: 'Arepas y platos tradicionales, lugar histórico de Bogotá.' },
  { id: 'r7', type: 'Restaurante', category: 'Típicos', name: 'El Tambor', neighborhood: 'La Calera', tags: ['Típico','Asados'], desc: 'Restaurante de montaña con platos típicos y vista panorámica.' },
  // Restaurantes - De eventos
  { id: 'r8', type: 'Restaurante', category: 'De eventos', name: 'Club de Banqueros', neighborhood: 'Centro Internacional', tags: ['Eventos','Salones'], desc: 'Salones y catering para eventos corporativos y sociales.' },
  { id: 'r9', type: 'Restaurante', category: 'De eventos', name: 'Hacienda El Cedro', neighborhood: 'Usaquén', tags: ['Eventos','Bodas'], desc: 'Lugar campestre para eventos, banquetes y bodas.' },
  // Restaurantes - Veganos / Vegetarianos
  { id: 'r10', type: 'Restaurante', category: 'Veganos / Vegetarianos', name: 'El Árbol de la Vida', neighborhood: 'Chapinero', tags: ['Vegano','Saludable'], desc: 'Opciones 100% veganas y menús del día saludables.' },
  { id: 'r11', type: 'Restaurante', category: 'Veganos / Vegetarianos', name: 'El Huerto', neighborhood: 'La Candelaria', tags: ['Vegetariano','Casual'], desc: 'Pequeño restaurante con platos basados en productos frescos.' },
  // Restaurantes - De comida rápida
  { id: 'r12', type: 'Restaurante', category: 'De comida rápida', name: 'El Corral Gourmet', neighborhood: 'Parque de la 93', tags: ['FastFood','Hamburguesa'], desc: 'Hamburguesas y combos con opción gourmet.' },
  { id: 'r13', type: 'Restaurante', category: 'De comida rápida', name: 'Dogger', neighborhood: 'Chapinero', tags: ['FastFood','HotDogs'], desc: 'Hot dogs creativos y snacks rápidos.' },

  // Parques
  { id: 'p1', type: 'Parque', category: 'Parques', name: 'Parque Simón Bolívar', location: 'Barrios Unidos', tags: ['Parque','Conciertos','Lagos'], desc: 'El parque urbano más grande, con lagos, ciclorruta y eventos.' },
  { id: 'p2', type: 'Parque', category: 'Parques', name: 'Parque de los Novios', location: 'Chapinero', tags: ['Parque','Deportes'], desc: 'Popular para actividades deportivas y picnic.' },
  { id: 'p3', type: 'Parque', category: 'Parques', name: 'Parque El Virrey', location: 'El Virrey', tags: ['Parque','Ciclismo'], desc: 'Corrido por la carrera 15; arbolado y con senderos.' },
  { id: 'p4', type: 'Parque', category: 'Parques', name: 'Parque Nacional Enrique Olaya Herrera', location: 'Sede Nacional', tags: ['Parque','Cultura'], desc: 'Parque tradicional con zonas verdes y canchas.' },
  { id: 'p5', type: 'Parque', category: 'Parques', name: 'Parque Metropolitano Timiza', location: 'Sur', tags: ['Parque','Deporte'], desc: 'Gran parque metropolitano con canchas y senderos.' },
  { id: 'p6', type: 'Parque', category: 'Parques', name: 'Parque Tercer Milenio', location: 'Centro', tags: ['Parque','Renovado'], desc: 'Parque urbano recuperado con espacios culturales.' },
  { id: 'p7', type: 'Parque', category: 'Parques', name: 'Parque Usaquén', location: 'Usaquén', tags: ['Parque','Eventos'], desc: 'Plaza y parque central con mercados artesanales.' },

  // Parques de Diversiones
  { id: 'd1', type: 'Parque de Diversiones', category: 'Diversiones', name: 'Mundo Aventura', location: 'Salitre', tags: ['MontañasRusas','Niños'], desc: 'Parque con atracciones para todas las edades.' },
  { id: 'd2', type: 'Parque de Diversiones', category: 'Diversiones', name: 'Salitre Mágico', location: 'Salitre', tags: ['Atracciones','Shows'], desc: 'Atracciones mecánicas y entretenimiento en familia.' },
  { id: 'd3', type: 'Parque de Diversiones', category: 'Diversiones', name: 'Parque Jaime Duque', location: 'Tocancipá', tags: ['Familia','Excursión'], desc: 'Parque temático cerca de Bogotá con museos y atracciones.' },

  // Otros
  { id: 'o1', type: 'Otro', category: 'Museos', name: 'Museo del Oro', location: 'La Candelaria', tags: ['Museo','Historia'], desc: 'Colección de orfebrería prehispánica.' },
  { id: 'o2', type: 'Otro', category: 'Museos', name: 'Museo Nacional de Colombia', location: 'Centro', tags: ['Museo','Cultura'], desc: 'Exposiciones permanentes y temporales de historia y arte.' },
  { id: 'o3', type: 'Otro', category: 'Miradores', name: 'Cerro de Monserrate', location: 'Monserrate', tags: ['Mirador','Religioso'], desc: 'Mirador con vista panorámica de Bogotá; santuario religioso.' },
  { id: 'o4', type: 'Otro', category: 'Plazas', name: 'Plaza de Bolívar', location: 'Centro', tags: ['Plaza','Historia'], desc: 'Plaza principal, rodeada de edificios históricos.' },
];
