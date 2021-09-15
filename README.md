# Capstone: Restaurant Reservation System Backend

> Link to frontend repo: https://github.com/keithfrazier98/periodic-tables-frontend

## **Summary**

Express backend with routes to handle API calls and send/request data to and from Heroku-PostgresSQL database using knex queries.

## **Stack**

- Express JS
- Knex
- Javascript
- Heroku-PostgresSQL

## **API Overview**

> Front-end uses the api.js file to send requests to the server side routes

> back-end routes are used to manage the data of the reservations and tables, updating them as neccesary

### **reservations**

reservations.controller middleware uses reservations.service file, which uses knex queries to make queries to the database

**middleware breakdown:**

- **list : list reservations**

  - calls service.search if mobile number query parameter is present
  - calls service.list otherwise

- **read : read single reservation**

  - calls service.read with provided path parameter

- **reservationExists : verify reservations exists**

  - calls service.read with provided path parameter and either sets a local response variable or calls an error with a message

- **properStatus : verify proper status for changeStatus function**

  - _makes no queries to database_
  - checks request body for the proper value of the "status" key

- **changeStatus : changes the status of a reservation**

  - calls service.changeStatus with status and reservation_id as parameters to change the status of a reservation

- **create : creates a new reservation**

  - calls service.create with validated request body to add a reservation to the database

- **validateReservation: validates request body data for a post to reservations**

  - _makes no queries to database_
  - goes through a series of checks for each property in the request body data to validate a reservation before its added to the database

- **editReservation:**

  - calls service.editReservation to update a reservation with edited information

- **isPeopleNumber:**
  - _makes no queries to database_
  - checks the "people" attribute of request body date and checks whether it is a valid number

## **tables**

tables.controller middleware uses tables.service file, which uses knex queries to make queries to the database

**middleware breakdown**

- **validateTable**

  - _makes no queries to database_
  - checks whether request body data attributes are valid or not

- **create**

  - calls service.create with table data to create a new table in the database

- **seatReservation**

  - calls:
    - service.assignID (with table_id and reservation_id)
    - reservationService.read (reservation_id)
    - service.updateRes(with reservation information and new status)
  - checks if a reservation is already seatad, assigns an id to a table, then updates the status on the reservation

- **isOccupied**

  - calls service.read to check if a table already has a status of "occupied"

- **list**

  - calls service.list to get tables data
  - sorts all tables by name

- **freeTable**

  - _makes no queries to database_
  - checks to ensure a table is indeed free

- **finishReservation**

  - calls:
    - service.read(with table_id)
    - reservationService.read(with reservation_id)
    - service.updateRes(with table data and table_id)
    - service.freeTable
  - reads table and reservation data then passes data to updateRes function to set the status of the reservation as finished and set the table status as free

- **removeTable**
  - calls:
    - service.destroyTable(with table_id)
  - finds the record withe the matching table_id and delets it from the database


## Edge Cases: 
  - the code handles edge cases with the errorHandler file which will return an HTTP response with an error status and message
  - any calls to a nonexistant route will be handled with the notFound file which will return an HTTP response with an error statusand message