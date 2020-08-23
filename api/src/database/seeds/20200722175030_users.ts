import faker from "faker";
import * as Knex from "knex";

export const presetUsers = [
  {
    userType: "ADMIN",
    firstName: "Pay",
    lastName: "Admin",
    email: "admin@paypay.com",
    password: "$2b$10$MgljGXsP3Tx3gMw5idKIve8eYdLK3lF3akZAHxGYs5fPi0BRFLWBe", // password
    avatar:
      "https://iconlab.kentakomiya.com/wp/wp-content/uploads/2019/06/icon0084.png",
  },

  {
    userType: "EMPLOYEE",
    firstName: "John",
    lastName: "Doe",
    email: "jDoe@paypay.com",
    password: "$2b$10$MgljGXsP3Tx3gMw5idKIve8eYdLK3lF3akZAHxGYs5fPi0BRFLWBe", // password
    avatar:
      "https://img2.pngio.com/man-profile-avatar-user-social-icon-male-profile-png-512_512.png",
    phone: "5555555555",
    birthday: faker.date.between("1980-01-01", "2000-12-31"),
    address: "130-0014 Tokyo Japan Nice Bld #304",
  },
];

export const employees = [...Array(50)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
  phone: faker.phone.phoneNumber(),
  mobilePhone: faker.phone.phoneNumber(),
  address: faker.address.streetAddress(),
  birthday: faker.date.between("1980-01-01", "2000-12-31"),
  password: "$2b$10$MgljGXsP3Tx3gMw5idKIve8eYdLK3lF3akZAHxGYs5fPi0BRFLWBe", // password
}));

export const users = [...presetUsers, ...employees];

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE "user" RESTART IDENTITY CASCADE');
  await knex("user").insert(users);
}
