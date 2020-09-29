Database
* Type: POSTGRES DB
* DB Name: carappdb
* Username: my_user
* Password: root
* Host: localhost
    * Port: 5432

Install Instructions:
* 'brew install postgresql' (If don't already have)
* 'pg_ctl -D /usr/local/var/postgres start' (Start default server)
    * Server ran out of: '/usr/local/var/postgres' 

Help:
* '\c database_name' (Choose DB)
* '\dt' (Display tables in current schema)
* 'psql -d carappdb -U my_user' (Connect to server and access carappdb DB as my_user)
    * 'psql -d postgres -U my_user' (Login w/ correct user)

To run using node and express:
* 'sprint_two/car_ui_app/node-postgres' (Go to path)
* 'node index.js' (To run application on port 3001)
* 'http://localhost:3001" 

Documenation:
https://blog.logrocket.com/getting-started-with-postgres-in-your-react-app/
