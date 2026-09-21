# Movie Application

A full-stack Movie Application developed using Node.js, Express.js and MongoDB.

## Project Overview

This application allows users to view, search, add, edit and delete movies. The backend provides RESTful APIs and uses MongoDB for storing movie information.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- HTML
- CSS
- JavaScript

## Features

- View available movies
- Search movies by title, genre or language
- View detailed movie information
- Add new movies
- Update movie ratings
- Delete movies
- RESTful API integration
- MongoDB database integration
- Responsive and modern user interface

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/movies` | Get all movies |
| GET | `/api/movies/:id` | Get a movie by ID |
| POST | `/api/movies` | Add a new movie |
| PUT | `/api/movies/:id` | Update a movie |
| DELETE | `/api/movies/:id` | Delete a movie |

## Project Structure

```text
movie-application/
│
├── backend/
│   ├── models/
│   │   └── Movie.js
│   ├── routes/
│   │   └── movieRoutes.js
│   ├── server.js
│   ├── .env
│   └── .gitignore
│
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js