class Place {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.category = data.category;
    this.type = data.type;
    this.desc = data.desc;
    this.tags = data.tags || [];
    this.location = data.neighborhood || data.location || '';
  }

  getIcon() {
    return '📍'; // Icono genérico
  }

  getColor() {
    return 'secondary'; // Color genérico para Badge
  }
}

class Restaurante extends Place {
  getIcon() {
    return '🍽️';
  }

  getColor() {
    return 'danger';
  }
}

class Parque extends Place {
  getIcon() {
    return '🌳';
  }

  getColor() {
    return 'success';
  }
}

class Diversion extends Place {
  getIcon() {
    return '🎡';
  }

  getColor() {
    return 'warning';
  }
}

class Otro extends Place {
  getIcon() {
    return '❓';
  }

  getColor() {
    return 'info';
  }
}

export default class PlaceFactory {
  static create(data) {
    switch (data.type) {
      case 'Restaurante':
        return new Restaurante(data);
      case 'Parque':
        return new Parque(data);
      case 'Parque de Diversiones':
        return new Diversion(data);
      case 'Otro':
        return new Otro(data);
      default:
        return new Place(data);
    }
  }
}