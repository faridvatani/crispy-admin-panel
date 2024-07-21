# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Create the production image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install pnpm in the production image
RUN npm install -g pnpm

# Copy the build output and necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment variable
ENV NODE_ENV=production
ENV NEON_DATABASE_URL=${NEON_DATABASE_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start"]
