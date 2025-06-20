# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose the port your app runs on (default 3000)
EXPOSE 3000

# Define environment variables with defaults (can be overridden at runtime)
ENV CONTAINER_LABEL="Unnamed Container"
ENV CONTAINER_COLOUR="deeppink"

# Command to run the application
CMD ["node", "server.js"]