# Project Setup and Run Instructions(Backend)

## Prerequisites

- **Node.js**: Ensure you have Node.js version **22.13** installed.
- **PostgreSQL**: You will need PostgreSQL for the database setup.

---

## Steps to Run the Project

0. **Environment**
   Rename the .env.example to .env

1. **Install Dependencies**  
   Open a terminal in the project root directory and install the required dependencies:

   ```bash
   npm install

   ```

2. **Config prisma**
   prisma:migrate
   Run the following commands in the terminal to generate prisma client, database migration and to run seeder.
   ```bash
   npm run prisma:generate
   
   ```
   
  ```bash
   npm run prisma:migrate
```
   ```bash
   npm run prisma:seed
```

4. **RUN the app**
   CD into project root and RUN **npm run dev** Command and that's it. project should be up and running.

# Project Setup and Run Instructions(Backend)

## Prerequisites

- **Node.js**: Ensure you have Node.js version **22.13** installed.

---

## Steps to Run the Project

0. **Install Dependencies**  
   Open a terminal in the project root directory and install the required dependencies:

   ```bash
   npm install

   ```

1. **RUN the app**
   CD into project root and RUN **npm run dev** Command and that's it. project should be up and running.

**HAPPY TESTING**
