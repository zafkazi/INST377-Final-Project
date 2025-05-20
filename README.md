INST377-Final-Project

Currency Converter Web Application

Our project is a simple currency converter that is made to offer a simple and accurate currency converter. This tool uses current conversion rates through the ExchangeRate Host API so the users have the most updated conversions.
Users can also customize their app to be in light or dark mode. They can also add their preferred currencies and how many decimal places to be exact in the conversion.

The purpose of this application is so it can be compatible with modern browsers and mobile browsers. It should be easy to use on iOS, Android, and desktops equipped with Chrome or Edge.

Link for the developer manual: 
It is also added in the bottom half of this document for convenience



Welcome to the developer manual
Install node.js
Install git/clone repo

Clone the repository:
git clone https://github.com/yourusername/currency-converter-app.git

Our code uses JavaScript, HTML, and CSS, so there are minimal dependencies
npm install

Running the application:
open in your browser or any local web server

Start backend:
npm start

Running Tests:
- API request validations
- currrency calculations
- user settings

Server API reference
We used https://exchangerate.host and https://frankfurter.dev/ for currency information

GET/symbols: fetches currency code and names
GET/convert: convert one currency to another
GET/latest: latest exchange rates

Bugs and Issues:
light/dark mode switch didn't always work/is glitchy when page was refreshed
API did not work the way we wanted to, used another API since we know it works
Had issues with some elements working on one page, but not another

Roadmap for future development:
- add user authentication and store their data
- improve chart visualizations
- enhance accessibility


Developer Manual – Currency Converter API

Overview
This backend application powers a currency converter that interacts with [exchangerate.host](https://exchangerate.host) and stores logs using Supabase. It is designed for real-time currency conversion and managing a list of supported currency symbols. This document serves as a technical handoff for future developers, covering setup, server operation, endpoint documentation, known issues, and future roadmap items.

Setup and Installation 
To get started, ensure you have Node.js (v16 or later), npm (comes with Node.js), and Git installed. Clone the repository to your machine using `git clone https://github.com/your-org/currency-api.git` and navigate into the project folder with `cd currency-api`. Next, install all dependencies using `npm install`.

Create a `.env` file in the root directory and paste the following configuration using your actual Supabase project values:
SUPABASE_URL=https://xsrfaygnwjouslnhhbzd.supabase.co
SUPABASE_KEY=your-supabase-anon-key
PORT=3000

Running the Application
To run the backend server locally, use the command `npm start`. If successful, the server will run at `http://localhost:3000`. You can test your endpoints using Postman, curl, or from the front-end.

API Endpoints  
`GET /symbols`: This endpoint fetches the full list of supported currencies from exchangerate.host and stores the data into the Supabase `currency_symbols` table using an upsert operation. It returns a JSON object containing currency codes and their descriptions.

`POST /convert`: This endpoint performs a real-time currency conversion. It expects a JSON body containing `from`, `to`, and `amount` values. The result is fetched from exchangerate.host and logged into the `conversion_logs` table in Supabase. The response includes the conversion result and query parameters.

Database Schema
The `currency_symbols` table includes: `code` (text, primary key) and `description` (text).  
The `conversion_logs` table includes: `id` (serial primary key), `from` (text), `to` (text), `amount` (numeric), `result` (numeric), and `created_at` (timestamp defaulting to now()).

Tests 
No unit or integration tests have been implemented yet. You are encouraged to add tests using Jest or Supertest for validating endpoints and business logic.

Known Bugs and Limitations
This system currently lacks input validation, meaning invalid currency codes or malformed JSON can crash the server. There is no caching layer, so each call to `/symbols` hits the external API every time. Authentication is not yet implemented, and all endpoints are publicly accessible. The API does not gracefully handle rate limits or timeouts from exchangerate.host.

Roadmap and Future Development
Planned improvements include: adding input validation using a library, caching results from `/symbols` to reduce redundant API calls, creating tests, and implementing authentication for endpoint protection. Additionally, a frontend in React or Next.js is expected, along with deployment on Render (backend) and Vercel (frontend).

Final Notes
If you’re new to this project, begin by reviewing the `index.js` and `supabaseClient.js` files. Review your Supabase tables via the dashboard, and monitor logs there when testing. For help with conversion data, refer to exchangerate.host’s official docs. Future contributions should follow semantic commit conventions and keep PRs focused and well-documented.

Here is the vercel:
https://inst377finalproject-jp1xljdyh-eogundanas-projects.vercel.app/



