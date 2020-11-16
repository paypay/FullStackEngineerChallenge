# quick start
1. server
- db file: /employee-server/db.sql
- api base url: http://localhost:8090
- swagger api: http://localhost:8090

2. client
- `yarn` or `npm install`
- `yarn dev`
- default url: http://localhost:8080

# quick see
1. [swagger api](https://employee.xiaomo.info/swagger-ui.html#/employ_manager)
2. [admin online](https://houko-employee.netlify.app/)

# language and framework
1. server
- java 11
- mysql 8
- spring boot 2.3.5
- lombok 
- swagger UI
- mybatis plus

2. client
- nodejs 12
- typescript 3
- vue 2
- vue-admin-template-ts

# feature
- api(restful)
![](/screenshots/api.jpg)
- user login (mock api)
![](/screenshots/login.jpg)
- user profile (mock api)
![](/screenshots/user_profile.jpg)
- user logout (mock api)
![](/screenshots/logout.jpg)
- employee list
![](/screenshots/employee_list.jpg)
- add employee
![](/screenshots/add_employee.jpg)
![](/screenshots/add_employee_success.jpg)
- edit employee
![](/screenshots/edit_employee.jpg)
- delete employee
![](/screenshots/delete_employee_confirm.jpg)
- comment employee
![](/screenshots/comment_employee.jpg)
- employee comment list
![](/screenshots/edit_employee.jpg)
- export employee excel data
- export employee comment excel data

# need improve
- real user system and auth
- api getway(filter the illegal request)