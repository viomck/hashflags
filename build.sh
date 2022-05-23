#!/bin/sh
# Builds hashflags for production

cd frontend
npm run build
cd ..
docker buildx build \
    --tag viomckinney/hashflags:latest \
    -o type=image \
    --platform=linux/arm64,linux/amd64 \
    --push .