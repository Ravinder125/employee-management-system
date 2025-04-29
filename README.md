# Employee Management System API Documentation

## Table of Contents
1. [Base URL](#base-url)
2. [Setup Instructions](#setup-instructions)
3. [Authentication](#authentication)
4. [Admin Endpoints](#admin-endpoints)
    - [Register Admin](#register-admin)
    - [Admin Login](#admin-login)
    - [Admin Logout](#admin-logout)
5. [User Endpoints](#user-endpoints)
    - [Register User](#register-user)
    - [User Login](#user-login)
6. [Todo Endpoints](#todo-endpoints)
    - [Create Todo](#create-todo)
    - [Update Todo](#update-todo)
    - [Get All Todos](#get-all-todos)
    - [Delete/Restore Todo](#delete-restore-todo)
7. [Error Responses](#error-responses)

---

## Base URL
```
http://localhost:4000/api/v1
```

---

## Setup Instructions
```bash
git clone <repository-url>
cd backend

npm install

# Environment Variables
PORT=4000
MONGO_URI=<your-mongodb-connection-string>
ACCESS_TOKEN_SECRET=<your-access-token-secret>
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

# Start Development Server
npm run dev

# Start Production Server
npm start
```

---

## Authentication
All authenticated routes require a valid access token in the cookie. Login first to get the required tokens.

---

## Admin Endpoints

### Register Admin
- **URL**: `/admins/register`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`

**Request Body:**
```json
{
     "username": "admin123",
     "email": "admin@example.com",
     "password": "password123",
     "avatar": "[File]",
     "coverImage": "[File]" // optional
}
```

**Response:**
```json
{
     "statusCode": 201,
     "data": {
          "username": "admin123",
          "email": "admin@example.com",
          "avatar": "https://cloudinary.url/avatar.jpg",
          "coverImage": "https://cloudinary.url/cover.jpg",
          "_id": "adminId",
          "createdAt": "2024-01-20T12:00:00.000Z"
     },
     "message": "Admin successfully created"
}
```

### Admin Login
- **URL**: `/admins/login`
- **Method**: `POST`
- **Content-Type**: `application/json`

**Request Body:**
```json
{
     "email": "admin@example.com",
     "password": "password123"
}
```

**Response:**
```json
{
     "statusCode": 200,
     "data": {
          "_id": "adminId",
          "email": "admin@example.com",
          "username": "admin123"
     },
     "message": "Admin successfully logged in"
}
```

### Admin Logout
- **URL**: `/admins/logout`
- **Method**: `GET`
- **Auth Required**: Yes

**Response:**
```json
{
     "statusCode": 200,
     "data": null,
     "message": "Admin successfully logged out"
}
```

---

## User Endpoints

### Register User
- **URL**: `/users/register`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`

**Request Body:**
```json
{
     "username": "user123",
     "email": "user@example.com",
     "password": "password123",
     "avatar": "[File]",
     "coverImage": "[File]" // optional
}
```

**Response:**
```json
{
     "statusCode": 201,
     "data": {
          "username": "user123",
          "email": "user@example.com",
          "avatar": "https://cloudinary.url/avatar.jpg",
          "coverImage": "https://cloudinary.url/cover.jpg",
          "_id": "userId",
          "createdAt": "2024-01-20T12:00:00.000Z"
     },
     "message": "User successfully created"
}
```

### User Login
- **URL**: `/users/login`
- **Method**: `POST`
- **Content-Type**: `application/json`

**Request Body:**
```json
{
     "email": "user@example.com",
     "password": "password123"
}
```

**Response:**
```json
{
     "statusCode": 200,
     "data": {
          "_id": "userId",
          "email": "user@example.com",
          "username": "user123"
     },
     "message": "User successfully logged in"
}
```

---

## Todo Endpoints

### Create Todo
- **URL**: `/todos/:userId`
- **Method**: `POST`
- **Auth Required**: Yes (Admin only)
- **Content-Type**: `application/json`

**Request Body:**
```json
{
     "title": "Complete Project",
     "description": "Finish the project documentation",
     "priority": "high",
     "dueTo": "2024-02-01T00:00:00.000Z"
}
```

**Response:**
```json
{
     "statusCode": 201,
     "data": {
          "title": "Complete Project",
          "description": "Finish the project documentation",
          "assignedTo": "userId",
          "createdBy": "adminId",
          "status": "pending",
          "priority": "high",
          "dueTo": "2024-02-01T00:00:00.000Z",
          "_id": "todoId",
          "createdAt": "2024-01-20T12:00:00.000Z"
     },
     "message": "Todo successfully created"
}
```

### Update Todo
- **URL**: `/todos/:todoId`
- **Method**: `PATCH`
- **Auth Required**: Yes (Admin only)
- **Content-Type**: `application/json`

**Request Body:**
```json
{
     "title": "Updated Title",
     "description": "Updated description",
     "status": "in-progress",
     "priority": "medium",
     "completedAt": "2024-01-25T00:00:00.000Z",
     "dueTo": "2024-02-01T00:00:00.000Z"
}
```

**Response:**
```json
{
     "statusCode": 200,
     "data": {
          "_id": "todoId",
          "title": "Updated Title",
          "description": "Updated description",
          "status": "in-progress",
          "priority": "medium"
     },
     "message": "Todo successfully updated"
}
```

### Get All Todos
- **URL**: `/todos`
- **Method**: `GET`
- **Auth Required**: Yes (Admin only)
- **Query Parameters**: 
  - page (default: 1)
  - limit (default: 10)

**Response:**
```json
{
     "statusCode": 200,
     "data": {
          "docs": [
                {
                     "_id": "todoId",
                     "title": "Task Title",
                     "description": "Task Description",
                     "status": "pending",
                     "Employees": [
                          {
                                "_id": "userId",
                                "avatar": "https://cloudinary.url/avatar.jpg",
                                "fullName": "User Name"
                          }
                     ]
                }
          ],
          "totalDocs": 20,
          "limit": 10,
          "page": 1,
          "totalPages": 2
     },
     "message": "Successfully all todoes are fetched"
}
```

### Delete/Restore Todo
- **URL**: `/todos/:todoId`
- **Method**: `DELETE`
- **Auth Required**: Yes (Admin only)

**Response:**
```json
{
     "statusCode": 200,
     "data": {
          "_id": "todoId",
          "isDeleted": true
     },
     "message": "Todo successfully deleted"
}
```

---

## Error Responses

All endpoints may return the following error responses:

```json
{
     "statusCode": 400,
     "data": null,
     "message": "Validation error message"
}
```

```json
{
     "statusCode": 401,
     "data": null,
     "message": "Unauthorized access"
}
```

```json
{
     "statusCode": 500,
     "data": null,
     "message": "Internal server error"
}
```