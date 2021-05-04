export const getEmployeesSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
          description: 'current page of items'
        },
        perPage: {
          type: 'number',
          description: 'number of visible items per page'
        },
        prePage: {
          type: 'number',
          description: 'number of previous pages'
        },
        nextPage: {
          type: 'number',
          description: 'number of next pages'
        },
        total: {
          type: 'number',
          description: 'total number of items in the database'
        },
        totalPages: {
          type: 'number',
          description: 'total number of pages for this table'
        },
        data: {
          type: 'array',
          items: { $ref: '#/$defs/employee' }
        }
      },
      $defs: {
        employee: {
          type: 'object',
          required: ['id'],
          properties: {
            name: 'string',
            photoUrl: 'string',
            password: 'string',
            rating: 'string',
            department: 'string',
            reviews: {
              type: 'array',
              items: { $ref: '#/$defs/review' }
            }
          }
        },
        review: {
          type: 'object',
          id: 'string',
          rating: 'number',
          ownerId: 'string'
        }
      }
    }
  }
};

export const getReviewsSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
          description: 'current page of items'
        },
        perPage: {
          type: 'number',
          description: 'number of visible items per page'
        },
        prePage: {
          type: 'number',
          description: 'number of previous pages'
        },
        nextPage: {
          type: 'number',
          description: 'number of next pages'
        },
        total: {
          type: 'number',
          description: 'total number of items in the database'
        },
        totalPages: {
          type: 'number',
          description: 'total number of pages for this table'
        },
        data: {
          type: 'array',
          items: { $ref: '#/$defs/review' }
        }
      },
      $defs: {
        employee: {
          type: 'object',
          required: ['id'],
          properties: {
            name: 'string',
            photoUrl: 'string',
            password: 'string',
            rating: 'string',
            department: 'string',
            reviews: {
              type: 'array',
              items: { $ref: '#/$defs/review' }
            }
          }
        },
        review: {
          type: 'object',
          id: 'string',
          rating: 'number',
          ownerId: 'string',
          owner: {
            type: 'object',
            properties: {
              name: 'string',
              photoUrl: 'string',
              password: 'string',
              rating: 'string',
              department: 'string'
            }
          }
        }
      }
    }
  }
};
