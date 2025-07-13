# Support Ticketing System

A full-stack MERN application for Intellipaat to automate their student support process.

## Features

- User registration and login
- JWT authentication
- Ticket creation by users
- Admin dashboard to manage tickets
- Status updates for tickets
- Automatic removal of closed tickets from admin view

## Technologies

- **Frontend**: React, React Router, Context API, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs

## Setup

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
#### Update .env with your MongoDB URI and JWT secret
   ```bash
   cd server
   npm install
   cp .env.example .env
   npm start
   ```
2. Ensure MongoDB is running and the URI in `.env` is correct.
3. Start the backend server:
   ```bash
   npm start
   ```
### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   npm install
   ```
2. Update the API base URL in `src/api.js` to match your backend server URL.
3. Start the frontend application:
   ```bash
   npm start
   ```
### Testing
1. Ensure both backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:3000` (or the port you configured).
3. Register a new user and log in.
4. Create a support ticket and check the admin dashboard for ticket management.
5. Update ticket statuses and verify that closed tickets are removed from the admin view.
6. Test JWT authentication by accessing protected routes.
7. Check the responsiveness of the application on different devices.
8. Verify that the application handles errors gracefully, such as invalid login attempts or ticket creation failures.
9. Ensure that the application is secure against common vulnerabilities like XSS and CSRF.
10. Test the application with different user roles (admin and user) to ensure proper access control.
11. Check the application logs for any errors or warnings during operation.
12. Ensure that the application is optimized for performance, including fast loading times and efficient database queries.
13. Test the application with different browsers to ensure cross-browser compatibility.
14. Verify that the application is accessible and usable for users with disabilities, following WCAG guidelines.
15. Check the application for any memory leaks or performance issues during prolonged use.
16. Test the application with a large number of tickets to ensure it can handle high loads without crashing or slowing down.
17. Ensure that the application is properly documented, including API endpoints and user guides.
18. Test the application with different network conditions, such as slow connections or intermittent connectivity, to ensure it remains functional.
   