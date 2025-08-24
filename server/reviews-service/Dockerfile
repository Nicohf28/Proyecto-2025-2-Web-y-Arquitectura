# server/<service>/Dockerfile
FROM node:20-alpine
WORKDIR /app

# copiar e instalar dependencias
COPY package*.json ./
RUN npm ci --production

# copiar código
COPY . .

# exponer puerto (ajustar si tu app usa otro)
ENV PORT=4002
EXPOSE 4002

# si tu servidor escucha en process.env.PORT, este CMD funciona
CMD ["node", "index.js"]
