
export interface IComment{
  id: number
  star: number
  content:string
  commentBy:string
}

export interface IEmployee {
  id: number
  name: string
  comments?: IComment[]
}
