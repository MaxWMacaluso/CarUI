# Database Information:
* **NOTE: Credentials can change at any moment**
* Type: POSTGRES
* DB Name: dfmvc8d1pd6s9s
* Username: oibnpyyowvtdwk
* Password: 76da5a9a0eb67a94b779d4481a4eb524a0633baa7631a3567d5df1dbb8dc5088
* Host: ec2-52-87-22-151.compute-1.amazonaws.com
    * Port: 5432

# Helpful Information:
* List DB's: '\l'
* Choose DB: ‘\c database_name'
* Display tables in current schema: '\dt'
* **Connect to remote server and access DB:** 'heroku pg:psql postgresql-fluffy-77284 --app team-matrix-db'
* **If NPM start/install fails** 
	1. Rename 'node-modules' to 'tode-modules' and rename 'package-lock.json' to 'ackache-lock.json'
	2. Run 'npm install'
	3. Try 'npm start'

# To run using node and express:
* cd 'car_ui_app/back_end'
	* 'npm start'
		* 'http://localhost:3001" 

# Documenation:
* https://blog.logrocket.com/getting-started-with-postgres-in-your-react-app/
* https://stackabuse.com/adding-a-postgresql-database-to-a-node-js-app-on-heroku/
* https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/
* https://medium.com/javascript-in-plain-english/create-a-fullstack-banking-application-using-react-e8c96d74cd39