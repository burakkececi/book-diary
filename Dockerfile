FROM node:20.11.0

# Creating app directory
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy all data in app
COPY . .

EXPOSE 3000
CMD ["node", "src/index.js"] 
