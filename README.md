# Node.js CRUD Application with PostgreSQL

This project is a simple CRUD (Create, Read, Update, Delete) application built using Node.js, Express.js, and PostgreSQL. It demonstrates how to interact with a PostgreSQL database using raw SQL queries and implements robust error handling using custom middleware.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **PostgreSQL:** Relational database management system.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:Kanchanbasnet/nodejsCrud.git
    cd nodejsCrud
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up PostgreSQL:**

    - Ensure you have PostgreSQL installed and running.
    - Create a database for the application.
    - Create a `.env` file in the root directory and add the following environment variables:

      ```
      DB_HOST=your_db_host
      DB_PORT=your_db_port
      DB_USER=your_db_user
      DB_PASSWORD=your_db_password
      DB_NAME=your_db_name
      PORT=3000 #or your desired port
      ```

    - Create the table that your api will be using. Example using psql:

      ```sql
      CREATE TABLE items (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      age INTEGER NOT NULL,
      address VARCHAR(100)
      );
      ```

4.  **Run the application:**

    ```bash
    npm start
    ```

    The application will be running at `http://localhost:<PORT>`.

## API Endpoints

### Items (Example)

- **GET /api/users:**

  - Retrieves a list of all users.

- **GET /api/users/:id:**

  - Retrieves a specific user by ID.

- **POST /api/users:**

  - Creates a new user.

- **PATCH /api/users/:id:**

  - Updates an existing user by ID.

- **DELETE api/users/:id:**
  - Deletes a user by ID.
