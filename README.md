# Coding Task Calo Inc

This repository contains the frontend and backend code for the Jobs Task project. The frontend is built with React.js, and the backend is built with Nest.js.

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
    UNSPLASH_API_KEY=qj7POLUxIXV0DCGOXzrozn9dWjZgijkF0ht-1rLm40A (you can use this but 50 API calls per hour are allowed )
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








## Notes
Ensure both frontend and backend servers are running simultaneously to allow the frontend to communicate with the backend.


## Troubleshooting
If you encounter any issues, check the logs for error messages and ensure all dependencies are installed correctly. Make sure your .env files are configured properly.





