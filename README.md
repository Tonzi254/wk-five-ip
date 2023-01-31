Project Requirements

1. Install npm > 
2. Install nodeJS >
3. Install mongoDB >
4. Install Postman > sudo snap install postman
5. Install datagrid > **not necessary since we will use MongoDB Atlas
6. Initialize npm > $ npm init -y
7. Install express > $ npm install express
8. Install mongoose > $ npm install mongoose
9. Install dotEnv > $ npm install dotenv
10.Install nodemon > $ npm install -g nodemon 
                    > $ npm install --save-dev nodemon 

Creating and Running your application

1. Initialize your application > $ npm init -y

2. In the package.json file that is autoimatically created scroll to the scripts section and add a comma after the test script and below that line add below script to start your application 
"start": "node ."

3. Code your APP (models, routes and index files)
4. Connect your APP to the db using .env file
5. Run your application $ npm run start
6. Test the CRUD operations using Postman or CURL
