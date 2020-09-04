export const validationRules = {
  email: [
    {
      rule: value => value.length > 2,
      message: `Email must be longer than 2 characters`
    },
    {
      rule: value => value.match(/.+\@.+\..+/),
      message: `Email must format example@example.com`
    },
    {
      rule: value => value.length < 100,
      message: `Email must be shorter than 100 characters`
    }
  ],
  first_name: [
    {
      rule: value => value.length > 2,
      message: `Firstname must be longer than 2 characters`
    }
  ],
  last_name: [
    {
      rule: value => value.length > 2,
      message: `Lastname must be longer than 2 characters`
    }
  ],
  password: [
    {
      rule: value => value.length > 6,
      message: `Password must be longer than 6 characters`
    }
  ],
  confirm_password: [
    {
      rule: value => value.length > 6,
      message: `Password confirmation must be longer than 6 characters`
    },
    {
      rule: value => value.length < 20,
      message: `Password confirmation must be shorter than 20 characters`
    }
  ],
  cardNumber: [
    {
      rule: value => value.length > 2,
      message: `First_name must be longer than 2 characters`
    }
  ],
  name: [
    {
      rule: value => value.length > 3,
      message: `Name must be longer than 3 characters`
    }
  ],
  address: [
    {
      rule: value => value.length > 3,
      message: `address must be longer than 2 characters`
    }
  ],
  company: [
    {
      rule: value => value.length > 1,
      message: `company must be longer than 1 characters`
    }
  ],
  address2: [
    {
      rule: value => value.length > 3,
      message: `address must be longer than 2 characters`
    }
  ],
  city: [
    {
      rule: value => value.length > 2,
      message: `city must be longer than 2 characters`
    }
  ],
  zip: [
    {
      rule: value => value.length === 5,
      message: `zip must be 5 characters`
    }
  ],
  state: [
    {
      rule: value => value.length > 5,
      message: `state must be longer than 5 characters`
    }
  ],
  country: [
    {
      rule: value => value.length === 2,
      message: `country must be longer than 2 characters`
    }
  ],
  subproduct_title: [
    {
      rule: value => value.length > 2,
      message: `Subproduct Title must be longer than 2 characters`
    }
  ],
};

export const validator = (validationName, value) => {
  if (validationRules[validationName]) {
    return validationRules[validationName]
      .map(rule => {
        return !rule.rule(value) && rule.message;
      })
      .filter(msg => !!msg);
  }
};
