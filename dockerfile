FROM unit:python3.12
WORKDIR /usr/share/nginx/html/python
RUN apt-get update
RUN apt-get install -y vim
RUN apt install -y nginx
RUN apt-get install -y systemd
RUN service nginx stop && sleep 2
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist /usr/share/nginx/html
#COPY /python /usr/share/nginx/html/python
RUN pip3 install -r requirements.txt
COPY entrypoint.sh /
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
#ENTRYPOINT python3 app.py && service nginx restart
