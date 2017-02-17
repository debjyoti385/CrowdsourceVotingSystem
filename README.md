# Crowdsource Voting System

It is a crowdsource voting system where research community can utilize this system to generate manual labelled dataset. This repo has been created by modifying code of wfh-ninja (http://wfh.ninja). is built as a generic single page app that displays one tweet at a time, with features to  classify them into predefined classes. User submitted tweets require approval by a registered admin via an admin panel.

Live Demo: http://db03.cs.utah.edu:8888/  

## Core features
- Post new tweets 
- Get all approved/ unapproved tweets
- Approve/ reject single tweet via admin panel
- Admin panel (/admin) for admin user registration, login, logout and approving/ rejecting of tweets.

## Architecture
Crowdsource Voting System is built with a Python-Flask backend, with a React/ JS/ Bootstrap frontend. JSX is precompiled to plain JavaScript via Babel. It uses a Postgresql database as the datastore. Application is ready for deployment to OpenShift server.

## Requirements
- Flask  
  ```pip install flask```  
- SimpleJson  
  ```pip install simplejson```  
- Flask-CORS  
  ```pip install flask-cors```  
- Flask-login  
  ```pip install flask-login```  
- Flask-sqlachemy  
  ```pip install flask-sqlalchemy```  
- Postgresql  
  ```brew install postgresql```  
  or  
  ```apt-get install postgresql postgresql-server-*```  
- Psycopg2 (requires postgres)  
  ```pip install psycopg2```  
- Babel  
  ```pip install babel-cli```  
  ```npm install babel-preset-es2015 babel-preset-react```  

"Requirements file" contains a list of items to be installed using `pip`  
  ```pip install -r requirements.txt```

## To run
1. Set up Database URL  
  ```
  export OPENSHIFT_POSTGRESQL_DB_URL=postgresql://USERNAME:PASSWORD@HOSTURL/DBNAME
  ```  
  Replace USERNAME, PASSWORD, HOSTURL, DBNAME with your credentials.  
2. Set up Database  
  ```
  python initdb.py
  ```  
3. Build app  
  ```
  babel --presets es2015,react --watch static/js/ --out-dir static/app/
  ```  
4. Run app  
  ```
  python main.py
  ```  

