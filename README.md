# Sports Event Management System (Frontend) 🏟️

Welcome to the frontend repository of the Sports Event Management System (SEMS), a dynamic and robust platform designed to streamline the organization and management of sports events. This React application serves as the interface for users and interacts seamlessly with our Laravel-based backend API, which you can explore [here](https://github.com/Sports-Event-Mangement-System/SEMS-Backend).

## 🌟 Features

- **Event Scheduling** 📅: Effortlessly schedule sports events, managing times and locations with just a few clicks. Perfect for organizers looking to streamline event logistics.

- **Team Management** 👥: Build and manage team rosters, including detailed profiles for players and coaches. Simplify team registration and updates through our user-friendly frontend interface.

- **Match Predictions** 📊: Leverage cutting-edge algorithms to predict match outcomes, adding an exciting layer of anticipation and strategy for participants and fans alike.

- **User Authentication** 🔒: Secure user authentication and authorization protocols ensure that access is guarded and data privacy is maintained across the platform.

- **Admin Dashboard** 🖥️: A powerful dashboard for administrators, equipped with tools to perform CRUD operations on tournaments, oversee team registrations, and monitor event progress in real-time.

- **Tournament Details** 🏆: Get a comprehensive view of tournament structures, including participating teams, match schedules, and real-time results.

- **Team Details** 🏅: Dive deep into team statistics, viewing detailed match histories, current form, and player performance metrics.

## 🛠️ Prerequisites

Before diving in, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://npmjs.com/) (v6.x or later)

## 🚀 Installation

Get started with these simple steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/SEMS-Frontend.git
   cd SEMS-Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and specify:
   ```
   REACT_APP_API_URL=https://<backend-api-url>
   ```
   Replace `<backend-api-url>` with the actual URL of your backend API.

4. **Launch the development server:**
   ```bash
   npm start
   ```
   Visit [http://localhost:3000](http://localhost:3000) to see your application in action.

## 🔗 Connecting to the Backend API

Make sure your backend API is up and running. The frontend fetches data from the backend specified in the `.env` file under `REACT_APP_API_URL`.

For more details on API endpoints and their functionalities, check out the [backend repository](https://github.com/Sports-Event-Mangement-System/SEMS-Backend).

## 🏗️ Building for Production

To prepare your app for deployment:
```bash
npm run build
```
This command bundles React in production mode and optimizes the build for the best performance, outputting to the `build` folder.

## 🤝 Contributing

We love contributions! If you're looking to make a significant change, please open an issue first to discuss what you'd like to change.
