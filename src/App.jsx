// src/App.jsx
import React, { useEffect, useMemo, useState } from 'react';
import PlaceCard from "./components/PlaceCard";
import withBadge from "./decorators/withBadge.jsx";
import PlaceFactory from './factories/placeFactory';
import {
  Container, Row, Col, Navbar, Nav, Form, FormControl,
  Breadcrumb, Card, Button, Badge, Modal, Spinner, Alert
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchPlaces, fetchTypes, fetchCategories, fetchReviews } from './api/client';

const PlaceCardWithBadge = withBadge(PlaceCard, "Nuevo");

export default function App() {
  const examplePlace = { name: "Trattoria Italia", description: "Trattoria acogedora con menú tradicional y buenos vinos" };
  const examplePlace2 = { name: "Parque Metropolitano Timiza", description: "Gran parque metropolitano con canchas y senderos." };

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const [types, setTypes] = useState(['All']);
  const [categories, setCategories] = useState(['All']);

  const [data, setData] = useState([]);        // ← viene del catalog-service
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selected, setSelected] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(false);

  // Cargar tipos al inicio
  useEffect(() => {
    (async () => {
      try {
        const t = await fetchTypes();
        setTypes(['All', ...t]);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // Cargar categorías cuando cambia el tipo
  useEffect(() => {
    (async () => {
      try {
        const c = await fetchCategories(filterType !== 'All' ? filterType : undefined);
        setCategories(['All', ...c]);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [filterType]);

  // Cargar lugares cuando cambian filtros/búsqueda
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    fetchPlaces({ type: filterType, category: filterCategory, q: query })
      .then(({ items }) => {
        if (cancelled) return;
        // Enriquecemos cada item con PlaceFactory
        const enriched = items.map(d => PlaceFactory.create(d));
        setData(enriched);
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message || 'Error al cargar datos');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [query, filterType, filterCategory]);

  // Cargar reseñas al abrir modal
  useEffect(() => {
    if (!selected) {
      setReviews(null);
      return;
    }
    let cancelled = false;
    setLoadingReviews(true);

    fetchReviews(selected.id)
      .then((r) => { if (!cancelled) setReviews(r); })
      .catch(() => { if (!cancelled) setReviews(null); })
      .finally(() => { if (!cancelled) setLoadingReviews(false); });

    return () => { cancelled = true; };
  }, [selected]);

  // Resumen contadores (derivado del resultado actual)
  const resultsCount = data.length;

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand href="#">Bogotá Places</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={() => { setFilterType('All'); setFilterCategory('All'); setQuery(''); }}>Inicio</Nav.Link>
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
          <Breadcrumb.Item href="#" onClick={() => { setFilterType('All'); setFilterCategory('All'); setQuery(''); }}>Inicio</Breadcrumb.Item>
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
              <p className="small text-muted">Resultados: <strong>{resultsCount}</strong></p>
            </div>

            {/* Ejemplos con HOC */}
            <div className="mt-4">
              <PlaceCard place={examplePlace} />
              <br />
              <PlaceCardWithBadge place={examplePlace2} />
            </div>
          </Col>

          <Col md={9}>
            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
            {loading ? (
              <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" role="status" />
              </div>
            ) : (
              <Row>
                {data.length === 0 ? (
                  <Col>
                    <p>No se encontraron resultados. Intenta borrar filtros o buscar otra cosa.</p>
                  </Col>
                ) : data.map(item => (
                  <Col key={item.id} xs={12} sm={6} lg={4} className="mb-3">
                    <Card className="h-100">
                      <Card.Body className="d-flex flex-column">
                        <div>
                          <Card.Title>{item.getIcon()} {item.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {item.category} • {item.neighborhood || item.location}
                          </Card.Subtitle>
                        </div>

                        <Card.Text style={{ flex: 1 }}>{item.desc}</Card.Text>

                        <div className="mb-2">
                          {(item.tags || []).map(t => (
                            <Badge bg={item.getColor(t)} text="dark" className="me-1" key={t}>{t}</Badge>
                          ))}
                        </div>

                        <div className="mt-auto text-end">
                          <Button variant="primary" size="sm" onClick={() => setSelected(item)}>Ver detalles</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal de detalle con reseñas */}
      <Modal show={!!selected} onHide={() => setSelected(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{selected?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Categoría:</strong> {selected?.category}</p>
          <p><strong>Ubicación:</strong> {selected?.neighborhood || selected?.location}</p>
          <p>{selected?.desc}</p>
          <div className="mb-2">
            {(selected?.tags || []).map(t => (
              <Badge bg={selected?.getColor?.(t) || 'secondary'} className="me-1" key={t}>{t}</Badge>
            ))}
          </div>

          <hr />
          <h6 className="mb-2">Reseñas</h6>
          {loadingReviews ? (
            <Spinner animation="border" size="sm" />
          ) : reviews?.avg ? (
            <>
              <p className="mb-1"><strong>Rating:</strong> {reviews.avg.toFixed(1)} ⭐ ({reviews.count})</p>
              <ul className="mb-0">
                {reviews.comments.slice(0,3).map((c, idx) => (
                  <li key={idx}><strong>{c.user}:</strong> {c.text}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-muted">Aún no hay reseñas para este lugar.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
