INST377-Final-Project

Currency Converter Web Application

Our project is a simple currency converter that is made to offer a simple and accurate currency converter. This tool uses current conversion rates through the ExchangeRate Host API so the users have the most updated conversions.
Users can also customize their app to be in light or dark mode. They can also add their preferred currencies and how many decimal places to be exact in the conversion.

The purpose of this application is so it can be compatible with modern browsers and mobile browsers. It should be easy to use on iOS, Android, and desktops equipped with Chrome or Edge.

Link for the developer manual: 
It is also added in the bottom half of this document for convenience



Welcome to the developer manual

Clone the repository:
git clone https://github.com/yourusername/currency-converter-app.git

Our code uses JavaScript, HTML, and CSS, so there are minimal dependencies
npm install

optional server for development
npx http-server

Running the application:
open in your browser or any local web server

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
light/dark mode switch doesn't always work
api did not always work, integrated different APIs as well.

Roadmap for future development:
- add user authentication and store their data
- improve chart visualizations
- enhance accessibility

