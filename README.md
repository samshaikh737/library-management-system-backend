
# Project Setup


Prerequisites
Ensure you have the following installed:

- Node.js (v18.10.0)
- Npm (8.19.2)
- PostgreSQL
## Installations

Clone the repository:


```bash
  git clone https://github.com/samshaikh737/library-management-system-backend
```

Change the directory:

```bash
  cd library-management-system-backend
```

Install the dependencies:

```bash
  npm install
```


## Add Environment Variables 

Create a `config.env` file in the src/config/config.env directory and add the following environment variables:

```bash
  DB_HOST=127.0.0.1
  DB_PORT=5432
  DB_NAME=library_db
  DB_USER=
  DB_PASSWORD=
  PORT=5001

```


## Database Setup

### If PostgreSQL Already Installed Locally

If PostgreSQL is already installed on your local machine, follow these steps:

- Open your terminal and run the following command to log in to PostgreSQL:

``` bash
  psql -U postgres_user
```
You'll be prompted to enter the password (mysecretpassword) or your db password.

- Create the Database:

Once inside the PostgreSQL shell, create the database using:

```bash
  CREATE DATABASE library_db;
```

### Or Setup PostgreSQL with Docker

If you prefer to run PostgreSQL using Docker, follow these steps:

``` bash
  docker pull postgres
```
Run the PostgreSQL Container:

- Create the Database:

Use the following command to create and run a PostgreSQL container with the specified credentials:

```bash
  docker run --name my_postgres_db -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_USER=my_postgres_db -e POSTGRES_DB=library_db -p 5432:5432 -d postgres
```

#### This command does the following:

- Creates and names the container my_postgres_db.
- Sets the PostgreSQL user to my_postgres_db and the password to mysecretpassword.
- Automatically creates a database named library_db.
- Exposes PostgreSQL on port 5432.

#### Access the PostgreSQL Shell Inside the Container (if needed):

If you need to perform additional operations, access the PostgreSQL shell:

``` bash
  docker exec -it my_postgres_db psql -U my_postgres_db -d library_db
```

## Database Migrations

- Run the following command to execute the migrations:


``` bash
  npm run migration
```

#### Importing Data:
- After running the migrations, you can import data into the database. To do so, execute the following command:

``` bash
  npm run import
```



## Run Locally

Run using npm.

```bash
  npm run dev
```

The backend server should now be running on http://localhost:5001


## Deploy

Project Docs
 - [Project Docs](https://drive.google.com/file/d/18eQzJrNie9jut-J7zLh_KlNujuoHOP91/view?usp=drive_link)

API Documention

 - [View Documention](https://documenter.getpostman.com/view/29024313/2sA3s6GA5Z#intro)


#### Demo Video

 - [View Video](https://www.youtube.com/watch?v=5jzyFNtQpyo)
