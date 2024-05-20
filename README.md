# Email Engagement Optimization Platform

This project is a robust A/B testing platform designed to optimize email engagement metrics for marketing campaigns. It allows to conduct A/B tests on various elements of their email campaigns and provides actionable insights to improve open rates, click-through rates (CTR), and overall engagement.

## Table of Contents
- [Backend](#backend)
- [Frontend](#frontend)
- [Approach](#approach)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)

## Backend
The backend is built using Node.js and Express, with MailgunJS for email services. It handles the creation and management of emails, as well as tracking engagement metrics.

### Features:
- APIs for creating emails, retrieving all emails, fetching email details by ID, and getting all statistics.
- Webhooks to listen for engagement events (e.g., email opened, link clicked).
- Stores all email data and statistics in MongoDB using Mongoose.

## Frontend
The frontend is built using React, Vite, and Material UI, with Redux Toolkit for state management and Chart.js for visualizing data.

### Features:
- User-friendly interfaces for creating and managing email variants.
- Dashboard to view overall and individual email engagement metrics, including delivery, open rates, click rates, and recent emails.
- Real-time dashboard updates using API polling.
- Email creation form with validation and options to add plain HTML or design emails using a drag-and-drop feature from the Unlayer library.
- Subscriber management with filters using Material UI's Data Grid.
- Download all the analytics in CSV and PDF formats.

## Approach

### Frontend
- **Technology Stack**: React, Vite, Material UI
- **State Management**: Redux Toolkit
- **Data Visualization**: Chart.js for line graphs

#### Pages:
1. **Dashboard**: 
   - Displays overall engagement metrics and allows viewing detailed metrics for individual emails.
   - Covers delivery rates, open rates, click rates, recent emails, and a line graph for visualizing trends.
   - Real-time updates via API polling.

2. **Email Management**:
   - Create new emails and view previously created emails.
   - Email creation form includes fields for subject, template options (plain HTML or drag-and-drop design), and sender name, with proper validations.

3. **Subscribers**:
   - Displays all subscribers using Material UI's X-Data Grid.
   - Provides filtering options to target specific user segments for email campaigns.

### Backend
- **Technology Stack**: Node.js, Express, MailgunJS
- **Database**: MongoDB with Mongoose

#### APIs:
- **Create Email**: Endpoint to create a new email.
- **Get All Emails**: Endpoint to retrieve all created emails.
- **Get Email by ID**: Endpoint to fetch details of a specific email by its ID.
- **Get All Stats**: Endpoint to retrieve all engagement statistics.
- **Webhooks**: Listens for engagement events from Mailgun to update stats.

## Setup Instructions

1. **Backend**:
   ```
   cd backend
   npm install
   npm run dev
2. **Frontend**:
      ```
      cd frontend
      npm install
      npm run dev
3. **Environment Variables:**
- Copy the sample environment variables file and update it with your own values.

4. **Configuration Changes:**

- Update the CORS configuration in the backend to allow requests from `http://localhost:5173`.
- Update the base URL in the frontend to point to `http://localhost:5000`.

### Environment Variables

Ensure to set up the following environment variables in your .env file for both backend and frontend configurations.

By following these steps, you should have a fully functional A/B testing platform for optimizing your email campaigns.
