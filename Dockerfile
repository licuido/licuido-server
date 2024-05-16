# Define the base image
FROM node:18-alpine

# Create a working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the working directory
COPY . .

# Build the app
RUN npm run build

# Expose the port that the application listens on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
