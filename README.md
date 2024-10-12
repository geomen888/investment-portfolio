
# Demo Version of Investment-portfolio Dashboard: Administrative Dashboard for Contrary

The **Investment Dashboard** is an administrative tool designed to help to understand our portfolio (demo version). 
The dashboard presents users with three primary views:
- **Investments table :** Displayed in table format, showcasing our investments with option to ADD and UPDATE the Investment entity accourding the company.
- **Chart of investment :** Shows real investments.
- **Companies that got or pretend for investments:** Displayed in a table format, allowing users to review investment amounts, curent statuses and other information. 

There are froms builded in the both tables. Please be accurate in adding and updating data, there no instaled form validators. It could be added afterward.

The docker-compose.yaml has beckend, frontend services and besides testing and seed (add 80 items records) services.
  

## Getting Started

1. **Set Up the `.env` File**

   Create a `.env` file in the root directory of your project. This file will store your environment variables, which are essential for connecting to the PostgreSQL database.

   Here’s an example of the necessary environment variables:

   ```env
   DATABASE_HOST=db  # The name should match the Postgres service name in the docker-compose.yaml
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=password
   DATABASE_NAME=portfolio

2. **Build and Start the Application**

   To build and run the application using Docker, follow these steps:

   Open a terminal in the project directory.

   Execute the following command:

   docker-compose up --build

4. **Access the Demo Application**
   Once the application is running, you can access the demo React app by navigating to the following URL in your web browser:

    http://localhost:3001

   
   
   
