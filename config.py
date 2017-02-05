#!/usr/bin/env python

import os

SESSION_TYPE = 'memcached'
SECRET_KEY = os.environ.get('SECRET_KEY', 'election2016')
#HOST_NAME = os.environ.get('OPENSHIFT_APP_DNS', 'db03.cs.utah.edu')
HOST_NAME = 'db03.cs.utah.edu'
APP_NAME = os.environ.get('OPENSHIFT_APP_NAME', 'flask')
#IP = os.environ.get('OPENSHIFT_PYTHON_IP', '127.0.0.1')
IP = "127.0.0.1"
#PORT = int(os.environ.get('OPENSHIFT_PYTHON_PORT', 8080))
PORT = 8888 
SQLALCHEMY_DATABASE_URI = os.environ['OPENSHIFT_POSTGRESQL_DB_URL']
SQLALCHEMY_ECHO = False
DEBUG = False
PROPAGATE_EXCEPTIONS = True
