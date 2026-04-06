# Use a stable Node.js version
FROM node:18

# Create a working directory inside the container
WORKDIR /usr/src/app

# Copy package.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code into the container
COPY . .

# The container will run on port 80
EXPOSE 80

# Command to run the application
CMD ["node", "server1.js"]
