# Blood Donor Finder API

A backend API that lets people register as blood donors and lets others search for matching, available donors by blood group and city. Built as Project 2 (Backend API Development) for the DecodeLabs Full Stack internship.

## Tech Stack

- Node.js
- Express
- In-memory data store (resets on server restart)

## Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:5000` by default.

## Endpoints

### Register a donor
`POST /api/donors`

Request body:
```json
{
  "name": "Ayesha Khan",
  "bloodGroup": "O+",
  "city": "Lahore",
  "contact": "03001234567"
}
```

Responses:
- `201 Created` — donor registered
- `400 Bad Request` — invalid or missing fields
- `409 Conflict` — a donor with this contact number already exists

### Search donors
`GET /api/donors?bloodGroup=O+&city=Lahore&availableOnly=true`

All query parameters are optional and can be combined.

Responses:
- `200 OK` — list of matching donors
- `404 Not Found` — no donors match the given filters

### Get a single donor
`GET /api/donors/:id`

Responses:
- `200 OK`
- `404 Not Found`

### Update availability
`PUT /api/donors/:id/availability`

Request body:
```json
{ "available": false }
```

Marking a donor unavailable records the current time as their last donation date. They cannot be marked available again until 90 days have passed.

Responses:
- `200 OK`
- `400 Bad Request` — invalid payload, or still within the 90-day cooldown
- `404 Not Found`

### Delete a donor
`DELETE /api/donors/:id`

Responses:
- `204 No Content`
- `404 Not Found`

## Validation Rules

- `name` — required, non-empty string
- `bloodGroup` — required, must be one of `A+ A- B+ B- O+ O- AB+ AB-`
- `city` — required, non-empty string
- `contact` — required, must match a Pakistani mobile number format (e.g. `03001234567` or `+923001234567`)
- Duplicate registrations are rejected based on contact number

## Project Structure

```
blood-donor-finder-api/
├── server.js
├── src/
│   ├── app.js
│   ├── config/
│   │   └── constants.js
│   ├── models/
│   │   └── donorModel.js
│   ├── controllers/
│   │   └── donorController.js
│   ├── routes/
│   │   └── donorRoutes.js
│   ├── middleware/
│   │   ├── validateDonor.js
│   │   ├── validateAvailability.js
│   │   └── errorHandler.js
│   └── utils/
│       ├── asyncHandler.js
│       └── ApiError.js
├── package.json
└── .gitignore
```
