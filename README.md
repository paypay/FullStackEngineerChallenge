This project is meant for the https://github.com/Pay-Baymax/FullStackEngineerChallenge programming challenge.

It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project mostly deals with the Frontend part, with mock data.
- Implemented using: Javascript + React + antd React UI library
- Used React Hooks instead of classes.

There are 2 modes: Admin and Employee.
- To be able to switch between the 2 modes, toggle the Switch button at the top left of the page.
- Ideally, a Logged in user will have a role assigned to it. This feature merely simulates a user with
either Admin or Employee role.

Admin mode
- This consists of 2 tabs: The Employees tab, and the Performance Review tab (under construction)
- The Employees tab displays a list of employees (hardcoded data)
    - Click on the New employee button to view a drawer, where the user can enter the details about the employee.

Employee mode
- This consists of only one tab: the Performance Review tab.
- The user is presented with a list of employees to review (in this example, only one).
- When the user presses the "Give Feedback" button beside the name of the employee, a Drawer appears, where
the user can enter feedback for this particular employee.

The backend was *not* implemented due to time constraints,
but the plan was to create a NodeJS RESTful API with a MySQL database.
On the Frontend side, the *plan* was to use the Axios library as the HTTP client, in order to
perform GET, POST, PUT and DELETE operations to the Backend.

To run,

### `npm start`

Written by HMAC