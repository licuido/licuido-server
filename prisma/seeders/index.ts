import { PrismaClient, master_entity_types } from "@prisma/client";

const prisma = new PrismaClient();
import * as Seeds from "./seed";

const main = async () => {
  console.log("---- Seeding In Progress ----");

  let upsertPromises: any[] = [];

  Object.values(Seeds).forEach((seed: { table: string; data: any[] }) => {
    // Master User Entity Types
    if (seed.table == "master_entity_types") {
      console.log(seed.data, "seed.data");
      seed.data.forEach((data: master_entity_types) => {
        upsertPromises.push(
          prisma.master_entity_types.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }
  });

  await Promise.all(upsertPromises);

  console.log("---- Seeding Completed ----");
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
