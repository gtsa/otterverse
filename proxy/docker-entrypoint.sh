#!/usr/bin/env sh
set -e

# Substitute env vars in the template to produce the actual Nginx config
envsubst '${REACT_APP_DOMAIN}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Now run Nginx in the foreground (the default CMD)
exec "$@"
