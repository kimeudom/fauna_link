# Stage 1: Node.js for building the frontend
FROM node:18 AS frontend-builder

# Set working directory for the frontend
WORKDIR /app/frontend

# Copy the .env file
COPY frontend/.env .env

# Copy frontend package files and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the frontend source code and build it
COPY frontend ./
RUN npm run build

# Stage 2: Python for running the Flask server
FROM python:3.11.2-slim AS final

# Set working directory for the backend
WORKDIR /app

# Install Flask dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy all project files (excluding frontend source files)
COPY . .

# Copy the built frontend files from the first stage
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Expose port 5000 for Flask
EXPOSE 5000

# Command to run the Flask server
CMD ["python3", "server.py"]
