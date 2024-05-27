# Fastify Starter

This is an opinionated minimal template starter for building backends applications using Fastify, TypeScript, Kysely, and PostgreSQL.

## Prerequisites

Before getting started, make sure you have the following installed:

- Node.js (version 22 or higher)
- Docker

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/fastify-starter.git
   ```

2. Install the dependencies:

   ```bash
   cd fastify-starter
   npm install
   ```

3. Start postgres

   ```bash
   docker-compose up -d
   ```

4. Run migration to setup User table

   ```bash
    npm run migration:run
   ```

5. Configure the PostgreSQL database connection:

   Open the `.env` file and update the following variables with your PostgreSQL database credentials:

   ```dotenv
   DB_HOST=your-database-host
   DB_PORT=your-database-port
   DB_NAME=your-database-name
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DATABASE_URL=your_database_connection_string
   ```

6. Start the application:

   ```bash
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
