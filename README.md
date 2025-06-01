# Whatsapp Clone
### Made using the help of https://www.youtube.com/watch?v=95jrbQNlpzM&ab_channel=CodeforInterview

### How to run the code?
#### inside server folder  run npm start
#### on another terminal inside client folder run npm start

# Client
### client code contains the frontend and the react feature of login: (React.js & Material-UI)
#### Google authentication for making accounts done using: **https://www.npmjs.com/package/@react-oauth/google** && use 
#### the page only works on : localhost:3000 only
## Service
  ### api.js
    it is sending data to localhost:8000/add to add the person who is logging in via axios

# Server

#### the page only works on : localhost:8000 only
#### Connects with mongodb: whatsapp_contacts
##### the data.js in database connects to the database with promise, and asynchronous function
##### User-controller.js adds data to the database
