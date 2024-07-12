
# Deal App Task

## Overview

This is a backend application for managing deals, built with Node.js and Express. It utilizes several packages to handle authentication, data validation, and more.

## Packages Used

- `express`
- `mongoose`
- `jsonwebtoken`
- `bcryptjs`
- `joi`
- `mocha`
- `chai`
- `supertest`
- `node-cron`
- `swagger-ui-express`

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd dealapp-task
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. If you have `nodemon` installed globally, run:
    ```bash
    nodemon
    ```

2. If you don't have `nodemon`, run:
    ```bash
    node index.js
    ```

### Running Tests

To run the tests, use the following command:
```bash
npm run test
```

## Documentation

### Swagger

You can access the API documentation via Swagger at:
[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

### Postman

You can also view the API documentation in Postman:
[Postman Documentation](https://documenter.getpostman.com/view/33377259/2sA3e5doHT)

## Database

A `DB Backup` folder is included with the collections. Additionally, the Postman collection files are provided to test the endpoints locally.

