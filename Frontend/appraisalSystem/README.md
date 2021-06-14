# AppraisalSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.3.

# Run the schema scripts for sql before running frontend/backend app

## Make sure you start backend code before running frontend


## Development server

Clone the project repo, install node modules using npm install. Once done build and run the proj using npm start

## Details/Assumption
##Project Artirecture

* Project uses material design as well as bootstrap for styling
* For authentication simple mechanism is used for now where we pass emp id to backend and it returns the user obj if available else throws exception Invalid Employee Id
* Project is divided into two sections admin as well as employee both have differentfeature module which are lazy loaded.
* Both module have their own routing file
* Some common modules/components are present inside common folder. 

## Login Page
* Once both backend and frontend app is started user will land on login page, which is ask user for emp id for login. 
* If everything is followed as per user will be able to logged in using id starting from 101 - 110
* If you want to logged in as admin use 101 and if as employee use 102.
* Current in datascript only 101 is admin.
* Simple mechanism is used in app for login where we just stored user object inside localstorage once we recived data from api.
* This module used below api
* api/Employee/Authenticate

## User needs to click logout link in header section to and then log in using other emp id like 102 to view employee page.

## Admin Landing 
* Once user logged in as admin he would be able to see list of employees in table (only employees). 
* If he wants to view additional info about them he needs to click on edit icon.
* Post that right panel gets open which populates the info for employee such as list of employees he has been assigned as well as list of resipondents employee whom would be giving feedback for that perticular employee.
* He can add new employee using new employee link
* Admin can change basic info about employee such as Name/ Email also he can assign more people to him for feedback, beside this can view/update feedback this employee recived.
* He can delete perticular feedback if he wants.
* * This module used below api
* api/WebMaster/GetEmployee
* api/WebMaster/CreateEmployee
* api/WebMaster/GetEmployeeDetails/{id}
* api/WebMaster/UpdateEmployeeDetails
* api/WebMaster/DeleteEmployee/{id}
* api/WebMaster/EmployeeAdditionalInfo/{id}
* api/WebMaster/UpdateEmployeeFeedback
* api/WebMaster/DeleteEmployeeFeedback/{id}
* api/WebMaster/AssignFeedback/


## Employee Landing
* Once user logged in using emp id like 102, he would be navigated to employee landing page on which he would be able to see list of assigned employee for feedback.
* He can click on edit icon and provide his feed back. 
* Once he save it he will be redirected to landing page again 
* This module uses below api 
* api/Employee/ViewFeedback/{Id}
* api/Employee/GetFeedback/{Id}
* 


## Further help

For ref screen shots are attached inside screen grab folder.
