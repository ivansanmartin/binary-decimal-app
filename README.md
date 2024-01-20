# Binary Converter App

## Description

This application offers a versatile converter that allows you to perform conversions between binary and decimal, as well as transform text to binary and vice versa. The app consumes the Binary Decimal API, developed by me and available on my portfolio at [ivansanmartin.dev](https://ivansanmartin.dev/). The backend, built with Node.js and Express, uses MongoDB to store a history of transformations.

## Technologies Used 🚀

- 🍃 **MongoDB**: Database for storing the history of transformations.
- ⚙️ **Express.js**: Backend framework for handling HTTP requests.
- ⚛️ **React.js**: Frontend library for creating interactive user interfaces.
- 🚀 **Node.js**: Runtime environment to run the backend of the application.
- 🔐 **Auth0**: Authentication and authorization platform to ensure the security of the application.

## Installation

1. Clone the repository from [GitHub](https://github.com/your-username/your-repo).
2. Install server dependencies with `npm install` in the server folder.
3. Install client dependencies with `npm install` in the client folder.
4. Configure environment variables in the `.env` file with information from your Auth0 instance and the URL of the Binary Decimal API, available at [ivansanmartin.vercel.app/project](https://ivansanmartin.vercel.app/project).

## Usage

1. Start the server with `npm start` in the server folder.
2. Start the client with `npm start` in the client folder.
3. Access the application from your browser.

## Additional Features 🌟

- 📚 **Conversion History**: The backend stores a history of all performed transformations.
- 🌐 **Google Sign-In**: Register and access easily using your Google account.

## API

The application consumes the Binary Decimal API. Check the API documentation at [ivansanmartin.vercel.app/project/](https://ivansanmartin.vercel.app/project/) for more details on supported requests and response formats.

## Authentication

Authentication is managed through Auth0. Ensure you configure the credentials correctly in the `.env` file and refer to the Auth0 documentation for more details on integration.

## Contributions

Contributions are welcome! If you encounter issues or have improvements, open an issue or submit a pull request.


