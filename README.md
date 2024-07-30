# Coding Task Calo Inc

This repository contains the frontend and backend code for the Jobs Task project. The frontend is built with React.js, and the backend is built with Nest.js.

## Project Video Demo
https://drive.google.com/file/d/1xS4DgSNwfiM95rQh9OVhemZiBvUPiNMs/view?usp=sharing

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- For frontend:
  - React.js
- For backend:
  - Nest.js

## Installation

1. Clone this repository to your local machine:

   git clone https://github.com/alijarar/Jobs-Task.git
   
### Backend



1. Navigate to the project calo-task-backend directory:

   cd calo-task-backend
   ````
    cd calo-task-backend
   
   ````

3. Install dependencies using npm:

   ````
    npm install
   
   ````
   
## Unsplash API Setup

To enable image fetching functionality in this project, you'll need to create an account on Unsplash and set up an API application.

### Steps to Create an Unsplash Account and App

1. Visit the [Unsplash Developer](https://unsplash.com/developers) page and sign up for an account if you don't have one already.

2. After signing in, navigate to the "Your Apps" section and click on "New Application" to create a new app.

3. Fill in the required details for your application and submit the form. Once your app is created, you will be provided with an **Access Key**.

4. Copy the **Access Key** and add it to your project's environment variables.

### Adding the Unsplash API Key

1. Create a `.env` file in the root directory of your frontend project (`calo-task-frontend`) if it doesn't already exist.

2. Add the following line to the `.env` file, replacing `your-access-key` with the **Access Key** you obtained from Unsplash:

    ```env
    UNSPLASH_API_KEY=your-access-key
    ```

Please note that with a demo account, you can make up to 50 API calls per hour for fetching images.

By following these steps, your application will be configured to use the Unsplash API for image retrieval.

   
7. Start the backend server:
   
   ````
    npm run start:dev
   
   ````


### Frontend

Open New terminal for frontend


1. Navigate to the project calo-task-frontend directory:

   ````
    cd calo-task-frontend
   
   ````

3. Install dependencies using npm:

   ````
    npm install
   
   ````
   
5. Create a .env file in the calo-task-backend directory and add the necessary environment variables. An example .env file might look like this:


   ````
     VITE_JOBS_BACKEND_URL=http://localhost:3002
   
   ````
   
7. Start the backend server:
   
   ````
     npm run dev
   
   ````





   ## Project Breakdown and Time Estimate
1. Backend Service Setup (Total: 7 hours 45 minutes)
* Initial Setup and Configuration (2 hours)
    * Set up project structure
    * Install necessary dependencies (Nest.js, local file DB structure)
    * Configure the server
* Creating Endpoints (5 hours 45 minutes)
    * POST /jobs (2 hours)
        * Implement endpoint to create a new job
        * Integrate Unsplash API
        * Return job ID to the client
    * GET /jobs (1 hour)
        * Implement endpoint to return a list of jobs
        * Show resolved jobs with results and unresolved jobs with status
    * GET /jobs/{jobId} (45 minutes)
        * Implement endpoint to return a specific job's result or status by ID
    * Error Handling (45 minutes)
        * Implement error handling for the endpoints
* Testing and Debugging (2 hours)
    * Test all endpoints
    * Ensure functionality and debug any issues
2. Client Setup (Total: 10 hours)
* Initial Setup and Configuration (1 hour 30 minutes)
    * Set up project structure
    * Install necessary dependencies (React, Axios, Tailwind CSS, Shadcn UI, etc.)
    * Configure the client
* Creating Components (2 hours)
    * Job Card Component (30 minutes)
        * Implement component to display the list of jobs
    * Job Creation Dialog Component (1 hour)
        * Implement component to create a new job
* Integrating API Calls (3 hours)
    * Fetch job data
    * Create new jobs
    * Display job results as soon as they are resolved
* Service Setup with Axios and React Query (2 hours)
    * Implement service code using Axios and React Query with hooks
* Form Validation for Creating New Jobs (30 minutes)
    * Implement form validation
* Testing and Debugging (2 hours)
    * Test all components
    * Ensure functionality and debug any issues
3. README File (Total: 1 hour 15 minutes)
* Writing Setup Instructions (45 minutes)
    * Detail steps to set up backend and client projects
    * Include installation of dependencies and configuration steps
* Documenting Usage Instructions (30 minutes)
    * Explain usage of endpoints
    * Instructions for creating new jobs, fetching job data, and displaying job results on the client
4. Final Review and Adjustments (Total: 3 hours)
* Code Review and Refactoring (1 hour 30 minutes)
    * Review entire codebase for improvements
    * Refactor where necessary
    * Ensure code quality and consistency
* Final Testing (1 hour 30 minutes)
    * Conduct final round of testing
    * Ensure backend service and client functionality work as expected

* Total Estimated Time: 23 hours 15 minutes















## Notes
Ensure both frontend and backend servers are running simultaneously to allow the frontend to communicate with the backend.






