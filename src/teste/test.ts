import { PrismaClient } from 'src/generated/client/client';

const test = new PrismaClient();

export async function main() {
  await test.task.findMany();
  console.log(test);
}
// main()
//   .then(async () => {
//     await test.$connect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await test.$disconnect();
//     process.exit(1);
//   });
