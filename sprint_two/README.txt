Database
* Type: POSTGRES
* DB Name: carAppDB
* Username: my_user
* Password: root
* Host: localhost
    * Port: 5432

Install Instructions:
* 'brew install postgresql' (If don't already have)
* 'pg_ctl -D /usr/local/var/postgres start' (Start default server)
    * Server ran out of: '/usr/local/var/postgres'
* 'psql postgres' (Connect to server and access postgres DB)
    * 'psql -d postgres -U my_user' (Login w/ correct user) 

Help:
* '\c database_name' (Choose DB)
* '\dt' (Display tables in current schema)

Documenation:
https://blog.logrocket.com/getting-started-with-postgres-in-your-react-app/
