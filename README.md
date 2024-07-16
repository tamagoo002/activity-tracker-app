# Activity Tracker App

## Overview

The Activity Tracker App is a task management application built using the MERN stack (MongoDB, Express.js, React, Node.js). This app allows users to create, manage, and track activities and subactivities. An activity can only be marked as completed if all its subactivities are completed. Completing an activity will automatically mark all its subactivities as completed.

Features

- User authentication and authorization
- Create, read, update, and delete activities
- Create, read, update, and delete subactivities
- Hierarchical activity management
- Responsive design

Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- Mongoose
- Redux (or Context API for state management)
- JWT (JSON Web Token) for authentication
- Bootstrap (or any other CSS framework for styling)

Installation

Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

 Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/zer0vox/activity-tracker-app.git
    cd activity-tracker-app
    ```

2. Navigate to the backend directory and install dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```plaintext
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

** Frontend Setup**

1. Navigate to the frontend directory and install dependencies:

    ```bash
    cd frontend
    npm install
    ```

2. Create a `.env` file in the `frontend` directory and add the following environment variable:

    ```plaintext
    REACT_APP_API_URL=http://localhost:5000
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

 Project Structure

