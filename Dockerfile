FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf