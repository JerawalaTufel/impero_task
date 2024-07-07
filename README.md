# impero_task

## Description
Overview:

Create a express.js application that serves as the backend for a impero_task. 
## Getting Started
These instructions will help you set up and run the project on your local machine.

### Prerequisites
- Node.js: Ensure that Node.js is installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/)

### Installing
1. Clone the repository to your local machine:
   ```bash
   git clone git@github.com:JerawalaTufel/impero_task.git
2. Navigate to the project directory:
    ```bash
    cd your-project
3. checkout in development branch 
    ```bash
    git checkout main
4. Install the project dependencies using npm:
    ```bash
    npm install
5. make .env file after that provide your database connection and add JWT_SECRET key after that run migration command.
    ```
    npx sequelize-cli db:migrate
6. To start the application, run the following command:
    ```bash
    npm start
7.  We have provide postman collection within the project. You can use it as reference for the API Request and Response.
Import it in your postman for api API examples.
    ``` 
    ''