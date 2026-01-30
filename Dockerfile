# ---------- Build stage ----------
FROM node:lts AS builder

WORKDIR /app

# Install deps first (better caching)
COPY package*.json ./
RUN npm ii

# Copy source and build
COPY . .
RUN npm run build


# ---------- Runtime stage ----------
FROM node:lts

WORKDIR /app

# Only copy what we need to run
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Optional: if you rely on runtime config files
# COPY --from=builder /app/config ./config

EXPOSE 3000

CMD ["node", "dist/main.js"]
