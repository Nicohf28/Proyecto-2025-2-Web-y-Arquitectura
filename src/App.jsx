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

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

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
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm w-100 mb-2 ">
      <Container fluid className="px-1">
        <Navbar.Brand href="#">
          <i className="bi bi-geo-alt-fill me-2" style={{ marginLeft: '30px' }}></i>Bogotá Places
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            {['All', 'Restaurante', 'Parque', 'Parque de Diversiones', 'Otro'].map((label, i) => (
              <Nav.Link
                key={i}
                href="#"
                onClick={() => {
                  setFilterType(label === 'Inicio' ? 'All' : label);
                  setFilterCategory('All');
                  setQuery('');
                  setCurrentPage(1);
                }}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
          <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <FormControl
              type="search"
              placeholder="Buscar lugares, tags, barrios..."
              className="me-2"
              style={{ width: '350px' }}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Container fluid className="px-3">
      <Breadcrumb style={{ marginLeft: '10px' }}>
        <Breadcrumb.Item href="#" onClick={() => {
          setFilterType('All');
          setFilterCategory('All');
          setQuery('');
          setCurrentPage(1);
        }}>Inicio</Breadcrumb.Item>
        {filterType !== 'All' && <Breadcrumb.Item active>{filterType}</Breadcrumb.Item>}
        {filterCategory !== 'All' && <Breadcrumb.Item active>{filterCategory}</Breadcrumb.Item>}
      </Breadcrumb>

      <Row className="mb-3">
        <Col md={3}>
          <div
            className="bg-light rounded-4 p-3 shadow-sm border-0"
            style={{ height: '90%' }}
          >
            <h5 className="mb-4 text-dark">
              <i className="bi bi-sliders me-2"></i>Filtros
            </h5>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-secondary">
                <i className="bi bi-filter-circle me-2"></i>Tipo
              </Form.Label>
              <Form.Select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setFilterCategory('All');
                  setCurrentPage(1);
                }}
              >
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-secondary">
                <i className="bi bi-tags me-2"></i>Categoría
              </Form.Label>
              <Form.Select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </Form.Select>
            </Form.Group>

            <div className="mb-4">
              <h6 className="fw-semibold text-secondary mb-2">
                <i className="bi bi-lightning-fill me-2"></i>Etiquetas rápidas
              </h6>
              {['Oferta', 'Nuevo', 'Familiar', 'Pet-friendly'].map(tag => (
                <Badge
                  key={tag}
                  bg="info"
                  pill
                  className="me-2 mb-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setQuery(tag);
                    setCurrentPage(1);
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <hr />

            <div className="mt-3 text-muted">
              <i className="bi bi-bar-chart-fill me-2"></i>
              Resultados encontrados: <strong>{resultsCount}</strong>
            </div>
            <div className="mt-5">
              <h6 className="fw-semibold text-secondary mb-4">Ejemplos destacados</h6>
              <PlaceCard place={examplePlace} />
              <div className="mt-3">
                <PlaceCardWithBadge place={examplePlace2} />
              </div>
            </div>
          </div>
        </Col>

        <Col md={9}>
          <div className="d-flex flex-column justify-content-between" style={{ height: '100%' }}>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
              <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" role="status" />
              </div>
            ) : (
              <>
                <Row>
                  {paginatedData.length === 0 ? (
                    <Col>
                      <p>No se encontraron resultados. Intenta borrar filtros o buscar otra cosa.</p>
                    </Col>
                  ) : paginatedData.map(item => (
                    <Col key={item.id} xs={12} sm={6} lg={4} className="mb-4">
                      <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-scale">
                        {item.imageUrl && (
                          <Card.Img
                            variant="top"
                            src={item.imageUrl}
                            alt={item.name}
                            style={{ height: '180px', objectFit: 'cover' }}
                          />
                        )}
                        <Card.Body className="d-flex flex-column bg-light">
                          <Card.Title className="fs-5 fw-bold text-dark">
                            {item.getIcon()} {item.name}
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {item.category} • {item.neighborhood || item.location}
                          </Card.Subtitle>
                          <Card.Text className="text-secondary" style={{ flex: 1 }}>
                            {item.desc}
                          </Card.Text>
                          <div className="mb-2">
                            {(item.tags || []).map(t => (
                              <Badge bg={item.getColor(t)} className="me-1" key={t}>{t}</Badge>
                            ))}
                          </div>
                          {item.reviews?.avg && (
                            <div className="mb-2 text-warning">
                              ⭐ {item.reviews.avg.toFixed(1)} ({item.reviews.count})
                            </div>
                          )}
                          <div className="mt-auto text-end">
                            <Button variant="outline-primary" size="sm" onClick={() => setSelected(item)}>
                              Ver detalles
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <div className="d-flex justify-content-center mt-1" style={{ marginBottom: '20px' }}>
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? 'primary' : 'outline-secondary'}
                      className="me-2"
                      size="sm"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>

    <Modal show={!!selected} onHide={() => setSelected(null)} centered>
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
        <h6>Reseñas</h6>
        {loadingReviews ? (
          <Spinner animation="border" size="sm" />
        ) : reviews?.avg ? (
          <>
            <p><strong>Rating:</strong> {reviews.avg.toFixed(1)} ⭐ ({reviews.count})</p>
            <ul>
              {reviews.comments.slice(0, 3).map((c, idx) => (
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

};