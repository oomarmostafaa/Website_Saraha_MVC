# Sarahah MVC

A full-stack social messaging application built with Node.js, Express, EJS, MongoDB, and Bootstrap. This project is inspired by the Saraah concept: users can register, log in, view a profile share link, and receive anonymous messages from others without revealing the sender.

## Features

- User registration and login with encrypted passwords using `bcrypt`
- Input validation using `Joi`
- Session-based authentication with `express-session` and MongoDB session store
- Flash message error handling using `connect-flash`
- User profile sharing via clickable share link and QR code
- Message sending form on user profile pages
- Dark theme UI with modern animations and responsive Bootstrap layout
- Server-side generation of QR codes using `qrcode`

## Tech Stack

- Node.js
- Express
- EJS
- MongoDB + Mongoose
- Bootstrap
- bcrypt
- Joi
- express-session
- connect-mongodb-session
- connect-flash
- qrcode


## Project Structure

- `index.js` — main server entry point and router setup
- `dataBase/` — database connection logic and Mongoose models
  - `dbConnecgtion.js`
  - `models/user.model.js`
  - `models/message.model.js`
- `modules/` — MVC modules for each feature
  - `auth/` — login, registration, auth validation
  - `home/` — home page controller and routes
  - `message/` — message view controller and routes
  - `user/` — profile view and send message handling
- `views/` — EJS views and shared partials
- `public/` — static assets: CSS, JS, images, icons

## Routes

- `GET /` — home page
- `GET /login` — login page
- `POST /handleLogin` — login action
- `GET /register` — registration page
- `POST /handleRegister` — registration action
- `GET /message` — current user message dashboard
- `GET /user/:id` — public user profile page for sending messages
- `POST /handelMessage` — send a new message to a profile
- `GET /logout` — log out and destroy session

