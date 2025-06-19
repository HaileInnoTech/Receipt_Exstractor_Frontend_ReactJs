# Engineering Assessment Frontend (React) - Hai Le

## Project Initialization

1. Clone this repository locally

2. Create a new working branch (e.g. `git checkout -b working-branch`)

3. Set your node environment

   - Run `nvm install && nvm use`, or
   - Alternatively manually set your Node.js to version 18+ and npm to version 10+

4. Run `npm install` to install dependencies  
   **Note:** Make sure your node environment is correctly configured before running this step.

5. Set up environment variables:

   - Create the following three environment files in the root directory:

     - `.env.development`
     - `.env.test`
     - `.env.production`

   - Each file should contain the following:

     ```env
     VITE_API_URL=http://localhost:3000/v1/api
     ```

     - This environment variable tells the frontend where to send API requests.
     - Modify the URL if your backend uses a different port or base path.

   - **Do not commit these `.env.*` files** — they are ignored via `.gitignore`.

6. Run `npm run dev` to spin up the frontend

   The terminal should display the port where the frontend is running (e.g. `http://localhost:5173/`).

   You can check that the frontend is working correctly by opening the provided URL in your browser — you should see the landing page to upload the Recepit Extractor

---
