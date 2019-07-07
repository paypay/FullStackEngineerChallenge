declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

interface Employee {
  id: number
  employee_id: string
  name: string
  admin?: boolean
}

interface Review {
  id: number
  reviewer: Employee
  reviewee: Employee
  text: string
}
