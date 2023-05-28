
# Use an official Node.js runtime as the base image
FROM node:16
# Set the working directory in the container
WORKDIR /hiremateapp
COPY ["package.json", "package-lock.json*", "./"]
# Copy package.json and package-lock.json to the working directory
#COPY package*.json ./
# Install the project dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Expose the port your application listens on (replace <port> with the actual port number)
EXPOSE 8800
# Specify the command to run your application
CMD ["yarn", "start"]
