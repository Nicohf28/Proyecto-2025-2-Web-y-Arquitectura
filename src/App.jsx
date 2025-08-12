// Bogota-Places - Starter React App
// ---------------------------------
// Qué incluye este archivo:
//  - Un componente React (export default App) que implementa:
//      • Barra de navegación responsive
//      • Migas de pan dinámicas
//      • Filtros (tipo / categoría / búsqueda / etiquetas)
//      • Grid responsive de tarjetas con lugares
//      • Modal de detalle para cada lugar
//  - Datos de ejemplo con la jerarquía que pediste
//
// Cómo usarlo (resumen):
// 1) Crea una app con Vite / React: `npm create vite@latest bogota-places -- --template react`
// 2) Entra a la carpeta: `cd bogota-places`
// 3) Instala dependencias: `npm install react-bootstrap bootstrap`
// 4) Reemplaza `src/App.jsx` por este archivo (o pega su contenido)
// 5) Asegúrate en `src/main.jsx` importar Bootstrap: `import 'bootstrap/dist/css/bootstrap.min.css'`
// 6) `npm run dev` y abre la URL que te muestre
//
// Nota: el código usa react-bootstrap para mantener el layout responsive y aprovechar Bootstrap.

import React, { useMemo, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  Breadcrumb,
  Card,
  Button,
  Badge,
  Modal,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Datos: lista aplanada con tipo y categoría (subcategoría)
const DATA = [
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

  // Otros lugares de interés
  { id: 'o1', type: 'Otro', category: 'Museos', name: 'Museo del Oro', location: 'La Candelaria', tags: ['Museo','Historia'], desc: 'Colección de orfebrería prehispánica.' },
  { id: 'o2', type: 'Otro', category: 'Museos', name: 'Museo Nacional de Colombia', location: 'Centro', tags: ['Museo','Cultura'], desc: 'Exposiciones permanentes y temporales de historia y arte.' },
  { id: 'o3', type: 'Otro', category: 'Miradores', name: 'Cerro de Monserrate', location: 'Monserrate', tags: ['Mirador','Religioso'], desc: 'Mirador con vista panorámica de Bogotá; santuario religioso.' },
  { id: 'o4', type: 'Otro', category: 'Plazas', name: 'Plaza de Bolívar', location: 'Centro', tags: ['Plaza','Historia'], desc: 'Plaza principal de la ciudad, rodeada de edificios históricos.' },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const types = useMemo(() => ['All', ...Array.from(new Set(DATA.map(d => d.type)))], []);

  const categories = useMemo(() => {
    if (filterType === 'All') return ['All', ...Array.from(new Set(DATA.map(d => d.category).filter(Boolean)))];
    return ['All', ...Array.from(new Set(DATA.filter(d => d.type === filterType).map(d => d.category).filter(Boolean)))];
  }, [filterType]);

  const filtered = useMemo(() => {
    return DATA.filter(d => {
      if (filterType !== 'All' && d.type !== filterType) return false;
      if (filterCategory !== 'All' && d.category !== filterCategory) return false;
      if (query) {
        const q = query.toLowerCase();
        const haystack = `${d.name} ${d.desc} ${d.tags.join(' ')} ${d.neighborhood || d.location || ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, filterType, filterCategory]);

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand href="#">Bogotá Places</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={() => { setFilterType('All'); setFilterCategory('All'); }}>Inicio</Nav.Link>
              <Nav.Link href="#" onClick={() => { setFilterType('Restaurante'); setFilterCategory('All'); }}>Restaurantes</Nav.Link>
              <Nav.Link href="#" onClick={() => { setFilterType('Parque'); setFilterCategory('All'); }}>Parques</Nav.Link>
              <Nav.Link href="#" onClick={() => { setFilterType('Parque de Diversiones'); setFilterCategory('All'); }}>Diversiones</Nav.Link>
              <Nav.Link href="#" onClick={() => { setFilterType('Otro'); setFilterCategory('All'); }}>Otros</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <FormControl
                type="search"
                placeholder="Buscar lugares, tags, barrios..."
                className="me-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar"
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="#" onClick={() => { setFilterType('All'); setFilterCategory('All'); }}>Inicio</Breadcrumb.Item>
          {filterType !== 'All' && <Breadcrumb.Item active>{filterType}</Breadcrumb.Item>}
          {filterCategory !== 'All' && <Breadcrumb.Item active>{filterCategory}</Breadcrumb.Item>}
        </Breadcrumb>

        <Row className="mb-3">
          <Col md={3} className="mb-3">
            <h5>Filtros</h5>
            <Form.Group className="mb-2">
              <Form.Label>Tipo</Form.Label>
              <Form.Select value={filterType} onChange={(e) => { setFilterType(e.target.value); setFilterCategory('All'); }}>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Categoría</Form.Label>
              <Form.Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </Form.Select>
            </Form.Group>

            <div className="mb-2">
              <h6>Etiquetas rápidas</h6>
              {['Oferta', 'Nuevo', 'Familiar', 'Pet-friendly'].map(tag => (
                <Badge key={tag} bg="secondary" pill style={{ cursor: 'pointer', marginRight: 6 }} onClick={() => setQuery(tag)}>{tag}</Badge>
              ))}
            </div>

            <div className="mt-3">
              <h6>Resumen</h6>
              <p className="small text-muted">Resultados: <strong>{filtered.length}</strong></p>
            </div>
          </Col>

          <Col md={9}>
            <Row>
              {filtered.length === 0 ? (
                <Col>
                  <p>No se encontraron resultados. Intenta borrar filtros o buscar otra cosa.</p>
                </Col>
              ) : filtered.map(item => (
                <Col key={item.id} xs={12} sm={6} lg={4} className="mb-3">
                  <Card className="h-100">
                    <Card.Body className="d-flex flex-column">
                      <div>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{item.category} • {item.neighborhood || item.location}</Card.Subtitle>
                      </div>

                      <Card.Text style={{ flex: 1 }}>{item.desc}</Card.Text>

                      <div className="mb-2">
                        {(item.tags || []).map(t => <Badge bg="info" text="dark" className="me-1" key={t}>{t}</Badge>)}
                      </div>

                      <div className="mt-auto text-end">
                        <Button variant="primary" size="sm" onClick={() => setSelected(item)}>Ver detalles</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal show={!!selected} onHide={() => setSelected(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{selected?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Categoría:</strong> {selected?.category}</p>
          <p><strong>Ubicación:</strong> {selected?.neighborhood || selected?.location}</p>
          <p>{selected?.desc}</p>
          <div>{(selected?.tags || []).map(t => <Badge bg="secondary" className="me-1" key={t}>{t}</Badge>)}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
