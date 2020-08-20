import faker from "faker";
import * as Knex from "knex";
import { review } from "../types";

export const reviews: Omit<review, "id" | "createdAt" | "updatedAt">[] = [];

export const assignments = [...Array(300)].map((_, i) => {
  // start with second user since first is admin
  const userId = faker.random.number({ min: 2, max: 52 });
  let revieweeId = faker.random.number({ min: 2, max: 52 });
  while (userId === revieweeId) {
    revieweeId = faker.random.number({ min: 2, max: 52 });
  }

  const status = faker.random.arrayElement(["PENDING", "COMPLETED"]);

  if (status === "COMPLETED") {
    reviews.push({
      assignmentId: i + 1,
      comment: faker.lorem.sentences(2),
      attitude: faker.random.number({ min: 1, max: 5 }),
      communication: faker.random.number({ min: 1, max: 5 }),
      growth: faker.random.number({ min: 1, max: 5 }),
      dependability: faker.random.number({ min: 1, max: 5 }),
      productivity: faker.random.number({ min: 1, max: 5 }),
      initiative: faker.random.number({ min: 1, max: 5 }),
      innovation: faker.random.number({ min: 1, max: 5 }),
    });
  }

  return {
    userId,
    revieweeId,
    status,
  };
});

export async function seed(knex: Knex): Promise<void> {
  await knex.raw("SET session_replication_role = 'replica'");

  await knex.raw('TRUNCATE "review" RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE "assignment" RESTART IDENTITY CASCADE');

  await knex("review").insert(reviews);
  await knex("assignment").insert(assignments);

  await knex.raw("SET session_replication_role = 'origin'");
}
