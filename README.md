
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
  PORT=3000

```
## Run Locally

Run using npm.

```bash
  npm run dev
```

The backend server should now be running on http://localhost:3000
