# Use Node.js base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all your project files
COPY . .

# The port your app runs on
EXPOSE 3000

# Command to start your app
CMD ["node", "server.js"]