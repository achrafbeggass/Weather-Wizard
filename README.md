# Weather Wizard

Weather Wizard is a simple weather application that allows users to retrieve current weather information for any city in the world. Built using Node.js, Express, and the OpenWeather API, it provides a clean and interactive user interface for real-time weather updates.

---

## Features
- Search for current weather by city name.
- Displays temperature, weather description, and an appropriate weather icon.
- Responsive design for easy use on desktop and mobile devices.

---

## Live Demo
No live demo is currently hosted. You can run the project locally using the instructions below.

---

## Technologies Used
- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript
- **API:** OpenWeather API

---

## Installation and Setup

### Prerequisites
- Node.js installed on your system (v14 or higher).
- An OpenWeather API key. Sign up for free at [OpenWeather](https://openweathermap.org/).

### Steps to Run the Project Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/weather-wizard.git
   cd weather-wizard
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the root of the project.
   - Add the following line to the file:
     ```env
     API_KEY=your_openweather_api_key
     ```

4. **Run the Server:**
   ```bash
   node server/app.js
   ```

5. **Access the Application:**
   Open your browser and go to:
   ```
   http://localhost:3000
   ```

---

## File Structure
```
Weather-Wizard/
├── api/
│   ├── server.js     # Backend application logic
│   ├── node_modules/ # Backend dependencies
│   ├── package.json  # Backend configuration
│   └── .env          # Backend environment variables
├── web
│   ├── index.html     # Frontend HTML file
│   ├── style.css      # Frontend CSS styling
│   ├── script.js      # Frontend JavaScript code
│   ├── node_modules/  # Frontend dependencies
│   └── package.json   # Frontend configuration
├── package.json       # Root configuration file
└── README.md         # Project documentation
```

---

## Usage
1. Open the application in your browser.
2. Enter the name of a city in the input field.
3. Click "Get Weather" to retrieve the current weather information.
4. View the temperature, weather description, and weather icon.

---

## Example API Response
Here is an example response from the OpenWeather API:
```json
{
  "name": "Casablanca",
  "main": {
    "temp": 22.3
  },
  "weather": [
    {
      "description": "clear sky",
      "icon": "01d"
    }
  ]
}
```

---

## Troubleshooting

### Common Issues
1. **Port Already in Use:**
   - If you see an error indicating that port 3000 is in use, stop any other processes using the port:
     ```bash
     lsof -i :3000
     kill -9 <PID>
     ```
   - Alternatively, modify the port number in `server/app.js`.

2. **Cannot Find Module Error:**
   - Ensure all dependencies are installed using:
     ```bash
     npm install
     ```

3. **No API Key:**
   - Make sure you have added your OpenWeather API key to the `.env` file.

---

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for enhancements or bug fixes.

---

## License
This project is licensed under the MIT License.

---

## Acknowledgments
- [OpenWeather](https://openweathermap.org/) for the weather API.
- [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) for backend development.

---

**Author:** Achraf Beggass

