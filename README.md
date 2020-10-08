# WORKOUTS

A full-stack application that demonstrates list view and details of workouts.

Backend url :  https://workouts-server.herokuapp.com/

Frontend url : https://workouts-client.herokuapp.com/ 


## BACKEND

Backend developed by `NestJs`. A migration script loads 1000 sample(random) workouts in the first load of the application. To run the application :

```sh
cd server
npm install
npm start:dev
```

To run the integration tests :

```sh
cd server
npm run test:e2e
```

## FRONTEND

Frontend developed by React. To run the application :

```sh
cd client
npm install
npm start
```

### ToDo
 - Display loading placeholder (ex: https://material-ui.com/components/skeleton/)
 - Implement category filter integration tests.
 - Display proper error messages in case of a server error (ex: http 500)