# Please run scripts as step 1 post that run backend and then frontend.

## Description:
* Script contain schema as well as data for database named as Company
* This Db has two tables named as Employee and Feedback
* Employee table contains ID as primary key which is also FK to Feedback table
* Employee table store other info such as email id, flag for is user admin, name, and password(currently not used)
* Feedback table contain id as Pk which is made auto incremental also contains EmpId of Employee table
* Feedback table also contain other info like feedback description, assigned feedback id.
