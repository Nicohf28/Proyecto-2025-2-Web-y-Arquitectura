# 🌍 BogToWorld

BogToWorld es una aplicación web desarrollada con **React + Vite**, que implementa una arquitectura basada en **microservicios**, utilizando **Docker** y **Kubernetes** para el despliegue y la orquestación de contenedores.

---

## 📖 Documentación  
Toda la documentación completa del proyecto está disponible aquí:  
👉 [BogToWorld - Documentación](https://drive.google.com/file/d/1dyczrQSqCPjpERR31kzEVlFmh0JNrr4S/view?usp=sharing)

---

## 🛠️ Arquitectura del Proyecto  

El sistema está compuesto por los siguientes microservicios:

- **Frontend (React + Vite)**  
  Interfaz principal de la aplicación web, que consume los servicios expuestos por los microservicios para mostrar un catálogo interactivo y las reseñas.

- **`catalog-service`**  
  Servicio que expone un **JSON con la información de los lugares (places)**. Esta información es consumida por el frontend para generar dinámicamente los componentes del catálogo.

- **`reviews-service`**  
  Servicio que expone un **JSON con las reseñas realizadas por los usuarios**, permitiendo que el frontend las traiga y las muestre en la aplicación.

---

## 🧩 Patrones de Diseño Implementados  

- **Factory Pattern**  
  - Ubicado en la carpeta `src/factories`.  
  - Contiene `placeFactory`, que se encarga de **crear componentes dinámicos** para cada lugar usando la información proveniente de `catalog-service`.

- **Decorator Pattern**
  - Ubicado en la carpeta `src/decorators`.  
  - Utilizado para **extender y decorar componentes HTML**, agregando funcionalidades sin modificar directamente su estructura base.

---

## 🐳 Contenerización y Orquestación  

- **Docker**  
  - Se crearon imágenes y contenedores independientes para:
    - El **frontend** (React + Vite).  
    - `catalog-service`.  
    - `reviews-service`.

- **Kubernetes**  
  - En la carpeta `/k8s` se encuentran los archivos `.yaml` necesarios para:  
    - Desplegar los microservicios.  
    - Conectar los contenedores.  
    - Levantar todos los servicios a la vez en **Docker Desktop con Kubernetes**.

---

## 🚀 Ejecución del Proyecto  

### 1. Clonar el repositorio
git clone https://github.com/Nicohf28/Proyecto-2025-2-Web-y-Arquitectura.git
cd Proyecto-2025-2-Web-y-Arquitectura

### 2. Levantar con Docker
docker run -d --name frontend -p 5173:80 frontend-prod:1.0

docker run -d --name catalog -p 4001:4001 catalog-service:1.0

docker run -d --name reviews -p 4002:4002 reviews-service:1.0

# 3. Levantar con Kubernetes
kubectl apply -f k8s/

kubectl get pods

kubectl get svc

## 📂 Estructura del Repositorio  

El proyecto se organiza en las siguientes carpetas y archivos principales:

- **k8s/**  
  Contiene los manifiestos de Kubernetes:  
  - `catalog-deployment.yaml` → Deployment para el servicio de catálogo  
  - `frontend-deployment.yaml` → Deployment para el frontend  
  - `reviews-deployment.yaml` → Deployment para el servicio de reseñas  

- **server/**  
  Microservicios del backend:  
  - `catalog-service/` → Servicio de catálogo (incluye su `Dockerfile`)  
  - `reviews-service/` → Servicio de reseñas (incluye su `Dockerfile`)  

- **src/**  
  Código fuente del frontend (React + Vite):  
  - Archivos principales: `App.css`, `App.jsx`, `index.css`, `main.jsx`  
  - **api/** → Cliente para consumo de APIs (`client.js`)  
  - **assets/** → Recursos estáticos (`react.svg`)  
  - **components/** → Componentes reutilizables (`PlaceCard.jsx`)  
  - **decorators/** → Decoradores para componentes (`withBadge.jsx`)  
  - **factories/** → Factories para creación de elementos (`placeFactory.js`)  

- **Dockerfile** → Dockerfile del frontend  
- **README.md** → Documentación principal del proyecto  

## 👥 Autores
Dana Valeria Urquijo Ospitia 

Daniel Esteban Mora Rodríguez 

Juan David Castro 

Karen Sofía Rueda Piñeros 

Mayra Alejandra Salamanca Chaves 

Nicolás Hernández Flórez 

Osmar Santiago Aguirre Durán 

Thomas Alejandro Jutinico Jaramillo 

## Apoyado por:
Universidad Libre – Sede Bosque 

ING22037: Arquitectura de la Información 

Ing. Linda Caicedo 

Agosto, 2025 
