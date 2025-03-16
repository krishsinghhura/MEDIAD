# Use Node.js as base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy the rest of the project
COPY . .

# Build Next.js for production
RUN npm run build

# Expose Next.js default port
EXPOSE 3000

# Run the optimized production build
CMD ["npm", "run", "start"]
