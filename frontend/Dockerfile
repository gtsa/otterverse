FROM node:18.8.0-bullseye

# Create app directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["yarn", "start"]
