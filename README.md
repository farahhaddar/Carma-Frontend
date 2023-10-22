# Getting Started with React App

This project serves as the front-end of our application.

## Installation

In the client directory, follow these steps to get started:

1. Install all the dependencies:

-  `npm insall`

2. Create `.env` file and copy the `.env.example` variables to the it. You need to set the `url` variable in the `.env` file to your back-end API URL.

- `cp .env.example .env`

3. Run the project:

- `npm start`




## File Structure

- `index.js` is the main entry point that displays `App.js`.
- `App.js` renders `PaymentForm.js`.
- `PaymentForm.js` contains all the logic, including state management, validation, model handling, and data fetching.
- The `CardForm` component includes the form inputs.
- The `SuccessModal` displays loading, success, and failure actions.

## User Interface

The user interface is built using JSX and Bootstrap, with credit card input provided by the `react-credit-card2` library. Validation is handled on both the front-end and back-end, and error messages are displayed when errors occur.

You can check out the UI in the "Screenshots" folder.

