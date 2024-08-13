# Development stage
FROM docker-phil-sahi.pruregistry.intranet.asia:8443/node:18 AS development
# Create app directory
WORKDIR /usr/src/app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ../../package*.json ./
# Install app dependencies
RUN npm install
# Copy files
COPY . .
# Creates a "dist" folder with the production build
RUN npm run build first-project
EXPOSE 3000
# Start the server using the production build
CMD [ "npm", "run", "start:dev", "first-project" ]


# Production stage
FROM docker-phil-sahi.pruregistry.intranet.asia:8443/node AS production
WORKDIR /usr/src/app
COPY ../../package*.json ./
COPY --from=development /usr/src/app/dist/apps/first-project .
# Install app dependencies
RUN npm install --omit=dev --ignore-scripts
EXPOSE 3000
CMD ["node", "./main.js"]
