# Use the official Node.js 20 image
FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

# Install additional tools and configure git in one layer
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    curl \
    git \
    vim \
    wget \
    && apt-get autoremove -y && apt-get clean -y \
    && git config --global init.defaultBranch main \
    && git config --global core.autocrlf input

# Install global npm packages useful for Next.js development
RUN npm install -g \
    @next/codemod \
    npm-check-updates \
    vercel

# Set the default shell to bash for better compatibility
ENV SHELL=/bin/bash

# Create workspace directory
WORKDIR /workspaces/otaku.lt

# Copy package files for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Set user
USER node
