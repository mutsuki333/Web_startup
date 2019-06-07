# Web_startup
A repo for starting up a new website
- [Web_startup](#webstartup)

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

Then you need to make a **secrets.json** file for database connection etc.

```json
{
    "SECRET_KEY" : "secret",
    "DB_USER" : "name",
    "DB_NAME" : "test",
    "DB_PASSWORD" : "password",
}
```

Give null for default, to prevent parsing errors


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

### uwsgi <!-- omit in toc -->

```
[uwsgi]
project = dennyplay
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
        alias   /home/share/dennyplay/dist/;
    }

    location / {
        include         uwsgi_params;
        uwsgi_pass      unix:/home/share/dennyplay/dennyplay.sock;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_redirect off;
    }

}
```
