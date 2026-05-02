# Backend Architecture

This backend is built using Node.js, Express, and MongoDB, following a highly scalable, modular, and maintainable architecture.

## Folder Structure

- **`config/`**: Contains configuration files, such as database connections (`db.js`) and environment variables parsing.
- **`controllers/`**: Handles incoming HTTP requests, validates input, calls the appropriate service layer functions, and sends the HTTP response. Controllers should *not* contain heavy business logic.
- **`middleware/`**: Custom Express middleware functions.
  - `authMiddleware.js`: Handles role-based authentication (`protect` for authenticated users, `admin` for admin-only routes).
- **`models/`**: Defines the Mongoose schemas and data models for MongoDB (e.g., User, Appointment).
- **`routes/`**: Defines the API endpoints and maps them to the corresponding controller functions. Also applies routing-level middleware.
- **`services/`**: The core business logic layer. Services interact directly with the database models and perform complex data operations, keeping controllers lean and testing easier.
- **`utils/`**: Shared utility functions and helpers (e.g., `generateToken.js`).

## Role-Based Authentication

The system currently supports three distinct roles, managed via the `User` model and enforced by JWT-based middleware:
1. **Patient (`patient`)**: Standard user role for booking appointments.
2. **Doctor (`doctor`)**: Medical professional role with access to doctor-specific dashboards and settings.
3. **Admin (`admin`)**: Superuser role capable of managing users, approving doctors, viewing analytics, and modifying system state.

Protected routes use the `protect` middleware, while admin routes additionally use the `admin` middleware.
