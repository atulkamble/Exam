FROM nginx:latest
COPY index.html styles.css script.js /usr/share/nginx/html/
EXPOSE 80
RUN echo "Starting Nginx server"
CMD ["nginx", "-g", "daemon off;"]