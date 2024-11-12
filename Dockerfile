FROM nginx:latest

# Copy built static files to Nginx's html directory
ADD .output/public /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]