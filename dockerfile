FROM nginx:stable-alpine3.19-slim
WORKDIR /usr/share/nginx/html
#RUN apt-get update
#RUN apt-get install -y vim
#RUN apt install -y nginx
#RUN apt-get install -y systemd
#RUN service nginx stop
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist /usr/share/nginx/html
#COPY /python /usr/share/nginx/html/python
#RUN pip3 install -r requirements.txt
#COPY entrypoint.sh /
#RUN service nginx start
#ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
#ENTRYPOINT python3 app.py && service nginx restart
