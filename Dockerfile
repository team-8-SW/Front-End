# Development Dockerfile for the frontend
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port that Vite runs on
EXPOSE 8000

# Command to run the development server
CMD ["npm", "run", "dev"]