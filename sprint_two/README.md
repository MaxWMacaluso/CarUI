# Database Information:
* Type: POSTGRES
* DB Name: car_app_db
* Username: car_user
* Password: root
* Host: localhost
    * Port: 5432

# Install Instructions:
* If don't already have: 'brew install postgresql'
* Start default server: ‘pg_ctl -D /usr/local/var/postgres start'
    * Server ran out of: '/usr/local/var/postgres' 

# Helpful Information:
* Choose DB: ‘\c database_name'
* Display tables in current schema: ’\dt'
* Connect to server and access car_app_db DB as car_user: ‘psql -d car_app_db -U car_user'

# To run using node and express:
* Go ‘to path: sprint_two/car_ui_app/node-postgres'
	* Run ‘on port 3001: node index.js'
		* 'http://localhost:3001" 

# Documenation:
https://blog.logrocket.com/getting-started-with-postgres-in-your-react-app/