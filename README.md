# CRM-Tool
This project is a CRM API built with Express.js, integrated with MySql for database management, and containerized using Docker. It supports full CRUD operations for leads management, includes unit tests for key functionalities, and is documented with Swagger for seamless API exploration

Features
- CRUD Operations: Create, Read, Update Leads.
- MySql Database: database integration.
- Documentation: Interactive API documentation.
- Unit Testing: Ensures reliability of core functionalities.
- Docker Support: Easily deployable with Docker.

Technologies Used
- Node.js & Express.js: Backend framework.
- MySql: Database engine.
- Docker: Containerization.
- Swagger: API documentation.
- Jest: Unit testing framework.

**Installation**

Prerequisites
- Node
- Docker
- MySql

**Start Application with Docker**
```
./build.sh
```

**Start Application without Docker**
```
npm install
npm run start
```

  The application will run on http://localhost:4003

**Run Tests**

`npm run test`


**API Documentation**

Swagger documentation is available at: `http://localhost:4003/api-docs`
<img width="1430" alt="CRM-ApiDocs" src="https://github.com/user-attachments/assets/b114b1ca-7c3c-4363-a5cb-027e3b60ae7d" />


