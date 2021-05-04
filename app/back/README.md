## Backend for Human Resource

### Main structure (tech stack)
- typeorm => https://typeorm.io
- fastifyjs => https://www.fastify.io/
  - fastify-resty => https://github.com/FastifyResty/fastify-resty
- postgresql (node-postgres) => https://node-postgres.com/
- Docker (for postgresql db) => https://www.docker.com/

### Assumptions
This repository take these assumptions:
- You must be working on Mac (iOS)

- You must have Docker installed in your local machine

- You must be able to use Yarn workspaces feature: 
https://classic.yarnpkg.com/en/docs/workspaces/

- You must have yarn installed `v1.22`;

### Steps for work with backend
#### ----- IMPORTANT -----
> Please make sure that your postgresql local database is up and ready to receive instructions before working with it

- If the postgresql it's up and created correctly, run this to generate the data:  
dummy data of a record of 66 employees.
```bash
$ yarn generate
```

- Run this to work with the backend (using nodemon)
```bash
$ yarn dev
```

- `back` will start everything to be ready to run on port: http://localhost:9090

Basic route structure:
```
└── /
    ├── v1
    │   ├── /
    │   │   ├── data/
    │   │   │   ├── employees (GET)
    │   │   │   └── reviews (GET)
    │   │   └── utils/generate (GET)
    │   └── /utils/clear (DELETE)
    ├── employees (GET)
    │   employees (DELETE)
    │   employees (POST)
    │   employees (PATCH)
    │   employees (PUT)
    │   └── / (GET)
    │       / (DELETE)
    │       / (POST)
    │       / (PATCH)
    │       / (PUT)
    │       └── :id (GET)
    │           :id (DELETE)
    │           :id (PATCH)
    │           :id (PUT)
    ├── /
    └── * (OPTIONS)
```

## Important routes
- For clearing all data in DB:
```
http://127.0.0.1:9090/v1/utils/clear
```
- For generating random data (where numb it's the number of employees to generate)
```
http://127.0.0.1:9090/v1/utils/generate?numb=16
```