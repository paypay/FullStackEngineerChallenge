# Human Resource app

### > simple assets viewer app
- Admin can delete employees 
- Employees are just able to see the list without the option to delete

## Steps to watch it on local
### step number 1 
Make sure you cover these assumptions:
- You must be working on Mac (iOS)

- You must have Docker installed in your local machine

- You must be able to use Yarn workspaces feature: 
https://classic.yarnpkg.com/en/docs/workspaces/

- You must have yarn installed `v1.22`

just run:
```bash
$ yarn install
```
this should start installing all packages for both `back` and `front` workspaces.

then run: 
```bash2
$ yarn docker
``` 
to initialize the database instance of postgresql on detached mode

## ----- IMPORTANT -----
> Please make sure that your postgresql local database is up and ready to receive instructions before working with it.

### step number 2 - generate data
- Generate the dummy data, make sure that `back` is not running since it will cause a conflict  
run: 
```bash
$ yarn generate
```
on this root folder. 

and wait for the data to be added to the DB

### step number 3 
just run:
```bash
$ yarn dev
```
- `front` will begin it's process to start serving in: http://localhost:3000
- `back` will start everything to be ready to run on port: http://localhost:9090

### Error cases
- Again: if `back` does not start properly, please check and confirm that the dockerized postgresql service it's completely up and ready.
- If you get `(node:69003) UnhandledPromiseRejectionWarning: Error: Connection terminated unexpectedly` on the first  run of `$ yarn dev`, please try again to run the backend, it should work.

### Ports
`front`: http://localhost:3000  
`back`: http://localhost:9090 

- little bit more info in their respective folders.