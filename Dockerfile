# Use a lightweight image for Node.js applications
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your project code
COPY . .

# Build the project
RUN npm run build

# Load environment variables from .env file
# RUN source .env


# Expose the port
EXPOSE 3000

# Entrypoint script allows passing arguments to npm start
ENTRYPOINT [ "npm", "start" ]
