UFC API

This project implements a RESTful API for managing UFC fighters.

Features

CRUD Operations: Allows creating, reading, updating, and deleting fighter information.
Live Updates: Real-time updates of fighter data using WebSocket.
Deployment: Deployed on Heroku, accessible here.
Technology Stack: MERN (MongoDB, Express.js, React.js, Node.js).
Installation

To run this project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/FarmerSamuel-FS/UFC-API.git
cd UFC-API
Install dependencies:

Copy code
npm install
Set up environment variables:

Create a .env file in the root directory.
Add the following variables:
bash
Copy code
PORT=8000
MONGODB_URI=mongodb://localhost:27017/ufc
Start the server:

sql
Copy code
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

Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

License

This project is licensed under the MIT License - see the LICENSE file for details.
