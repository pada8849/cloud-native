#!/bin/bash

# set database connection details
HOST="jsh-mysql"
PORT="3306"
USER="root"
PASSWORD="password"
DATABASE="jsh"

# execute SQL file
mysql -h $HOST -P $PORT -u $USER -p$PASSWORD $DATABASE < jsh.sql
