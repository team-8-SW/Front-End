# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files FIRST to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Install necessary tools
RUN apk add --no-cache curl

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the built files to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Enhanced security headers configuration
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    # Security headers \
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always; \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header Referrer-Policy "strict-origin-when-cross-origin" always; \
    add_header Content-Security-Policy "default-src http: localhost:* ws://localhost:*; script-src http: localhost:* \u0027unsafe-inline\u0027 \u0027unsafe-eval\u0027; style-src http: localhost:* \u0027unsafe-inline\u0027; img-src http: data: localhost:* \u0027unsafe-inline\u0027; font-src http: data: localhost:*;" always; \
    location / { \
        try_files $uri $uri/ /index.html; \
        add_header Cache-Control "no-cache"; \
    } \
    location /api { \
        proxy_pass http://backend:8000; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection \u0027upgrade\u0027; \
        proxy_set_header Host $host; \
        proxy_cache_bypass $http_upgrade; \
    } \
    # Error pages \
    error_page 404 /index.html; \
    error_page 500 502 503 504 /50x.html; \
}' > /etc/nginx/conf.d/default.conf

# Set permissions for nginx user
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid && \
    chmod 644 /etc/nginx/conf.d/default.conf

USER nginx

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 