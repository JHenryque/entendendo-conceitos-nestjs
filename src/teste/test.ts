import { PrismaClient } from 'src/generated/client/client';

const test = new PrismaClient();

async function main() {
  await test.task.findMany();
  console.log(test);
}
