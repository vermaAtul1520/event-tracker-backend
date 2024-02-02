# Event Management Tool

## Overview

The Event Management Tool is a Node.js backend project designed for managing events, user authentication using JWT, and utilizing MongoDB as the database. This tool provides a robust API for creating, updating, and retrieving events, with features such as user authentication, database indexing, and caching for enhanced performance.


## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)

## Features

- user can register
- user cn deactivate and reactivate their account
- Create, update, and retrieve events,ticket,comments
- buy ticket, and give rating to events
- User authentication using JWT
- MongoDB as the database
- Efficient indexing for optimized queries
- Caching to enhance performance

## Getting Started

### Prerequisites

- Node.js: [Install Node.js](https://nodejs.org/)
- MongoDB: [Install MongoDB](https://docs.mongodb.com/manual/installation/)

### Installation


1. Clone the repository:

```bash
git clone https://github.com/vermaAtul1520/event-tracker-backend
cd event-tracker-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

   Create a `.env.local` file in the root of your project and add the following variables:

   ```env
   MONGO_URL=mongodb+srv://username:<password>@cluster0.9aughzr.mongodb.net/
   PORT=4000
   JWT_SECRET = 'Keep_Yours'
   REDIS_HOST_PASSWORD= 'Put redis host password'
   REDIS_HOST_URI= 'Redis host uri to cloud'
   ```

  Replace `your_mongodb_connection_string` with your MongoDB connection string and `backend_base_url` with your actual base url of backend.

## Usage

1. Start the node.js development server:

```bash
npm start
```

2. now hit the apis using [http://localhost:4000](http://localhost:3000) as base url

3. Explore the diffrent routes to see funcnalitiy

## API Endpoints
The backend of the application exposes the following API endpoints:

Certainly! Here are the corresponding routes for the mentioned endpoint names:

1. To register user - `/accounts/register`
2. To login user - `/accounts/login`
3. Create an event - `/events/create`
4. Get all events - `/events/all`
5. Update event using id - `/events/:id` (e.g., `/events/65b8bf7166299ee03ad118ee`)
6. To delete events using id - `/events/:id` (e.g., `/events/65bbb22f9e94f67944afc939`)
7. To get a specific event - `/events/:id` (e.g., `/events/65b8bf7166299ee03ad118ee`)
8. Create a ticket - `/tickets/create`
9. To get all tickets - `/tickets/all`
10. To get all tickets by event id - `/tickets/event/:eventID` (e.g., `/tickets/event/65bbb3c854d19e6c7f7d38ea`)
11. To delete a ticket by id - `/tickets/:id` (e.g., `/tickets/65bbd51882fd23991e42d988`)
12. Update tickets - `/tickets/:id` (e.g., `/tickets/65bbd54282fd23991e42d991`)
13. To add a comment - `/comments/create`
14. Update a comment - `/comments/:id` (e.g., `/comments/65bbde6efc95e769d4a6c854`)
15. To get a comment by id - `/comments/:id` (e.g., `/comments/65bbe0247322819997680c76`)
16. To delete comments - `/comments/:id` (e.g., `/comments/65bbde6efc95e769d4a6c854`)
17. To rate events - `/rates/:eventID` (e.g., `/rates/65b8bf7166299ee03ad118ee`)
18. To get Avg rating - `/rates/average-rating/:eventID` (e.g., `/rates/average-rating/65b8bf7166299ee03ad118ee`)
19. Deactivate the account - `/accounts/deactivate/:userID` (e.g., `/accounts/deactivate/65b7ee0c5661030a6679babc`)
20. To reactivate account - `/accounts/reactivate/:userID` (e.g., `/accounts/reactivate/65b7ee0c5661030a6679babc`)

These routes represent the endpoints present in this backend service.

## Tech Stack

- Javascript
- Node
- MongoDB
- Redis
- Jwt
