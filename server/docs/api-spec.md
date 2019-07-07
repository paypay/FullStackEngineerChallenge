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

## 1.1. `GET /admin/v1/employees`

#### request

none

#### response

```ts
// TODO: paging
{
  total: number;
  list: Employee[];
}
```

## 1.2. `POST /admin/v1/employees`

#### request

```ts
{
  employee_id: string;
  name: string;
}
```

#### response

`Employee`

## 1.3. `GET /admin/v1/employee/{employee_id}`

#### request

none

#### response

`Employee`

## 1.3. `PUT /admin/v1/employee/{employee_id}`

#### request

```ts
{
  employee_id: string;
  name: string;
}
```

#### response

none

## 1.4. `DELETE /admin/v1/employee/{employee_id}`

#### request

none

#### response

none

# 2. Reviews

```ts
interface Review {
  id: number;
  reviewer: Employee;
  reviewee: Employee;
  text: string;
}
```

## 2.1 `GET /admin/v1/employee/${id}/reviews`

get reviews of certain employee

#### request

none

#### response

```ts
{
    reviews: Review[]
}
```

## 2.2 `POST /admin/v1/employee/:employee_id/reviews`

create a w review of certain employee, could be use to assign

### request

```ts
{
  reviewer: number;
  text?: string;
}
```

### response

`Review`

## 2.3 `PUT /admin/v1/employee/:employee_id/review/:review_id`

update a review

#### request

```ts
{
  text: string;
}
```

#### response

none

## 2.4 `DELETE /admin/v1/employee/:employee_id/review/:review_id`

delete a review

#### request

none

#### response

none
