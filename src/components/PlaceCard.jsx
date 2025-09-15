import React from "react";
import { Card } from "react-bootstrap";

const PlaceCard = ({ place }) => {
  return (
    <Card className="h-100 shadow-sm border-0 rounded-4 bg-light">
      <Card.Body>
        <Card.Title className="fs-5 fw-bold text-dark">{place.name}</Card.Title>
        <Card.Text className="text-muted">{place.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PlaceCard;