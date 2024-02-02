# Event Management Tool

## Overview

The Event Management Tool is a Node.js backend project designed for managing events, user authentication using JWT, and utilizing MongoDB as the database. This tool provides a robust API for creating, updating, and retrieving events, with features such as user authentication, database indexing, and caching for enhanced performance.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, update, and retrieve events
- User authentication using JWT
- MongoDB as the database
- Efficient indexing for optimized queries
- Caching to enhance performance

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Clone the repository

```bash
git clone https://github.com/vermaAtul1520/event-tracker-backend
cd event-tracker-backend

```
### env file detail

```bash

MONGO_URL=mongodb+srv://username:<password>@cluster0.9aughzr.mongodb.net/
PORT=4000
JWT_SECRET = 'Keep_Yours'
REDIS_HOST_PASSWORD= 'Put redis host password'
REDIS_HOST_URI= 'Redis host uri to cloud'

```
 
###Start the server

  - npm start

Done !
Hurry using postman now you're able to hit the API routes.
