# Base image
FROM node:16-alpine
# Setting work directory
WORKDIR /usr/src/app
# Copy package.json and package-lock.json (if available)
COPY package*.json ./
# Install Loglask dependencies
RUN npm install
# Copy source files
COPY . .
# Add environments
ENV POSTGRES_DB=${POSTGRES_DB}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
# Building app
RUN npm run build
# Expose port 8080
EXPOSE 8080
# Start the server
CMD [ "npm", "run", "dev" ]