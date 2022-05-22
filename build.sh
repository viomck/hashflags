#!/bin/sh
# Builds hashflags for production

cd frontend
npm run build
cd ..
docker build -t viomckinney/hashflags:latest .
docker push viomckinney/hashflags:latest
