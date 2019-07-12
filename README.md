# Web_startup

A repo for website development quick startup.  
remove `.git/` and `git init` to start a new repo.  
This website development uses:   
**vue** **pug** **semantic_ui** **parcel** **django** **mysql**  
to develop.

The application structure is:

```shell
.
├── README.md
├── config.py
├── home
│   ├── __init__.py
│   ├── admin.py
│   ├── api
│   │   ├── __init__.py
│   │   ├── Other api modules
│   │   └── ...
│   ├── apps.py
│   ├── migrations
│   ├── models
│   │   ├── __init__.py
│   │   ├── other models.py
│   │   └── ...
│   ├── templates
│   │   └── index.html -> ../../dist/index.html
│   ├── tests.py
│   └── views.py
├── index.pug
├── manage.py
├── package.json
├── proj
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── requirements.txt
├── requirements_mysql.txt
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── components
│   ├── main.js
│   ├── modules
│   │   └── modules.js
│   ├── router.js
│   ├── store.js
│   ├── theme.sass
│   └── views
│       └── all views.vue
└── yarn.lock
```

## Install

```shell
yarn install
virtualenv ENV
source ENV/bin/activate
pip install -r requirements.txt
yarn run pug
```

if error presented on installing `mysqlclient`.

**mysql-client** may be needed.

### On mac  <!-- omit in toc -->

`brew install mysql-client`

And for compilers to find mysql-client you may need to set:

```shell
export LDFLAGS="-L/usr/local/opt/mysql-client/lib"
export CPPFLAGS="-I/usr/local/opt/mysql-client/include"
export LDFLAGS="-L/usr/local/opt/openssl/lib"
export CPPFLAGS="-I/usr/local/opt/openssl/include"
```

### On ubuntu <!-- omit in toc -->

`sudo apt-get install libmysqlclient-dev`

Then you need to make a **config.py** file for database connection etc.

```python
# sqlite
import os
DATABASE_CONFIG ={
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': os.path.join(os.path.dirname(os.path.abspath(__file__)), 'db.sqlite3'),
}

# for mysql
DATABASE_CONFIG = {
    'ENGINE': 'django.db.backends.mysql',
    'HOST': '',
    'NAME': 'test',
    'USER': 'root',
    'PASSWORD': '',
    'port': 3306
}

SECRET_KEY = 'secret'
```

Then,

```shell
// remember to create database "test"
python manage.py makemigrations
python manage.py migrate
```

## Configure for development

parcel hmr might not work if text editor has safe write mode.  
disable for vim using `:set backupcopy=yes`.

for url history mode to work under subdir, set vue router base to `/<SUBDID>`,  
django settings add `FORCE_SCRIPT_NAME = '<SUBDIR>/'`

## configure for deployment

### Setup static files

run `python manage.py collectstatic`, to copy all the static files to the **STATIC_ROOT** set in the settings.py.

### uwsgi <!-- omit in toc -->

```
[uwsgi]
project = project
base = /home/share

chdir = %(base)/%(project)
home = ENV/
wsgi = proj.wsgi
#logto = access.log


master = true
processes = 5

socket = %(project).sock
chmod-socket = 666
vacuum = true

uid = ubuntu
gid = ubuntu
```

### Nginx <!-- omit in toc -->

```nginx
server {

    listen   80;

    client_max_body_size 4G;

    # access_log /var/log/nginx/access.log;
    # error_log /var/log/nginx/error.log;

	location /dist/ {
        alias   /home/share/project/dist/;
    }

    location / {
        include         uwsgi_params;
        uwsgi_pass      unix:/home/share/project/project.sock;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_redirect off;
    }

}
```
