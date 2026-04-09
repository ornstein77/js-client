upstream client-upstream {
    server 0.0.0.0:3000;
    keepalive 15;
}

upstream server-upstream {
    server 0.0.0.0:5000;
    keepalive 15;
}

server {
    listen 80;
    server_name testdev-1.ru www.testdev-1.ru docs.testdev-1.ru;

    location / {
        proxy_pass http://client-upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://server-upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;  
    }

    location /images/ {
        proxy_pass http://yandex-cloud.ru/pub/;
        proxy_set_header Host yandex-cloud.ru;
        proxy_hide_header X-Frame-Options;
        proxy_hide_header X-Content-Type-Options;
        proxy_hide_header Content-Security-Options;
    }
}