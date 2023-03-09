FROM ubuntu:latest

# set database connection details
ENV HOST=jsh-mysql
ENV PORT=3306
ENV USER=root
ENV PASSWORD=password
ENV DATABASE=jsh

# install MySQL client
RUN apt-get update && apt-get install -y mysql-client

# copy and run update script
COPY . /
RUN chmod +x /update_mysql.sh
CMD ["/update_mysql.sh"]
