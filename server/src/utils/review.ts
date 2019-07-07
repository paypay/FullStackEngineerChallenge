import db from '../../db'

export const getReviewsToEmployee = async (id: number, hasText: boolean) => {
  let list = await db('review')
    .select([
      'review.*',
      'employee.name as reviewer__name',
      'employee.id as reviewer__id',
      'employee.employee_id as reviewer__employee_id'
    ])
    .leftJoin('employee', 'review.reviewer', 'employee.id')
    .where('reviewee', id)
  if (hasText) {
    list = list.filter(item => item.text)
  }
  return list.map(review => ({
    id: review.id,
    reviewer: {
      id: review.reviewer__id,
      employee_id: review.reviewer__employee_id,
      name: review.reviewer__name
    },
    text: review.text
  }))
}

export const getReviewsFromEmployee = async (id: number) => {
  let list = await db('review')
    .select([
      'review.*',
      'employee.name as reviewee__name',
      'employee.id as reviewee__id',
      'employee.employee_id as reviewee__employee_id'
    ])
    .leftJoin('employee', 'review.reviewee', 'employee.id')
    .where('reviewer', id)
  return list.map(review => ({
    id: review.id,
    reviewee: {
      id: review.reviewee__id,
      employee_id: review.reviewee__employee_id,
      name: review.reviewee__name
    },
    text: review.text
  }))
}
