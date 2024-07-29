

# UFC API

This project implements a RESTful API for managing UFC fighters.

## Features

- **CRUD Operations**: Allows creating, reading, updating, and deleting fighter information.
- **Live Updates**: Real-time updates of fighter data using WebSocket.
- **Deployment**: Deployed on Heroku, accessible [here](https://ufc-api-demo-e18d3cbd0a55.herokuapp.com).
- **Technology Stack**: MERN (MongoDB, Express.js, React.js, Node.js).

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/FarmerSamuel-FS/UFC-API.git
   cd UFC-API
Install dependencies:

npm install
Set up environment variables:

Create a .env file in the root directory.
Add the following variables:
PORT=8000
MONGODB_URI=mongodb://localhost:27017/ufc

Start the server:
npm start
Open your browser and navigate to http://localhost:8000.

API Endpoints

GET /api/v1/fighters: Get all fighters.
GET /api/v1/fighters/:id: Get a fighter by ID.
POST /api/v1/fighters: Create a new fighter.
PATCH /api/v1/fighters/:id: Update a fighter by ID.
DELETE /api/v1/fighters/:id: Delete a fighter by ID.
Deployment

This project is deployed on Heroku. You can access it here.
[here](https://ufc-api-demo-e18d3cbd0a55.herokuapp.com).
