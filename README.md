# Document Tracking System (DTS)

The Document Tracking System (DTS) is a BACKEND application designed to manage files, groups, and users within an organization. It provides functionalities for creating, updating, searching, and deleting files, as well as managing groups and user accounts.

## MVP Status

This project is currently in its Minimum Viable Product (MVP) stage, focusing on delivering essential features and functionality to meet the initial requirements.

## Features

- **File Management**: Upload, search, update, and delete files. Track file status (checked in/out) and view booking history.
- **Group Management**: Create, join, search for, and interact with groups. Add/remove users from groups, delete groups, and manage group ownership.
- **User Management**: Create, login, and retrieve user accounts. Secure user authentication and authorization.

## Installation

1. **Clone the Repository**:

git clone https://github.com/falehalnayef/document_tracking_system.git


2. **Install Dependencies**:

cd dts

npm install


3. **Set Up Environment Variables**:

- Create a `.env` file in the root directory.
- Configure environment variables as needed. Example:
```
PORT=3000
DB_NAME=dts
DB_USER=postgres
DB_PASSWORD=1234
DB_DRIVER=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
JWT_SECRET_KEY=8ea895edcfaeb31b46607022b2e294989bb57c442c3ceb4d62084e6b721f685b34640b306a611f29acbdd62afdb698ad69634f54820b671d9282b1da7c5dfc05
```

## Usage

- **Start the Application**:

npm run tsc

npm run serve


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
