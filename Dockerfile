# Dockerfile

# Use Node.js official image
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port
EXPOSE 4003

# Start the app
CMD npm run start-watch