FROM caddy
WORKDIR /hashflags
COPY config/caddy/prod.Caddyfile Caddyfile
COPY frontend/build /build
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
