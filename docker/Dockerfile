# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.4.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Next.js"
ENV NEXT_PRIVATE_STANDALONE true
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/.next/standalone /app
COPY --from=build /app/.next/static /app/.next/static
COPY --from=build /app/public /app/public

# Start the server
EXPOSE 3000
CMD [ "node", "server.js" ]
