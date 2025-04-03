FROM nginx:alpine

# 1) Install envsubst (part of gettext)
RUN apk add --no-cache gettext

# 2) Copy your template Nginx config into the container:
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY nginx.conf.local.template /etc/nginx/nginx.conf.local.template

# 3) Copy a small entrypoint script that does envsubst
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# 4) Use this script as the container’s entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]

# 5) The default CMD just runs nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
