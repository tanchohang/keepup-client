# Base on offical Node.js Alpine image
FROM node:alpine

RUN addgroup --gid 1001 appuser \
    && adduser --uid 1001 --ingroup appuser --home /app --shell /bin/sh --disabled-password appuser

# Set working directory
WORKDIR /usr/app
RUN chown -R appuser:appuser /usr/app

COPY package.json yarn.lock  ./
RUN chown appuser:appuser package.json yarn.lock

USER appuser


# Install dependencies
RUN yarn

USER root

# Copy all files
COPY . .

RUN chown -R appuser:appuser .

# Build app
RUN yarn build \
    && chown -R appuser:appuser .



CMD [  "yarn", "dev" ]