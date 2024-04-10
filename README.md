# axgrid-challenge

## Project Description

Welcome to AxGrid, the most unpredictable and exhilarating energy trading platform in the multiverse. In a world where energy can be harvested from virtually anything - from the dance moves on a nightclub floor to the kinetic energy of a falling apple - the energy market has never been so bright and chaotic. As a AxGrid developer, your job is to tame this wild inflow of diverse energy sources and present it in a coherent, dynamic and user-friendly interface.

### Task Summary

Your mission, should you choose to accept it, is to create a dynamic front-end for AxGrid. The platform will need to handle various energy sources (solar, wind, kinetic, thermal, etc.), each with its own set of parameters and requirements. Your user interface should dynamically adapt to handle any energy source introduced through a JSON configuration, display the status of energy transactions in real time and present the results in a user-friendly manner.

## Technical Specifications

- **React**: Use React (version 17 or later) to build your user interface components.
- **State Management**: Take advantage of the Context API for state management across the application.
- **Form Handling**: Integrate a form library to manage dynamic forms based on the JSON configuration model.
- **Real-Time Communication**: Implement Socket.IO or a similar library for real-time updates on the status of energy transactions.
- **Data Visualization**: Integrate the charting library of your choice to render outputs when necessary.
- **Styling**: Use the CSS patterns, libraries or preprocessors you deem appropriate. Responsiveness does not need to be considered.
- **Tests**: Write unit, integration or E2E tests that you deem necessary to cover key paths.

## Challenge Requirements

- **Dynamic Form Creation**: Create a form builder that reads a JSON configuration of the model and dynamically renders the form fields.
- **Real-Time State Updates**: Simulate a back-end process to accept, retrieve and display transactions (you can simulate this).
- **Results Presentation**: A table with real-time transaction information will represent market liquidity.

## How to Start

This project needs [Node.js](https://nodejs.org/) to run.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/EmmHub/axgrid-challenge.git

## Project Structure

The `axgrid-challenge` project is divided into two main parts: `api` and `frontend`.

### API

The `api` folder houses a small server developed with Express and Socket.IO. This server has the function of emitting events related to trades and adding new trades to the system.

#### How to Start the API Server

To start the API server, follow these steps:

1. Navigate to the `api` folder:
2. Install the necessary dependencies with npm:
   ```sh
   npm install

3. Start the server:
   ```sh
   npm start


This will start up the server, which by default listens on port 5000.

### Frontend

The `frontend` folder contains all client-side logic of our application.

### Frontend Folder Structure

The frontend logic is organized into several folders and key files within `frontend/src`:

- `components/`: Includes reusable components such as EnergyTradeForm, EnergyTradesTable, NavigationBar, and SelectColumnFilter.
- `context/`: Contains React contexts used in the application, including EnergyTradeContext for the event trades management and SocketContext for holding a single instance of Socket.IO across the application.
- `schemas/`: Defines schemas for different types of energy (gas, hydro, kinetic, solar, thermal, wind) and other common schemas like certifications, location, form, terms, and ui.
- `utils/`: Houses utility functions that can be employed in diverse parts of the application.
- `App.tsx`: The main component that encapsulates the entire application.
- `index.css`: Main CSS file for global styles.
- `main.tsx`: React application entry point.

### How to Start the Frontend

To start the frontend part, follow these steps:

1. Navigate to the `frontend` folder:
2. Install the necessary dependencies:
   ```sh
   npm run install-dependencies

3. Start the development server:
   ```sh
   npm run dev

This will start the development server, usually available at http://localhost:5173.

### Running Tests

To run tests in the project, use the following commands:

- To execute all tests:
  ```sh
  npm test
- To run tests interactively using the Vitest user interface, you can use the following command:
  ```sh
  npm run test:ui

### Styles and Noteworthy Dependencies

- A single index.css file is used for global styles.
- The Bootstrap CDN is included in index.html to enhance the appearance of forms and other UI components.
- Key dependencies include react-table for the dynamic trades tables, socket.io-client for real-time communication with the server, and @rjsf/core for the management of dynamic forms based on JSON Schema.