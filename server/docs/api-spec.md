# API

#### Error Format

| status | description               |
| ------ | ------------------------- |
| 401    | unauthorized, needs login |
| 403    | not allowed               |
| 400    | paramters are malformed   |
| 500    | Internal Server Error     |

all errors follow following format

```ts
{
  error: {
    code: string;
    message: string;
  }
}
```

# 1. Employee

```ts
interface Employee {
  id: number;
  employee_id: string;
  name: string;
}
```

## 1.1. `GET /employees`

#### request

none

#### response

```ts
// TODO: paging
interface ResponseEmployees {
  total: number;
  list: Employee[];
}
```

## 1.2. `POST /employees`

#### request

```ts
interface RequestEmployeeCreate {
  employee_id: string;
  name: string;
}
```

#### response

`Employee`

## 1.3. `GET /employee/{employee_id}`

#### request

none

#### response

`Employee`

## 1.3. `PUT /employee/{employee_id}`

#### request

```ts
interface RequestEmployeeUpdate {
  employee_id: string;
  name: string;
}
```

#### response

none

## 1.4. `DELETE /employee/{employee_id}`

#### request

none

#### response

none
