# Document Tracking System (DTS)

The Document Tracking System (DTS) is a backend application designed to manage files, groups, and users within an organization. It provides functionalities for creating, updating, searching, and deleting files, as well as managing groups and user accounts.

## MVP Status

This project is currently in its Minimum Viable Product (MVP) stage, focusing on delivering essential features and functionality to meet the initial requirements.

## Features

- **File Management**: Upload, search, update, and delete files. Track file status (checked in/out) and view booking history.
- **Group Management**: Create, join, search for, and interact with groups. Add/remove users from groups, delete groups, and manage group ownership.
- **User Management**: Create, login, and retrieve user accounts. Secure user authentication and authorization.

## Installation

1. **Clone the Repository**:

git clone https://github.com/your/repository.git

markdown


2. **Install Dependencies**:

cd dts
npm install

markdown


3. **Set Up Environment Variables**:

- Create a `.env` file in the root directory.
- Configure environment variables as needed. Example:

  ```
  PORT=3000
  DB_HOST=localhost
  DB_USER=myuser
  DB_PASSWORD=mypassword
  DB_NAME=mydatabase
  ```

## Usage

- **Start the Application**:

npm i

npm start

markdown


- The application will be running at `http://localhost:3000` by default.

## Scripts

- `npm run tsc`: Run TypeScript compiler in watch mode.
- `npm start`: Start the application using concurrently to watch for changes in TypeScript files and nodemon to restart the server.
- `npm run serve`: Start the application in watch mode using node, watching for changes in the compiled JavaScript files.

## Dependencies

- Express.js
- Sequelize (ORM for PostgreSQL)
- bcrypt (Password hashing)
- cors (Cross-Origin Resource Sharing)
- jsonwebtoken (JWT authentication)
- morgan (HTTP request logging)
- node-schedule (Task scheduling)
- pg (PostgreSQL client)
- dotenv (Environment variables)

## Development Dependencies

- TypeScript
- concurrently
- nodemon
- sequelize-cli
- Various TypeScript type definitions (`@types/...`)

## License

This project is licensed under the ISC License.