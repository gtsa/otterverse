#!/usr/bin/env sh
set -e

# Default to production if ENVIRONMENT is unset
ENVIRONMENT=${ENVIRONMENT:-production}

echo "🛠️ Detected environment: $ENVIRONMENT"

# Choose correct nginx.conf.template
if [ "$ENVIRONMENT" = "local" ]; then
echo "📄 Using nginx.conf.local.template"
envsubst '${REACT_APP_DOMAIN}' < /etc/nginx/nginx.conf.local.template > /etc/nginx/nginx.conf
else
echo "📄 Using nginx.conf.template"
envsubst '${REACT_APP_DOMAIN}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
fi

# Launch nginx
exec "$@"